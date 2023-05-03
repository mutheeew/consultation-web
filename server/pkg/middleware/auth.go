package middleware

import (
	dto "hallocorona/dto/result"
	jwtToken "hallocorona/pkg/jwt"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

type Result struct {
	Status  int
	Data    interface{}
	Message string
}

// Create Auth function here ...
func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		token := c.Request().Header.Get("Authorization")

		if token == "" {
			return c.JSON(http.StatusUnauthorized, dto.ErrorResult{Code: http.StatusUnauthorized, Message: "unauthorized"})
		}

		token = strings.Split(token, " ")[1]
		claims, err := jwtToken.DecodeToken(token)

		if err != nil {
			return c.JSON(http.StatusUnauthorized, Result{Status: http.StatusUnauthorized, Message: "unathorized"})
		}

		c.Set("userLogin", claims)
		return next(c)
	}
}
