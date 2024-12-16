# Deploy Next.js app via SST

SST provides a simple way to deploy Next.js apps to AWS. This will greatly reduce the cost
of deploying via 3rd party services like Vercel or Netlify.

## Environment setup

In this repository, we will only provide 2 environments: `preview` and `production`.
We are trying to adopt trunk-based development, so we will only have 2 environments.
An additional `development` environment will be spun up on local machines.

## Deployment

We keep the configuration for the Next.js apps very standard:

- Production branch will be deployed to `coffeewithegg.com` domain while other preview branches
  will be deployed based on the pr number, e.g. `pr-123.coffeewithegg.com`.
- Production environment cannot be destroyed automatically.
- All state changes will be stored in DynamoDB.
- Since this is a monorepo, when child stacks are deployed, the parent stack will be re-deployed
  as well.
