package models

import "time"

type Article struct {
	ID          uint `gorm:"primaryKey;autoIncrement"`
	UserId      int
	User        UserResponse
	Title       string `gorm:"type: varchar(255)"`
	Attache     string `gorm:"type: varchar(255)"`
	Description string `gorm:"type: text"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
