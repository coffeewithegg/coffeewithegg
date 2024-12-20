package handlers

import (
	"context"
	"net/http"

	"github.com/coffeewithegg/adam/lib/http/api/server"
	"github.com/coffeewithegg/adam/middlewares/openapi"
	"github.com/coffeewithegg/adam/models"

	"github.com/labstack/echo/v4"
)

type ProjectService interface {
	Create(ctx context.Context, id string, data *models.Project) (*models.Project, error)
	Read(ctx context.Context, id string) (*models.Project, error)
	Update(ctx context.Context, id string, data *models.Project) (*models.Project, error)
	Delete(ctx context.Context, id string, data *models.Project) error
	Find(ctx context.Context, params *models.ProjectSearchParams) (int64, models.Projects, error)
}

type ProjectHandler struct {
	*openapi.Handler
	svc ProjectService
}

func NewTaskHandler(openapi *openapi.Handler, svc ProjectService) *ProjectHandler {
	return &ProjectHandler{
		Handler: openapi,
		svc:     svc,
	}
}

func (h *ProjectHandler) Register(s *server.Server) {
	s.Add(http.MethodPost, "/projects", h.create)
	s.Add(http.MethodGet, "/projects", h.list)
	s.Add(http.MethodGet, "/projects/:id", h.get)
	s.Add(http.MethodPut, "/projects/:id", h.update)
	s.Add(http.MethodDelete, "/tasks/:id", h.delete)
}

type CreateProjectRequest struct {
	Title string `json:"title"`
}

func (h *ProjectHandler) create(c echo.Context) error {

	return nil
}

func (h *ProjectHandler) list(c echo.Context) error {

	return nil
}

func (h *ProjectHandler) get(c echo.Context) error {

	return nil
}

type UpdateProjectRequest struct {
	Title *string `json:"title"`
}

func (h *ProjectHandler) update(c echo.Context) error {

	return nil
}

func (h *ProjectHandler) delete(c echo.Context) error {

	return nil
}
