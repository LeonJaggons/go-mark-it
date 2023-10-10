package controllers

import (
	"mark-it/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddItemRoutes(e *gin.Engine) {
	AddRoute(e, "GET", handleGetAllItems, "item")
	AddRoute(e, "POST", handlePostItem, "item")
}

func handleGetAllItems(c *gin.Context) {
	items := ItemService.GetAllItems()
	c.JSON(http.StatusOK, items)
}

func handlePostItem(c *gin.Context) {
	var newItem models.Item
	if err := c.ShouldBindJSON(&newItem); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ItemService.PostItem(&newItem)
	c.JSON(http.StatusAccepted, newItem)
}
