package server

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func TestNew(t *testing.T) {
	s := New()
	s.addHandlers()

	req := httptest.NewRequest(http.MethodGet, "/readyz", nil)
	resp := httptest.NewRecorder()

	s.ServeHTTP(resp, req)
	assert.Equal(t, http.StatusOK, resp.Code)
	assert.Contains(t, resp.Body.String(), "readyz check passed")

	req = httptest.NewRequest(http.MethodGet, "/livez", nil)
	resp = httptest.NewRecorder()

	s.ServeHTTP(resp, req)
	assert.Equal(t, http.StatusOK, resp.Code)
	assert.Contains(t, resp.Body.String(), "livez check passed")
}

func livez(c echo.Context) error {
	return c.String(http.StatusOK, "custom livez")
}

func TestLivez(t *testing.T) {
	s := New()
	s.LivezHandler = livez
	s.addHandlers()

	req := httptest.NewRequest(http.MethodGet, "/livez", nil)
	resp := httptest.NewRecorder()

	s.ServeHTTP(resp, req)
	assert.Equal(t, http.StatusOK, resp.Code)
	assert.Contains(t, resp.Body.String(), "custom livez")
}

func readyz(c echo.Context) error {
	return c.String(http.StatusOK, "custom readyz")
}

func TestReadyz(t *testing.T) {
	s := New()
	s.ReadyzHandler = readyz
	s.addHandlers()

	req := httptest.NewRequest(http.MethodGet, "/readyz", nil)
	resp := httptest.NewRecorder()

	s.ServeHTTP(resp, req)
	assert.Equal(t, http.StatusOK, resp.Code)
	assert.Contains(t, resp.Body.String(), "custom readyz")
}
