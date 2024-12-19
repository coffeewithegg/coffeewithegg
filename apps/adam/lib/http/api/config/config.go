package config

import (
	"net"
	"net/http"
	"time"

	"github.com/labstack/echo/v4/middleware"
	"github.com/spf13/pflag"
)

type Config struct {
	BindAddress     net.IP
	BindPort        uint
	CORS            middleware.CORSConfig
	CORSEnabled     bool
	GracefulTimeout time.Duration
	LogRequests     bool
}

var DefaultConfig = &Config{
	BindAddress: net.ParseIP("127.0.0.1"),
	BindPort:    1323,
	CORSEnabled: false,
	CORS: middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{
			http.MethodGet,
			http.MethodHead,
			http.MethodPut,
			http.MethodPatch,
			http.MethodPost,
			http.MethodDelete,
		},
		AllowHeaders:     []string{},
		AllowCredentials: false,
		ExposeHeaders:    []string{},
		MaxAge:           0,
	},
	GracefulTimeout: 30 * time.Second,
	LogRequests:     true,
}

const (
	HTTPBindAddress          = "http-bind-address"
	HTTPBindPort             = "http-bind-port"
	HTTPGracefulTimeout      = "http-graceful-timeout"
	HTTPLogRequests          = "http-log-requests"
	HTTPCORSEnabled          = "http-cors-enabled"
	HTTPCORSAllowOrigins     = "http-cors-allow-origins"
	HTTPCORSAllowMethods     = "http-cors-allow-methods"
	HTTPCORSAllowHeaders     = "http-cors-allow-headers"
	HTTPCORSAllowCredentials = "http-cors-allow-credentials"
	HTTPCORSExposeHeaders    = "http-cors-expose-headers"
	HTTPCORSMaxAge           = "http-cors-max-age"
)

// BindFlags adds all the flags from the command line.
func (c *Config) BindFlags(fs *pflag.FlagSet) {
	fs.IPVar(&c.BindAddress, HTTPBindAddress, c.BindAddress, "The IP address to listen at.")
	fs.UintVar(&c.BindPort, HTTPBindPort, c.BindPort, "The port to listen at.")
	fs.DurationVar(&c.GracefulTimeout, HTTPGracefulTimeout, c.GracefulTimeout, "Timeout for graceful shutdown.")
	fs.BoolVar(&c.LogRequests, HTTPLogRequests, c.LogRequests, "Controls the logging of HTTP requests")
	fs.BoolVar(&c.CORSEnabled, HTTPCORSEnabled, c.CORSEnabled, "Enable cross-origin resource sharing.")
	fs.StringSliceVar(&c.CORS.AllowOrigins, HTTPCORSAllowOrigins, c.CORS.AllowOrigins,
		"Indicates whether the response can be shared with requesting code from the given origin.")
	fs.StringSliceVar(&c.CORS.AllowMethods, HTTPCORSAllowMethods, c.CORS.AllowMethods,
		"Indicates which HTTP methods are allowed for cross-origin requests.")
	fs.StringSliceVar(&c.CORS.AllowHeaders, HTTPCORSAllowHeaders, c.CORS.AllowHeaders,
		"Indicate which HTTP headers can be used during an actual request.")
	fs.BoolVar(&c.CORS.AllowCredentials, HTTPCORSAllowCredentials, c.CORS.AllowCredentials,
		"Tells browsers whether to expose the response to frontend JavaScript code when the request's "+
			"credentials mode (Request.credentials) is 'include'.")
	fs.StringSliceVar(&c.CORS.ExposeHeaders, HTTPCORSExposeHeaders, c.CORS.ExposeHeaders,
		"Indicates which headers can be exposed as part of the response by listing their name.")
	fs.IntVar(&c.CORS.MaxAge, HTTPCORSMaxAge, c.CORS.MaxAge,
		"Indicates how long the results of a preflight request can be cached.")
}
