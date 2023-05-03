package repositories

import (
	"hallocorona/models"

	"gorm.io/gorm"
)

type ConsultationRepository interface {
	CreateConsultation(consultation models.Consultation) (models.Consultation, error)
	GetConsultation(ID uint) (models.Consultation, error)
	FindMyConsultations(ID int) ([]models.Consultation, error)
	FindConsultations() ([]models.Consultation, error)
	UpdateConsultation(consultation models.Consultation) (models.Consultation, error)
}

func RepositoryConsultation(db *gorm.DB) *repository {
	return &repository{db}
}

func (repo *repository) CreateConsultation(consultation models.Consultation) (models.Consultation, error) {
	err := repo.db.Create(&consultation).Error
	return consultation, err
}

func (repo *repository) GetConsultation(ID uint) (models.Consultation, error) {
	var consultation models.Consultation
	err := repo.db.Preload("User").First(&consultation, ID).Error
	return consultation, err
}

func (repo *repository) FindMyConsultations(ID int) ([]models.Consultation, error) {
	var consultation []models.Consultation
	err := repo.db.Where("user_id = ?", ID).Preload("User").Find(&consultation).Error
	return consultation, err
}

func (repo *repository) FindConsultations() ([]models.Consultation, error) {
	var consultation []models.Consultation
	err := repo.db.Preload("User").Find(&consultation).Error
	return consultation, err
}

func (r *repository) UpdateConsultation(consultation models.Consultation) (models.Consultation, error) {
	err := r.db.Save(&consultation).Error
	return consultation, err
}
