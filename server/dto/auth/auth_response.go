package authdto

type LoginResponse struct {
	ID       uint
	FullName string
	Username string
	Email    string
	Role     string
	Gender   string
	Phone    string
	Address  string
	Token    string
}
