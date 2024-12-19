package main

import (
	"github.com/labstack/echo/v4"
	"github.com/spf13/viper"
	"net/http"
)

func main() {
	c := config.New()
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start(":1323"))
}
