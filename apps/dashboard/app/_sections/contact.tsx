"use client";
import { FullPage } from "@cwe/ui/full-page";
import React from "react";

import { useDashboardContext } from "../context";

export const Contact: React.FC = () => {
  const { updateFragment } = useDashboardContext();
  return (
    <FullPage
      id="contact"
      onVisible={() => updateFragment("contact")}
    ></FullPage>
  );
};
