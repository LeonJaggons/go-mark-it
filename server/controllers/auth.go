package controllers

import (
	"mark-it/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddAuthRoutes(e *gin.Engine) {
	AddRoute(e, "POST", handleRegister, "auth", "register")
	AddRoute(e, "POST", handleSignIn, "auth", "login")
	AddRoute(e, "POST", handleSignIn, "auth", "exists")
}

func handleRegister(c *gin.Context) {
	var registerUser *models.User

	if err := c.ShouldBindJSON(&registerUser); err != nil {
		SendErrorReponse(c, err)
		return
	}

	if err := AuthService.RegisterUser(registerUser); err != nil {
		SendErrorReponse(c, err)
		return
	}

	c.JSON(http.StatusAccepted, registerUser)
}

func handleSignIn(c *gin.Context) {
	var userCreds *models.UserCredentials

	if err := c.ShouldBindJSON(&userCreds); err != nil {
		SendErrorReponse(c, err)
		return
	}

	user, err := AuthService.GetUserByEmail(userCreds.Email)
	if err != nil {
		SendErrorReponse(c, err)
		return
	}
	loginErr := AuthService.CheckPassword(userCreds.Password, user)
	if loginErr != nil {
		SendErrorReponse(c, loginErr)
		return
	}
	c.String(http.StatusOK, "User signed in")
	// AuthService.SignInUser(userCreds)

}
