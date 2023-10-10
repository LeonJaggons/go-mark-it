package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Item struct {
	Id          string         `gorm:"column:id;type:uuid"`
	Title       string         `gorm:"column:title"`
	Description string         `gorm:"column:description"`
	Price       int            `gorm:"column:price"`
	UserId      uuid.UUID      `gorm:"column:userid"`
	ConditionId uuid.UUID      `gorm:"column:conditionid;type:uuid"`
	CategoryId  uuid.UUID      `gorm:"column:categoryid;type:uuid"`
	Latitude    float64        `gorm:"column:latitude"`
	Longitude   float64        `gorm:"column:longitude"`
	Images      pq.StringArray `gorm:"column:images;type:text[]"`
	CreatedDate time.Time      `gorm:"column:createddate"`
}

func (Item) TableName() string {
	return "item"
}

func (item *Item) BeforeCreate(tx *gorm.DB) (err error) {
	item.Id = uuid.New().String()
	item.CreatedDate = time.Now()
	return nil
}
