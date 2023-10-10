package database

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

var defaultConfig PGConfig = PGConfig{
	host:     "localhost",
	port:     5432,
	user:     "postgres",
	password: "Orbit101!",
	dbname:   "mark-it",
}

func GetPGConnectionString(config PGConfig) string {
	return fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", config.host, config.port, config.user, config.password, config.dbname)
}

func OpenConnection() *gorm.DB {
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
