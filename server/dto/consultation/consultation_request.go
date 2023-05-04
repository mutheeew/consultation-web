package consultationdto

type ConsultationRequest struct {
	UserId      int    `json:"userId" validate:"required"`
	BornDate    string `json:"bornDate" validate:"required"`
	Age         int    `json:"age" validate:"required"`
	Height      int    `json:"height" validate:"required"`
	Weight      int    `json:"weight" validate:"required"`
	Subject     string `json:"subject" validate:"required"`
	RequestDate string `json:"requestDate" validate:"required"`
	Description string `json:"description" validate:"required"`
}
