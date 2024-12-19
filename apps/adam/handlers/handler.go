package handlers

import "adam/lib/http/api/server"

type Handler interface {
	Register(s *server.Server)
}
