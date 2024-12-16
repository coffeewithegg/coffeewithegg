"use client";
import { ScrollButton } from "@cwe/ui/scroll-button";
import { cn } from "@cwe/utils/misc";
import React from "react";

import { sections } from "./sections";
import { useDashboardContext } from "../context";

export const LeftSidebar: React.FC = () => {
  const { fragment } = useDashboardContext();
  return (
    <aside className={cn("fixed", "h-screen ml-14")}>
      <ul className="border-background h-full flex flex-col justify-center">
        {sections.map((section) => (
          <ScrollButton
            key={section.titleKey}
            fragment={section.fragment}
            className={cn(
              "py-3 w-7 hover:w-9",
              `#${section.fragment}` === fragment
                ? "text-background w-9"
                : "text-grey02",
              "transition-all ease-in-out duration-300",
            )}
            onClick={() => {
              const container =
                document.getElementsByClassName("snap-mandatory")?.[0];

              if (!container) {
                return;
              }

              container.scrollTo({
                top: document.getElementById(section.fragment)?.offsetTop || 0,
                behavior: "smooth",
              });
            }}
          >
            <div className="border-t-4 w-full" />
          </ScrollButton>
        ))}
      </ul>
    </aside>
  );
};
