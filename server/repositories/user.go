package repositories

import (
	"hallocorona/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	GetUser(ID uint) (models.User, error)
	FindUsers() ([]models.User, error)
	UpdateUser(user models.User) (models.User, error)
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (repo *repository) GetUser(ID uint) (models.User, error) {
	var user models.User
	err := repo.db.First(&user, ID).Error
	return user, err
}

func (repo *repository) FindUsers() ([]models.User, error) {
	var user []models.User
	err := repo.db.Find(&user).Error
	return user, err
}

func (repo *repository) UpdateUser(user models.User) (models.User, error) {
	err := repo.db.Save(&user).Error
	return user, err
}
