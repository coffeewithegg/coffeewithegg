package middleware

import (
	"fmt"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
)

func Cache(prefix string, d time.Duration) func(next echo.HandlerFunc) echo.HandlerFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			path := c.Request().URL.Path
			maxAge := int(d.Seconds())

			if strings.HasPrefix(path, prefix) {
				c.Response().Header().Set("Cache-Control", fmt.Sprintf("public, max-age=%d", maxAge))
			}

			return next(c)
		}
	}
}
