import { createRequestHandler } from "@react-router/express";
import express from "express";
import "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    VALUE_FROM_SERVER: string;
  }
}

const app = express();

app.use(
  createRequestHandler({
    // @ts-expect-error - virtual module provided by React Router at build time
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        VALUE_FROM_SERVER: "Hello from the server!",
      };
    },
  }),
);

export const config = {
  path: "/*",
  preferStatic: true,
};

export default app;
