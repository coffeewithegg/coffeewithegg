package data

import (
	"fmt"

	libPG "adam/lib/db/postgres"

	"github.com/spf13/viper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func NewGormClient() (*gorm.DB, error) {
	host := viper.GetString(libPG.PostgresHost)
	port := viper.GetString(libPG.PostgresPort)
	username := viper.GetString(libPG.PostgresUser)
	password := viper.GetString(libPG.PostgresPassword)
	dbname := viper.GetString(libPG.PostgresDBName)

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=%s", host, username, password, dbname, port, "UTC")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return db, nil
}
