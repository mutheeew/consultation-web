package handlers

import (
	responsedto "hallocorona/dto/response"
	dto "hallocorona/dto/result"
	"hallocorona/models"
	"hallocorona/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerResponse struct {
	ResponseRepository repositories.ResponseRepository
}

func HandlerResponse(ResponseRepository repositories.ResponseRepository) *handlerResponse {
	return &handlerResponse{ResponseRepository}
}

func (h *handlerResponse) CreateResponse(c echo.Context) error {
	userLogin := c.Get("userLogin")
	idUser := userLogin.(jwt.MapClaims)["id"].(float64)

	consultId, _ := strconv.Atoi(c.Param("id"))

	request := responsedto.ResponseRequest{
		ResponseText:     c.FormValue("responseText"),
		ConsultationLink: c.FormValue("consultationLink"),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: "err1"})
	}

	response := models.Response{
		UserId:           int(idUser),
		ConsultationId:   consultId,
		ResponseText:     request.ResponseText,
		ConsultationLink: request.ConsultationLink,
	}

	response, err = h.ResponseRepository.CreateResponse(response)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: "err2"})
	}

	response, _ = h.ResponseRepository.GetResponse(response.ID)

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: response})
}

func (h *handlerResponse) GetResponse(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	response, err := h.ResponseRepository.GetResponse(uint(id))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: response})
}

func (h *handlerResponse) GetResponseByConsul(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	response, err := h.ResponseRepository.GetResponseByConsul(uint(id))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: response})
}

func (h *handlerResponse) GetAllResponses(c echo.Context) error {
	response, err := h.ResponseRepository.GetAllResponses()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: response})
}
