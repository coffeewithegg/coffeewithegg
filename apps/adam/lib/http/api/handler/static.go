package handler

import (
	"io/fs"
	"net/http"

	"github.com/labstack/echo/v4"
)

// Static wraps a http.FileServer into an echo.HandlerFunc
func Static(prefix string, fsys fs.FS, dir string) echo.HandlerFunc {
	h := http.FileServer(func() http.FileSystem {
		fsub, err := fs.Sub(fsys, dir)
		if err != nil {
			panic(err)
		}
		return http.FS(fsub)
	}())

	return echo.WrapHandler(http.StripPrefix(prefix, h))

}
