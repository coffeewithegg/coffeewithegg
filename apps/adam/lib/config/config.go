package config

import (
	"errors"
	"fmt"
	"strings"

	"github.com/spf13/pflag"
	"github.com/spf13/viper"
)

// Config holds all global configuration for our program.
type Config struct {
	AppName      string
	EnvName      string
	envVarPrefix string
}

// New creates a Config instance.
func New(envVarPrefix string) *Config {
	return &Config{
		AppName:      "app",
		EnvName:      "local",
		envVarPrefix: envVarPrefix,
	}
}

const (
	AppName = "app-name"
	EnvName = "env-name"
)

// bindFlags adds all the flags from the command line.
func (c *Config) bindFlags(fs *pflag.FlagSet) {
	fs.StringVar(&c.AppName, AppName, c.AppName, "The name of the application.")
	fs.StringVar(&c.EnvName, EnvName, c.EnvName, "The environment of the application. "+
		"Used to load the right configs file.")
}

// wordSepNormalizeFunc changes all flags that contain "_" separators.
func wordSepNormalizeFunc(f *pflag.FlagSet, name string) pflag.NormalizedName {
	if strings.Contains(name, "_") {
		return pflag.NormalizedName(strings.Replace(name, "_", "-", -1))
	}
	return pflag.NormalizedName(name)
}

// BindFlags normalizes and parses the command line flags.
func (c *Config) BindFlags(flagSets ...func(fs *pflag.FlagSet)) error {
	for _, flagSet := range flagSets {
		flagSet(pflag.CommandLine)
	}

	c.bindFlags(pflag.CommandLine)
	err := viper.BindPFlags(pflag.CommandLine)
	if err != nil {
		return err
	}

	pflag.CommandLine.SetNormalizeFunc(wordSepNormalizeFunc)
	pflag.Parse()

	n := viper.GetString(AppName)
	if len(n) < 1 {
		return errors.New("application name cannot be empty")
	}

	viper.SetEnvPrefix(c.envVarPrefix)
	replacer := strings.NewReplacer("-", "_")
	viper.SetEnvKeyReplacer(replacer)
	viper.AutomaticEnv()

	return nil
}

// BindFlagsWithConfigPaths normalizes, parses the command line flags and read in config files.
func (c *Config) BindFlagsWithConfigPaths(flagSets ...func(fs *pflag.FlagSet)) error {
	err := c.BindFlags(flagSets...)
	if err != nil {
		return err
	}

	configName := fmt.Sprintf("config.%s", strings.ToLower(viper.GetString(EnvName)))
	viper.SetConfigName(configName)
	viper.SetConfigType("toml")
	viper.AddConfigPath("./configs")
	viper.AddConfigPath("/configs")

	if err = viper.ReadInConfig(); err != nil {
		var configFileNotFoundError viper.ConfigFileNotFoundError
		if errors.As(err, &configFileNotFoundError) {
			return errors.New(fmt.Sprintf("config file not found: '%v'", err))
		}
	}

	return nil
}
