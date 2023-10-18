package controllers

import (
	"fmt"
	contants "mark-it/constants"
	"mark-it/database"
	"mark-it/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddRoute(e *gin.Engine, method contants.HttpMethod, f func(c *gin.Context), routeSegments ...string) {
	var route string = "/"
	for _, seg := range routeSegments {
		route += seg + "/"
	}

	fmt.Println("Adding " + route)
	switch method {
	case "GET":
		e.GET(route, f)
	case "PUT":
		e.PUT(route, f)
	case "POST":
		e.POST(route, f)
	case "DELETE":
		e.DELETE(route, f)
	}

}

func SendErrorReponse(c *gin.Context, err error) {
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
}

var ItemService services.ItemService = services.ItemService{
	Database: database.Store,
}

var AuthService services.AuthService = services.AuthService{
	Database: database.Store,
}
