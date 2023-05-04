package models

import "time"

type User struct {
	ID        uint   `gorm:"primaryKey;autoIncrement"`
	FullName  string `gorm:"type: varchar(100)"`
	Username  string `gorm:"unique; type: varchar(100)"`
	Email     string `gorm:"unique; type: varchar(100)"`
	Password  string `gorm:"type: varchar(255)"`
	Role      string `gorm:"type: varchar(20)"`
	Gender    string `gorm:"type: varchar(10)"`
	Phone     string `gorm:"unique; type: varchar(20)"`
	Address   string `gorm:"type: text"`
	Photo     string `gorm:"type:varchar(255)"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type UserResponse struct {
	ID       uint
	FullName string
}

type UserConsultation struct {
	ID       uint
	FullName string
	Gender   string
	Phone    string
}

func (UserResponse) TableName() string {
	return "users"
}

func (UserConsultation) TableName() string {
	return "users"
}
