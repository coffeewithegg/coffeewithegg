package models

import (
	"gorm.io/gorm"
)

type Project struct {
	gorm.Model
	Name         string `gorm:"not null"`
	Key          string `gorm:"not null"`
	Description  string
	Technologies []string
}

type Projects []Project

type ProjectSearchParams struct {
	Technologies []string
	CreatedBy    string
	Queries      []string
	Limit        int
	Skip         int
}
