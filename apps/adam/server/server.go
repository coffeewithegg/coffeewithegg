package server

import (
	"github.com/coffeewithegg/adam/config"
	"github.com/coffeewithegg/adam/handlers"
	"github.com/coffeewithegg/adam/lib/http/api/server"

	"github.com/casbin/casbin/v2"
	"github.com/rs/zerolog/log"
	"github.com/spf13/viper"

	casbinMw "github.com/coffeewithegg/adam/middlewares/casbin"
)

func New() *server.Server {
	// client, err := data.NewGormClient()
	// if err != nil {
	// 	log.Panic().Err(err).Msg("failed to create db client")
	// }
	//
	// openapi := openapiMw.NewHandler()
	return newServer()
}

func newServer(handler ...handlers.Handler) *server.Server {
	enforcer, err := casbin.NewEnforcer(viper.GetString(config.CasbinModel), viper.GetString(config.CasbinPolicy))
	if err != nil {
		log.Panic().Err(err).Msg("failed creating enforcer")
	}

	// openAPIConfig := openapiMw.Config{
	// 	Schema: viper.GetString(config.OpenAPISchema),
	// 	ExemptRoutes: map[string][]string{
	// 		"/":       {http.MethodGet},
	// 		"/readyz": {http.MethodGet},
	// 		"/livez":  {http.MethodGet},
	// 		"/docs":   {http.MethodGet},
	// 		"/openapi/*": {http.MethodGet},
	// 	},
	// }

	s := server.New()

	s.Use(
		casbinMw.Casbin(enforcer),
		// openapiMw.OpenAPIWithConfig(openAPIConfig),
	)

	for _, h := range handler {
		h.Register(s)
	}

	s.File("/docs", "./docs/index.html")
	s.Static("/openapi/", "./openapi")

	return s
}
