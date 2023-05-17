package routes

import (
	"hallocorona/handlers"
	"hallocorona/pkg/middleware"
	"hallocorona/pkg/mysql"
	"hallocorona/repositories"

	"github.com/labstack/echo/v4"
)

func ResponseRoutes(e *echo.Group) {
	responseRepository := repositories.RepositoryResponse(mysql.DB)
	h := handlers.HandlerResponse(responseRepository)

	e.POST("/response/:id", middleware.Auth(h.CreateResponse))
	e.GET("/responses/", h.GetResponse)
}
