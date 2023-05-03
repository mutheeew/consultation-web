package repositories

import (
	"hallocorona/models"

	"gorm.io/gorm"
)

type ArticleRepository interface {
	CreateArticle(article models.Article) (models.Article, error)
	GetArticle(ID uint) (models.Article, error)
	FindArticles() ([]models.Article, error)
	UpdateArticle(article models.Article) (models.Article, error)
	DeleteArticle(article models.Article) (models.Article, error)
	FindMyArticles(ID int) ([]models.Article, error)
}

func RepositoryArticle(db *gorm.DB) *repository {
	return &repository{db}
}

func (repo *repository) CreateArticle(article models.Article) (models.Article, error) {
	err := repo.db.Create(&article).Error
	return article, err
}

func (repo *repository) GetArticle(ID uint) (models.Article, error) {
	var article models.Article
	err := repo.db.Preload("User").First(&article, ID).Error
	return article, err
}

func (repo *repository) FindArticles() ([]models.Article, error) {
	var articles []models.Article
	err := repo.db.Preload("User").Find(&articles).Error
	return articles, err
}

func (repo *repository) UpdateArticle(article models.Article) (models.Article, error) {
	err := repo.db.Save(&article).Error
	return article, err
}

func (repo *repository) DeleteArticle(article models.Article) (models.Article, error) {
	err := repo.db.Delete(&article).Error
	return article, err
}

func (repo *repository) FindMyArticles(ID int) ([]models.Article, error) {
	var articles []models.Article
	err := repo.db.Preload("User").Where("user_id =?", ID).Find(&articles).Error
	return articles, err
}
