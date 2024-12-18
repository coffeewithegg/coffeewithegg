"use client";
import { FullPage } from "@cwe/ui/full-page";
import { useTranslations } from "next-intl";
import React from "react";

import { useDashboardContext } from "../context";

export const Projects: React.FC = () => {
  const t = useTranslations("dashboard.projects");
  const { updateFragment } = useDashboardContext();
  return (
    <FullPage
      id="projects"
      className="flex flex-col justify-center"
      onVisible={() => updateFragment("projects")}
    >
      <div className="flex flex-col px-32 mobile:px-6">
        <p className="text-4xl text-background font-bold">{t("title")}</p>
        <br />
        <p className="text-2xl text-grey01 font-light mb-12">
          {t("description")}
        </p>
      </div>
    </FullPage>
  );
};
