package services

import (
	"context"
	"errors"
	"github.com/coffeewithegg/adam/models"
)

// ProjectMapper defines the datastore handling persisting Project documents.
type ProjectMapper interface {
	Create(ctx context.Context, model *models.Project) (*models.Project, error)
	Find(ctx context.Context, filter any, limit int, skip int) (int64, models.Projects, error)
	FindOneById(ctx context.Context, id string) (*models.Project, error)
	Update(ctx context.Context, model *models.Project) (*models.Project, error)
}

var (
	ErrTaskDeleted  = errors.New("task was deleted")
	ErrTaskNotFound = errors.New("task not found")
)

// Project defines the application service in charge of interacting with Tasks.
type Project struct {
	mapper ProjectMapper
}

func NewTask(mapper ProjectMapper) *Project {
	return &Project{mapper: mapper}
}

func (t *Project) Create(ctx context.Context, id string, model *models.Project) (*models.Project, error) {

	return nil, nil
}

func (t *Project) Read(ctx context.Context, id string) (*models.Project, error) {
	return nil, nil
}

func (t *Project) Update(ctx context.Context, id string, model *models.Project) (*models.Project, error) {
	return nil, nil
}

func (t *Project) Delete(ctx context.Context, id string, model *models.Project) error {
	return nil
}

func (t *Project) Find(ctx context.Context, params *models.ProjectSearchParams) (int64, models.Projects, error) {
	return 0, nil, nil
}
