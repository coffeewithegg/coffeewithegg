"use client";
import { usePageFragment } from "@cwe/hooks";
import { ScrollButton } from "@cwe/ui/scroll-button";
import { cn, scrollToWithCallback } from "@cwe/utils/misc";
import Link from "next/link";
import React from "react";

import LogoSvg from "./logo.svg";
import { sections } from "./sections";

export const Header: React.FC = () => {
  const fragment = usePageFragment();
  return (
    <header className={cn("w-full flex justify-between", "fixed", "p-14 pb-0")}>
      <Link
        scroll={false}
        className={cn(
          "flex",
          "text-background font-bold font-sans text-4xl",
          "gap-4",
        )}
        href="/"
      >
        <LogoSvg className="w-10 h-10" />
        CWE.
      </Link>
      <div className={cn("flex", "text-grey02 font-light text-2xl", "gap-x-4")}>
        {sections.map((section) => (
          <ScrollButton
            key={section.title}
            fragment={section.fragment}
            className={cn(
              "hover:text-background hover:underline",
              `#${section.fragment}` === fragment ? "text-background" : "",
            )}
            onClick={() => {
              const container =
                document.getElementsByClassName("snap-mandatory")?.[0];

              if (!container) {
                return;
              }

              scrollToWithCallback(
                container as HTMLElement,
                {
                  top:
                    document.getElementById(section.fragment)?.offsetTop || 0,
                  behavior: "smooth",
                },
                () => {
                  window.location.hash = section.fragment;
                },
              );
            }}
          >
            {section.title}
          </ScrollButton>
        ))}
      </div>
    </header>
  );
};
