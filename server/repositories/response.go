package repositories

import (
	"hallocorona/models"

	"gorm.io/gorm"
)

type ResponseRepository interface {
	CreateResponse(response models.Response) (models.Response, error)
	GetResponse(ID uint) (models.Response, error)
}

func RepositoryResponse(db *gorm.DB) *repository {
	return &repository{db}
}

func (repo *repository) CreateResponse(response models.Response) (models.Response, error) {
	err := repo.db.Preload("User").Preload("Consultation").Create(&response).Error
	return response, err
}

func (repo *repository) GetResponse(ID uint) (models.Response, error) {
	var response models.Response
	err := repo.db.Where("user_id=?", ID).Preload("User").Preload("Consultation").First(&response).Error
	return response, err
}
