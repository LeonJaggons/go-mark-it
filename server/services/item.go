package services

import (
	"fmt"
	"mark-it/models"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ItemService struct {
	Database *gorm.DB
}

func (i *ItemService) GetAllItems() []models.Item {
	var items []models.Item
	i.Database.Find(&items)
	return items
}

func (i *ItemService) PostItem(item *models.Item) {
	i.Database.Create(&item)
}

func (i *ItemService) SaveItemImages(c *gin.Context, itemId uuid.UUID) string {
	form, _ := c.MultipartForm()
	files := form.File["upload[]"]

	for i, file := range files {
		fileDest := fmt.Sprintf("/images/%s/img_%d", itemId, i)
		c.SaveUploadedFile(file, fileDest)

	}
	// Return DL url
	return ""
}

func (i *ItemService) GetCategoriesByLevel(catLevel string) []models.Category {
	var cats []models.Category
	i.Database.Table("category").Where("categorylevel = ?", catLevel).Find(&cats)
	return cats
}
func (i *ItemService) GetSubcategories(catLevel string, parentCat string) []models.Category {
	intLevel, _ := strconv.Atoi(catLevel)
	intLevel = intLevel + 1
	var cats []models.Category
	i.Database.Table("category").Where("categorylevel = ?", intLevel).Where("parentcategoryname = ?", parentCat).Find(&cats)
	return cats
}
