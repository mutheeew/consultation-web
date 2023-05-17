package responsedto

type ResponseRequest struct {
	ResponseText     string `json:"responseText" form:"responseText"`
	ConsultationLink string `json:"consultationLink" form:"consultationLink"`
}
