package log

import (
	"testing"

	"github.com/spf13/pflag"
)

func TestConfig_BindFlags(t *testing.T) {
	c := DefaultConfig
	fs := &pflag.FlagSet{}
	c.BindFlags(fs)

	level, _ := fs.GetString(LogLevel)
	out, _ := fs.GetString(LogOutput)
	writer, _ := fs.GetString(LogWriter)

	tests := []struct {
		input    string
		expected string
	}{
		{DefaultConfig.LogLevel, level},
		{DefaultConfig.LogOutput, out},
		{DefaultConfig.LogWriter, writer},
	}

	for _, tc := range tests {
		if tc.input != tc.expected {
			t.Errorf("got %s expected %s", tc.input, tc.expected)
		}
	}
}
