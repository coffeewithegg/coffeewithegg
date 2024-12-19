package main

import (
	"adam/config"
	"adam/server"
	"fmt"
	"strings"

	"github.com/rs/zerolog/log"
	"github.com/spf13/viper"
)

func main() {
	c := config.New()
	c.BindFlags()

	s := server.New()

	log.Info().Msgf(
		"Starting %s on %s environment listening at http://%s",
		viper.GetString(config.AppName),
		strings.ToUpper(viper.GetString(config.EnvName)),
		fmt.Sprintf("%s:%s", viper.GetString(config.HTTPBindAddress), viper.GetString(config.HTTPBindPort)),
	)

	s.Start()
}
