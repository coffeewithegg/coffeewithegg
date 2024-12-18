import { UserButton } from "@clerk/react-router";
import { cn } from "@cwe/utils/misc";
import React from "react";
import { Link } from "react-router";

import logoUrl from "./logo.webp";

export const Header: React.FC = () => {
  return (
    <header
      className={cn(
        "w-full flex justify-between",
        "fixed",
        "p-14 pb-0",
        "mobile:p-6",
      )}
    >
      <Link
        to="/"
        className={cn(
          "flex",
          "text-background font-bold font-sans text-4xl",
          "gap-4",
        )}
      >
        <img src={logoUrl} className="h-12 w-12" alt="CoffeeWithEgg Logo" />
        CWE.
      </Link>

      <div>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  );
};
