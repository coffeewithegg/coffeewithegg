package handlers

import "github.com/coffeewithegg/adam/lib/http/api/server"

type Handler interface {
	Register(s *server.Server)
}
