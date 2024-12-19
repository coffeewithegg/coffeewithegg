package config

import (
	libLog "adam/internal/log"
	"github.com/joho/godotenv"
)

type Config struct {
	DB      DBConfig
	Logging *libLog.LogConfig
}

func New() *Config {
	err := godotenv.Load()

	if err != nil {
		panic(err)
	}

	return &Config{
		DB:      LoadDBConfig(),
		Logging: libLog.DefaultConfig,
	}
}
