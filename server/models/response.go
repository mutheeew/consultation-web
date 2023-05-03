package models

import "time"

type Response struct {
	ID               uint `gorm:"primaryKey;autoIncrement"`
	UserId           int
	User             UserResponse
	ConsultationId   int
	ResponseText     string `gorm:"type: text"`
	ConsultationLink string `gorm:"type: text"`
	CreatedAt        time.Time
	UpdatedAt        time.Time
}
