package authdto

type AuthRequest struct {
	FullName string `validate:"required"`
	Username string `validate:"required"`
	Email    string `validate:"required"`
	Password string `validate:"required"`
	Role     string
	Gender   string `validate:"required"`
	Phone    string `validate:"required"`
	Address  string `validate:"required"`
}

type LoginRequest struct {
	Username string `validate:"required"`
	Password string `validate:"required"`
}
