package responsedto

type ResponseRequest struct {
	ResponseText     string `form:"responseText"`
	ConsultationLink string `form:"consultationLink"`
}
