package models

import (
	"time"
)

type User struct {
	Id           string    `json:"id" gorm:"column:id"`
	FirstName    string    `json:"firstName" binding:"required" gorm:"column:firstname"`
	LastName     string    `json:"lastName" binding:"required" gorm:"column:lastname"`
	Email        string    `json:"email" binding:"required" gorm:"column:email"`
	UserName     string    `json:"username" binding:"required" gorm:"column:username"`
	Password     string    `json:"password" binding:"required" gorm:"-"`
	PasswordHash string    `json:"passwordHash" gorm:"column:passwordhash"`
	CreatedDate  time.Time `json:"createdDate" gorm:"column:createddate"`
	Error        error     `json:"error" gorm:"-"`
}

func (User) TableName() string {
	return "user"
}

type UserCredentials struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}
