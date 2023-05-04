package consultationdto

type ConsultationRequest struct {
	UserId      int    `validate:"required"`
	BornDate    string `validate:"required"`
	Age         int    `validate:"required"`
	Height      int    `validate:"required"`
	Weight      int    `validate:"required"`
	Subject     string `validate:"required"`
	RequestDate string `validate:"required"`
	Description string `validate:"required"`
}
