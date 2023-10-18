package services

import (
	"errors"
	"fmt"
	"mark-it/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthService struct {
	Database *gorm.DB
}

func (a *AuthService) HashPassword(registerUser *models.User) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(registerUser.Password), 8)
	registerUser.PasswordHash = string(bytes)
	return err
}

func (a *AuthService) CheckPassword(password string, user *models.User) error {
	bHashedPassword := []byte(user.PasswordHash)
	bPassword := []byte(password)

	err := bcrypt.CompareHashAndPassword(bHashedPassword, bPassword)
	fmt.Println(err)
	return err
}
func (a *AuthService) RegisterUser(registerUser *models.User) error {
	a.HashPassword(registerUser)
	hashedPassword := []byte(registerUser.PasswordHash)
	password := []byte(registerUser.Password)

	err := bcrypt.CompareHashAndPassword(hashedPassword, password)
	if err != nil {
		return err
	}
	tx := a.Database.Omit("id").Create(&registerUser)
	tx.Find(&registerUser)
	return nil
}

func (a *AuthService) CheckUserExists(email string) bool {
	var users []models.User
	a.Database.Table("user").Where("email = ?", email).Find(&users)
	return len(users) > 0
}
func (a *AuthService) GetUserByEmail(email string) (*models.User, error) {
	if a.CheckUserExists(email) {
		var user *models.User
		a.Database.Table("user").Where("email = ?", email).Find(&user)
		return user, nil
	}
	return nil, errors.New("User could not be found")

}
func (a *AuthService) SignInUser(userCredentials *models.UserCredentials) error {

	return errors.New("Help")
}
