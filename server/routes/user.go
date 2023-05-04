package routes

import (
	"hallocorona/handlers"
	"hallocorona/pkg/mysql"
	"hallocorona/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	// e.GET("/users", h.FindUsers)
	e.GET("/user/:id", h.GetUser)

}
