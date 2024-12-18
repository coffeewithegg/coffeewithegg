import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CWE | Ops" },
    { name: "description", content: "Managing sites for CoffeeWithEgg" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_SERVER };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Welcome to React Router!</h1>
      <p>{loaderData.message}</p>
    </div>
  );
}
