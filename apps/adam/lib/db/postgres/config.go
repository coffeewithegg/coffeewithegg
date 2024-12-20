package postgres

import (
	"github.com/spf13/pflag"
)

type Config struct {
	User     string
	Password string
	Name     string
	Host     string
	Port     string
}

var DefaultConfig = &Config{
	User:     "postgres",
	Password: "postgres",
	Name:     "adam",
	Host:     "localhost",
	Port:     "5432",
}

const (
	PostgresUser     = "pg-username"
	PostgresPassword = "pg-password"
	PostgresDBName   = "pg-db"
	PostgresHost     = "pg-host"
	PostgresPort     = "pg-port"
)

func (c *Config) BindFlags(fs *pflag.FlagSet) {
	fs.StringVar(&c.User, PostgresUser, c.User, "Postgres username")
	fs.StringVar(&c.Password, PostgresPassword, c.Password, "Postgres password")
	fs.StringVar(&c.Name, PostgresDBName, c.Name, "Postgres database name")
	fs.StringVar(&c.Host, PostgresHost, c.Host, "Postgres host")
	fs.StringVar(&c.Port, PostgresPort, c.Port, "Postgres port")
}
