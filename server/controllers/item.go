package controllers

import (
	"mark-it/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddItemRoutes(e *gin.Engine) {
	AddRoute(e, "GET", handleGetAllItems, "item")
	AddRoute(e, "POST", handlePostItem, "item")
	AddRoute(e, "GET", handleGetCategory, "item", "category")
}

func handleGetAllItems(c *gin.Context) {
	items := ItemService.GetAllItems()
	c.JSON(http.StatusOK, items)
}

func handlePostItem(c *gin.Context) {
	var newItem models.Item
	if err := c.ShouldBindJSON(&newItem); err != nil {
		SendErrorReponse(c, err)
		return
	}
	ItemService.PostItem(&newItem)
	c.JSON(http.StatusAccepted, newItem)
}

func handleGetCategory(c *gin.Context) {
	level := c.Query("level")
	parent := c.Query("parent")
	var cats []models.Category
	if parent == "" {

		cats = ItemService.GetCategoriesByLevel(level)
	} else {
		cats = ItemService.GetSubcategories(level, parent)
	}

	c.JSON(http.StatusOK, cats)
}
