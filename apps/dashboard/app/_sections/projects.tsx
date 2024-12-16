"use client";
import { FullPage } from "@cwe/ui/full-page";
import React from "react";

import { useDashboardContext } from "../context";

export const Projects: React.FC = () => {
  const { updateFragment } = useDashboardContext();
  return (
    <FullPage
      id="projects"
      onVisible={() => updateFragment("projects")}
    ></FullPage>
  );
};
