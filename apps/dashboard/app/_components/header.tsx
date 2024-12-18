"use client";
import { ScrollButton } from "@cwe/ui/scroll-button";
import { cn } from "@cwe/utils/misc";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

import { sections } from "./sections";
import { useDashboardContext } from "../context";

export const Header: React.FC = () => {
  const t = useTranslations("dashboard.header");
  const { fragment } = useDashboardContext();
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
        <Image
          src="/logo.webp"
          alt="Logo of coffee with egg"
          width={50}
          height={50}
        />
        CWE.
      </Link>
      <div className={cn("flex", "text-grey02 font-light text-2xl", "gap-x-4")}>
        {sections.map((section) => (
          <ScrollButton
            key={section.titleKey}
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

              container.scrollTo({
                top: document.getElementById(section.fragment)?.offsetTop || 0,
                behavior: "smooth",
              });
            }}
          >
            {t(section.titleKey)}
          </ScrollButton>
        ))}
      </div>
    </header>
  );
};
