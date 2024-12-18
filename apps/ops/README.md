# Ops

This is where I manage the configuration of things. It is hosted on Netlify because this project is built with react-router-v7. If I were to host it manually, I would have to use a server and maintain that. So I use Netlify to host it for free.

## Getting Started

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Start the development server with HMR:

```bash
pnpm dev
```

However, I strongly suggest using Turbo because we have dependencies that are not installed in the root directory. Turbo will install the dependencies in the root directory and then run the dev command.

```bash
turbo dev
```

## Building for Production

Create a production build:

```bash
pnpm run build
```

## Deployment

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/coffeewithegg/coffeewithegg&create_from_path=apps/ops)
