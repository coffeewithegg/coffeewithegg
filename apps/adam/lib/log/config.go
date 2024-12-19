package log

import (
	"fmt"

	"github.com/spf13/pflag"
)

type Config struct {
	LogLevel  string
	LogOutput string
	LogWriter string
}

var DefaultConfig = &Config{
	LogLevel:  InfoLevel,
	LogOutput: OutputStdOut,
	LogWriter: WriterConsole,
}

const (
	LogOutput = "log-output"
	LogWriter = "log-writer"
	LogLevel  = "log-level"
)

// BindFlags adds all the flags from the command line.
func (c *Config) BindFlags(fs *pflag.FlagSet) {
	fs.StringVar(&c.LogOutput, LogOutput, c.LogOutput,
		fmt.Sprintf("The output to write to. Valid outputs: %s", Outputs),
	)
	fs.StringVar(&c.LogWriter, LogWriter, c.LogWriter,
		fmt.Sprintf("The log writer. Valid writers: %s", Writers),
	)
	fs.StringVar(&c.LogLevel, LogLevel, c.LogLevel,
		fmt.Sprintf("The granularity of log outputs. Valid levels: %s", Levels),
	)
}
