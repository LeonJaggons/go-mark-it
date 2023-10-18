package database

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

func GetPGConnectionString(config PGConfig) string {
	return fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", config.host, config.port, config.user, config.password, config.dbname)
}

func OpenConnection() *gorm.DB {
	if err := godotenv.Load(".env"); err != nil {
		fmt.Println(err)

	}

	var defaultConfig PGConfig = PGConfig{
		host:     os.Getenv("DB_HOST"),
		port:     os.Getenv("DB_PORT"),
		user:     os.Getenv("DB_USER"),
		password: os.Getenv("DB_PASSWORD"),
		dbname:   os.Getenv("DB_NAME"),
	}
	pgConnStr := GetPGConnectionString(defaultConfig)
	fmt.Print(pgConnStr)
	gormConfig := gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			TablePrefix:   "t_",
			SingularTable: true,
			NoLowerCase:   true,
		},
	}

	db, err := gorm.Open(postgres.Open(pgConnStr), &gormConfig)
	db.AutoMigrate()

	if err != nil {
		log.Panic(err)
	}
	db.Debug()
	return db
}

var Store *gorm.DB = OpenConnection()
