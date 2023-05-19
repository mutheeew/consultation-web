package routes

import (
	"hallocorona/handlers"
	"hallocorona/pkg/middleware"
	"hallocorona/pkg/mysql"
	"hallocorona/repositories"

	"github.com/labstack/echo/v4"
)

func ArticleRoutes(e *echo.Group) {
	articleRepository := repositories.RepositoryArticle(mysql.DB)
	h := handlers.HandlerArticle(articleRepository)

	e.POST("/article/:id", middleware.Auth(middleware.UploadFile(h.CreateArticle)))
	e.GET("/article/:id", h.GetArticle)
	e.GET("/articles", h.FindArticles)
	e.GET("/articles/:id", h.FindMyArticles)
	e.PATCH("/article/:id", middleware.Auth(middleware.UploadFile(h.UpdateArticle)))
}
