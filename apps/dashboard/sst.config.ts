/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "dashboard",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "ap-southeast-2",
        },
      },
    };
  },
  async run() {
    new sst.aws.Nextjs("Dashboard", {
      domain: {
        name:
          process.env.DEPLOY_ENV === "production"
            ? "coffeewithegg.com"
            : `${process.env.DEPLOY_ENV}.coffeewithegg.com`,
        dns: false,
        cert: "arn:aws:acm:us-east-1:031252989960:certificate/3f6cd3f6-1dac-4f19-9ae4-d78cd1cbf0cb",
        redirects: ["www.coffeewithegg.com"],
      },
    });
  },
});
