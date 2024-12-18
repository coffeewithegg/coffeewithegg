import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("home/index.tsx"),
  route("sign-in", "routes/sign-in.tsx"),
] satisfies RouteConfig;
