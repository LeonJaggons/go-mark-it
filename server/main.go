package main

import (
	"mark-it/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	//LoadEnv()
	engine := GetAppEngine()

	AddEngineConfiguations(engine)
	engine.Run()
}

func GetAppEngine() *gin.Engine {
	engine := gin.Default()
	return engine
}

func AddEngineConfiguations(e *gin.Engine) {
	AddAppRoutes(e)
	AllowCORS(e)
}

func AddAppRoutes(e *gin.Engine) {
	controllers.AddItemRoutes(e)
	controllers.AddAuthRoutes(e)

}

func AllowCORS(r *gin.Engine) {
	corsConfig := cors.DefaultConfig()

	corsConfig.AllowOrigins = []string{"*"}
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}

	r.Use(cors.New(corsConfig))
}
