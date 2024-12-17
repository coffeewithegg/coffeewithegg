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
        redirects: ["www.coffeewithegg.com"],
      },
    });
  },
});
