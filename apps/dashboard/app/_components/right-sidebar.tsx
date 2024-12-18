import { cn } from "@cwe/utils/misc";
import Link from "next/link";
import React from "react";

export const RightSidebar: React.FC = () => {
  return (
    <aside className="fixed right-0 h-screen mr-14">
      <ul
        className={cn(
          "flex flex-col justify-center",
          "border-background h-full",
          "mobile:hidden",
        )}
      >
        <li
          className={cn(
            "text-grey02 py-1",
            "hover:text-background",
            "transition-all ease-in-out duration-300",
          )}
        >
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/duc-duy-nguyen-210b60150/"
            rel="noreferrer"
          >
            Ln
          </Link>
        </li>
        <li
          className={cn(
            "text-grey02 py-1",
            "hover:text-background",
            "transition-all ease-in-out duration-300",
          )}
        >
          <Link
            target="_blank"
            href="https://github.com/ducduyn31"
            rel="noreferrer"
          >
            Git
          </Link>
        </li>
        <li
          className={cn(
            "text-grey02 py-1",
            "hover:text-background",
            "transition-all ease-in-out duration-300",
          )}
        >
          <Link
            target="_blank"
            href="mailto:daniel@coffeewithegg.com"
            rel="noreferrer"
          >
            Mail
          </Link>
        </li>
      </ul>
    </aside>
  );
};
