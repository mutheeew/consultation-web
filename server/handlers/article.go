package handlers

import (
	"context"
	"fmt"
	articledto "hallocorona/dto/article"
	dto "hallocorona/dto/result"
	"hallocorona/models"
	"hallocorona/repositories"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerArticle struct {
	ArticleRepository repositories.ArticleRepository
}

var path_file = "https://hallo-corona.onrender.com/"

func HandlerArticle(ArticleRepository repositories.ArticleRepository) *handlerArticle {
	return &handlerArticle{ArticleRepository}
}

func (h *handlerArticle) CreateArticle(c echo.Context) error {

	id, _ := strconv.Atoi(c.Param("id"))

	dataFile := c.Get("dataFile").(string)

	request := articledto.ArticleRequest{
		UserId:      int(id),
		Title:       c.FormValue("title"),
		Attache:     dataFile,
		Description: c.FormValue("description"),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "Hallo Corona"})

	if err != nil {
		fmt.Println(err.Error())
	}
	article := models.Article{
		UserId:      request.UserId,
		Title:       request.Title,
		Attache:     resp.SecureURL,
		Description: request.Description,
	}

	article, err = h.ArticleRepository.CreateArticle(article)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	article, _ = h.ArticleRepository.GetArticle(article.ID)

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: article})
}

func (h *handlerArticle) GetArticle(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	article, err := h.ArticleRepository.GetArticle(uint(id))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: article})
}

func (h *handlerArticle) FindArticles(c echo.Context) error {
	articles, err := h.ArticleRepository.FindArticles()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if len(articles) <= 0 {
		return c.JSON(http.StatusOK, dto.ErrorResult{Code: http.StatusOK, Message: "Record not found"})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: articles})
}

func (h *handlerArticle) UpdateArticle(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userRole := userLogin.(jwt.MapClaims)["role"].(string)
	if userRole == "Doctor" {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
		}

		dataFile := c.Get("dataFile").(string)

		request := articledto.ArticleRequest{
			Title:       c.FormValue("title"),
			Attache:     dataFile,
			Description: c.FormValue("description"),
		}

		validation := validator.New()
		err = validation.Struct(request)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		}

		article, err := h.ArticleRepository.GetArticle(uint(id))
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
		}

		if request.Title != "" {
			article.Title = request.Title
		}

		if request.Attache != "" {
			article.Attache = path_file + request.Attache
		}

		if request.Description != "" {
			article.Description = request.Description
		}

		articleUpdated, err := h.ArticleRepository.UpdateArticle(article)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		}

		return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: articleUpdated})
	}

	return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Access denied"})

}

func (h *handlerArticle) DeleteArticle(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	article, err := h.ArticleRepository.GetArticle(uint(id))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	articleDelete, err := h.ArticleRepository.DeleteArticle(article)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: articleDelete})
}

func (h *handlerArticle) FindMyArticles(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	articles, err := h.ArticleRepository.FindMyArticles(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if len(articles) <= 0 {
		return c.JSON(http.StatusOK, dto.ErrorResult{Code: http.StatusOK, Message: "Record not found"})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: articles})
}
