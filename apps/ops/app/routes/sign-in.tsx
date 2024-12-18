import { SignIn } from "@clerk/react-router";

export default function SignInPage() {
  return (
    <main className="bg-bg01 grid place-items-center h-screen w-screen">
      <SignIn />
    </main>
  );
}
