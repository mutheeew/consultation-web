package models

import "time"

type Consultation struct {
	ID          uint `gorm:"primaryKey;autoIncrement"`
	UserId      int
	User        UserConsultation
	BornDate    string `gorm:"type: varchar(50)"`
	Age         int
	Height      int
	Weight      int
	Subject     string `gorm:"type: varchar(20)"`
	RequestDate string `gorm:"type: varchar(50)"`
	Description string `gorm:"type: text"`
	Status      string `gorm:"type: varchar(100)"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
