package dto

type SuccessResult struct {
	Code int
	Data interface{}
}

type ErrorResult struct {
	Code    int
	Message string
}
