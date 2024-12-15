import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import importPlugin from "eslint-plugin-import";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      import: importPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      // Import order rules
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",     // Node.js built-in modules
            "external",    // External packages
            "internal",    // Internal packages
            ["parent", "sibling"], // Parent and sibling directories
            "index",      // Index file of the current directory
            "object",     // Object imports
            "type"        // Type imports
          ],
          "pathGroups": [
            {
              "pattern": "@/**",
              "group": "internal"
            }
          ],
          "newlines-between": "always",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ],
      "import/no-duplicates": "error",
      "import/no-unresolved": "error",
      "import/first": "error",
      "import/newline-after-import": "error"
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"]
      },
      "import/resolver": {
        "typescript": {
          "alwaysTryTypes": true,
          "project": ["./tsconfig.json", "apps/*/tsconfig.json", "packages/*/tsconfig.json"]
        }
      }
    }
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
