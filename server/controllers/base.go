package controllers

import (
	contants "mark-it/constants"
	"mark-it/database"
	"mark-it/services"

	"github.com/gin-gonic/gin"
)

func AddRoute(e *gin.Engine, method contants.HttpMethod, f func(c *gin.Context), routeSegments ...string) {
	var route string = "/"
	for _, seg := range routeSegments {
		route += seg
	}

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

var ItemService services.ItemService = services.ItemService{
	Database: database.Store,
}
