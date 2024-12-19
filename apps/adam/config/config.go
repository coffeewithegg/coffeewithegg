package config

import (
	libConfig "adam/lib/config"
	libPG "adam/lib/db/postgres"
	libHttp "adam/lib/http/api/config"
	libLog "adam/lib/log"
	"fmt"

	"github.com/rs/zerolog/log"
	"github.com/spf13/pflag"
	"github.com/spf13/viper"
)

type Config struct {
	Config  *libConfig.Config
	HTTP    *libHttp.Config
	Logging *libLog.Config
	DB      *libPG.Config

	BaseURL string

	Casbin  *Casbin
	OpenAPI *OpenAPI
}

type Casbin struct {
	Model  string
	Policy string
}

type OpenAPI struct {
	Schema string
}

func New() *Config {
	return &Config{
		Config:  libConfig.New("Adam"),
		HTTP:    libHttp.DefaultConfig,
		Logging: libLog.DefaultConfig,
		DB:      libPG.DefaultConfig,

		BaseURL: "http://localhost:1323",

		Casbin: &Casbin{
			Model:  "./casbin/model.conf",
			Policy: "./casbin/policy.csv",
		},
		OpenAPI: &OpenAPI{
			Schema: "./openapi/openapi.yaml",
		},
	}
}

const (
	AppName = libConfig.AppName
	EnvName = libConfig.EnvName

	HTTPBindAddress = libHttp.HTTPBindAddress
	HTTPBindPort    = libHttp.HTTPBindPort

	BaseURL = "base-url"

	CasbinModel  = "casbin-model"
	CasbinPolicy = "casbin-policy"

	OpenAPISchema = "openapi-schema"
)

// addFlags adds all the flags from the command line
func (c *Config) addFlags(fs *pflag.FlagSet) {
	fs.StringVar(&c.BaseURL, BaseURL, c.BaseURL, "Base URL where the service is hosted")

	fs.StringVar(&c.Casbin.Model, CasbinModel, c.Casbin.Model, "Casbin model file")
	fs.StringVar(&c.Casbin.Policy, CasbinPolicy, c.Casbin.Policy, "Casbin policy file")

	fs.StringVar(&c.OpenAPI.Schema, OpenAPISchema, c.OpenAPI.Schema, "OpenAPI schema file")
}

func (c *Config) BindFlags() {
	if pflag.Parsed() {
		return
	}

	c.addFlags(pflag.CommandLine)
	c.Logging.BindFlags(pflag.CommandLine)
	c.HTTP.BindFlags(pflag.CommandLine)
	c.DB.BindFlags(pflag.CommandLine)

	err := c.Config.BindFlagsWithConfigPaths()
	if err != nil {
		panic(fmt.Errorf("failed to bind flags: %v", err))
	}

	err = libLog.New(&libLog.Config{
		LogLevel:  viper.GetString(libLog.LogLevel),
		LogOutput: viper.GetString(libLog.LogOutput),
		LogWriter: viper.GetString(libLog.LogWriter),
	})
	if err != nil {
		panic(fmt.Errorf("failed to create logger: %v", err))
	}

	if viper.GetBool(libHttp.HTTPCORSEnabled) {
		for _, origin := range viper.GetStringSlice(libHttp.HTTPCORSAllowOrigins) {
			if origin == "*" {
				log.Warn().Msg("CORS: using '*' in Access-Control-Allow-Origin is potentially unsafe!")
			}

			if origin == "null" {
				log.Warn().Msg("CORS: using 'null' in Access-Control-Allow-Origin is unsafe and should not be used!")
			}

		}
	}
}
