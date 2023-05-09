package models

import "time"

type Response struct {
	ID               uint `gorm:"primaryKey;autoIncrement"`
	UserId           int
	User             UserResponse
	ConsultationId   int
	ResponseText     string `gorm:"type: text" form:"responseText"`
	ConsultationLink string `gorm:"type: text" form:"consultationLink"`
	CreatedAt        time.Time
	UpdatedAt        time.Time
}
