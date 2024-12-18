import { getAuth } from "@clerk/react-router/ssr.server";
import { redirect } from "react-router";

import { Header } from "./header";

import type { Route } from "./+types";

export function meta() {
  return [
    { title: "CWE | Ops" },
    { name: "description", content: "Managing sites for CoffeeWithEgg" },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  const { userId } = await getAuth(args);

  if (!userId) {
    return redirect("/sign-in?redirect_url=" + args.request.url);
  }
}

export default function Home() {
  return (
    <>
      <Header />
    </>
  );
}
