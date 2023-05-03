package handlers

import (
	authdto "hallocorona/dto/auth"
	dto "hallocorona/dto/result"
	"hallocorona/models"
	"hallocorona/pkg/bcrypt"
	jwtToken "hallocorona/pkg/jwt"
	"hallocorona/repositories"
	"log"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}

func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}

func (h *handlerAuth) Register(c echo.Context) error {
	request := new(authdto.AuthRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	passwordHash, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	dataUser := models.User{
		FullName: request.FullName,
		Username: request.Username,
		Email:    request.Email,
		Password: passwordHash,
		// Role:     request.Role,
		// Gender:   request.Gender,
		// Phone:    request.Phone,
		// Address:  request.Address,
		// Photo: path_file + "uploads/profile.png",
	}

	newUser, err := h.AuthRepository.Register(dataUser)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: "username or email already registered"})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: newUser})

}

func (h *handlerAuth) Login(c echo.Context) error {
	request := new(authdto.AuthRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data := models.User{
		Username: request.Username,
		Password: request.Password,
	}

	userLogin, err := h.AuthRepository.Login(data.Username)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "username not registered"})
	}

	isValid := bcrypt.CheckPasswordHash(request.Password, userLogin.Password)
	if !isValid {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Incorrect email or password"})
	}

	claims := jwt.MapClaims{}
	claims["id"] = userLogin.ID
	// claims["role"] = userLogin.Role
	claims["exp"] = time.Now().Add(time.Hour * 4).Unix() // 4 hours expired

	token, generateTokenErr := jwtToken.GenerateToken(&claims)
	if generateTokenErr != nil {
		log.Println(generateTokenErr)
		return echo.NewHTTPError(http.StatusUnauthorized)
	}

	loginResponse := authdto.LoginResponse{
		ID:       userLogin.ID,
		FullName: userLogin.FullName,
		Username: userLogin.Username,
		Email:    userLogin.Email,
		// Role:     userLogin.Role,
		// Gender:   userLogin.Gender,
		// Phone:    userLogin.Phone,
		// Address:  userLogin.Address,
		Token: token,
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: loginResponse})

}

func (h *handlerAuth) CheckAuth(c echo.Context) error {
	user := c.Get("userLogin")
	userId := user.(jwt.MapClaims)["id"].(float64)

	userLogin, _ := h.AuthRepository.CheckAuth(int(userId))

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: responseCheckAuth(userLogin)})
}

type resp struct {
	ID       uint
	FullName string
	Username string
	Email    string
	Role     string
	Gender   string
	Phone    string
	Address  string
	Photo    string
}

func responseCheckAuth(u models.User) resp {
	return resp{
		ID:       u.ID,
		FullName: u.FullName,
		Username: u.Username,
		Email:    u.Email,
		// Role:     u.Role,
		// Gender:   u.Gender,
		// Phone:    u.Phone,
		// Address:  u.Address,
		// Photo:    u.Photo,
	}
}
