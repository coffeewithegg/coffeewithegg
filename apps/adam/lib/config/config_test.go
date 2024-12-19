package config

import (
	"testing"
)

func TestNew(t *testing.T) {
	c := New("app")

	tests := []struct {
		input    string
		expected string
	}{
		{"app", c.AppName},
		{"local", c.EnvName},
		{"app", c.envVarPrefix},
	}

	for _, tc := range tests {
		if tc.input != tc.expected {
			t.Errorf("got %s expected %s", tc.input, tc.expected)
		}
	}
}
