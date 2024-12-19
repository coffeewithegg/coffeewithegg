package handler

import (
	"embed"
	"net/http"
	"net/http/httptest"
	"testing"

	"adam/lib/http/api/server"
	"github.com/stretchr/testify/assert"
)

//go:embed static/*
var staticFS embed.FS

func TestStatic(t *testing.T) {
	s := server.New()
	s.GET("/static/*", Static("/static/", staticFS, "static"))

	testCases := []struct {
		name string
		req  *http.Request
		resp *httptest.ResponseRecorder
	}{
		{"/foobar", httptest.NewRequest(http.MethodGet, "/static/foobar", nil), httptest.NewRecorder()},
		{"/foo/bar", httptest.NewRequest(http.MethodGet, "/static/foo/bar", nil), httptest.NewRecorder()},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			s.ServeHTTP(tc.resp, tc.req)
			assert.Equal(t, http.StatusOK, tc.resp.Code)
		})
	}
}
