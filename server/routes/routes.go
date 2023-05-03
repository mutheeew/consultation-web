package routes

import "github.com/labstack/echo/v4"

func RouteInit(e *echo.Group) {
	AuthRoutes(e)
	ArticleRoutes(e)
	ConsultationRoutes(e)
	ResponseRoutes(e)
}
