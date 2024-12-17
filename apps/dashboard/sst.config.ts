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
          process.env.SST_STAGE === "production"
            ? "coffeewithegg.com"
            : `${process.env.SST_STAGE}.coffeewithegg.com`,
        redirects:
          process.env.SST_STAGE === "production"
            ? ["www.coffeewithegg.com"]
            : [],
      },
      environment: {
        NEXT_PUBLIC_POSTHOG_KEY: `${process.env.NEXT_PUBLIC_POSTHOG_KEY}`,
        NEXT_PUBLIC_POSTHOG_HOST: `${process.env.NEXT_PUBLIC_POSTHOG_HOST}`,
      },
    });
  },
});
