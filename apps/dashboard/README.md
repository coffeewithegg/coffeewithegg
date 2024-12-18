# Dashboard

This is the main dashboard for the project. It is the starting point for everything.

# Setup

This is a typical Next.js project. To run the project, you need to have Node.js installed.
I recommend using [fnm](https://github.com/Schniz/fnm) to manage your Node.js versions.

To run the project, you should use turborepo commands as besides running the project, you will also need to run other dependencies packages. Here are the list of dependencies:

- [@cwe/eslint-config](../../packages/eslint-config/README.md)
- [@cwe/hooks](../../packages/hooks/README.md)
- [@cwe/tailwind-config](../../packages/tailwind-config/README.md)
- [@cwe/typescript-config](../../packages/typescript-config/README.md)
- [@cwe/ui](../../packages/ui/README.md)
- [@cwe/utils](../../packages/utils/README.md)

To run the project, you should run:

```bash
turbo dev
```

This will start all the projects parallelly.
