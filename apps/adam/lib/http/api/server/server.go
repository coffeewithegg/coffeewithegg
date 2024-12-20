package server

import (
	"context"
	"errors"
	"fmt"
	"github.com/coffeewithegg/adam/lib/http/api/config"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/rs/zerolog/log"
	"github.com/spf13/viper"
)

type Server struct {
	*echo.Echo
	*config.Config

	ReadyzHandler echo.HandlerFunc
	LivezHandler  echo.HandlerFunc
}

func Readz(c echo.Context) error {
	return c.String(http.StatusOK, "readyz check passed")
}

func Livez(c echo.Context) error {
	return c.String(http.StatusOK, "livez check passed")
}

func New() *Server {
	e := echo.New()

	e.HideBanner = true
	e.HidePort = true

	mws := []echo.MiddlewareFunc{
		middleware.Recover(),
		middleware.RequestID(),
	}

	if viper.GetBool(config.HTTPCORSEnabled) {
		cors := middleware.CORSWithConfig(middleware.CORSConfig{
			AllowOrigins:     viper.GetStringSlice(config.HTTPCORSAllowOrigins),
			AllowMethods:     viper.GetStringSlice(config.HTTPCORSAllowMethods),
			AllowHeaders:     viper.GetStringSlice(config.HTTPCORSAllowHeaders),
			AllowCredentials: viper.GetBool(config.HTTPCORSAllowCredentials),
			ExposeHeaders:    viper.GetStringSlice(config.HTTPCORSExposeHeaders),
			MaxAge:           viper.GetInt(config.HTTPCORSMaxAge),
		})
		mws = append(mws, cors)
	}

	if viper.GetBool(config.HTTPLogRequests) {
		logger := middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
			LogRequestID:     true,
			LogRemoteIP:      true,
			LogHost:          true,
			LogMethod:        true,
			LogURI:           true,
			LogUserAgent:     true,
			LogStatus:        true,
			LogError:         true,
			LogLatency:       true,
			LogContentLength: true,
			LogResponseSize:  true,
			LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
				i, _ := strconv.Atoi(v.ContentLength)
				log.Logger.Info().
					Str("time", time.Now().Format(time.RFC3339Nano)).
					Str("id", v.RequestID).
					Str("remote_id", v.RemoteIP).
					Str("host", v.Host).
					Str("method", v.Method).
					Str("uri", v.URI).
					Str("user_agent", v.UserAgent).
					Int("status", v.Status).
					Err(v.Error).
					Int64("latency", v.Latency.Nanoseconds()).
					Str("latency_human", v.Latency.String()).
					Int64("bytes_in", int64(i)).
					Int64("bytes_out", v.ResponseSize).
					Send()

				return nil
			},
		})

		mws = append(mws, logger)
	}

	e.Use(mws...)

	return &Server{
		e,
		config.DefaultConfig,
		Readz,
		Livez,
	}
}

func (s *Server) addHandlers() {
	s.Echo.Add(echo.GET, "/readyz", s.ReadyzHandler)
	s.Echo.Add(echo.GET, "/livez", s.LivezHandler)
}

func (s *Server) Start() {
	s.addHandlers()

	// Start the server
	go func() {
		addr := fmt.Sprintf("%s:%s", viper.GetString(config.HTTPBindAddress), viper.GetString(config.HTTPBindPort))

		server := s.Echo.Start(addr)

		if err := server; !errors.Is(err, http.ErrServerClosed) {
			s.Echo.Logger.Info("shutting down the server")
		}
	}()

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt, syscall.SIGTERM)

	<-sig

	timeout := time.Duration(viper.GetInt64(config.HTTPGracefulTimeout)) * time.Second
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	if err := s.Echo.Shutdown(ctx); err != nil {
		s.Echo.Logger.Fatal(err)
	}

}
