"use client";
import React, { type PropsWithChildren } from "react";

import { PosthogProvider } from "./_components/posthog";
import { DashboardProvider } from "./context";

const providers = [
  { component: PosthogProvider, props: {} },
  { component: DashboardProvider, props: {} },
];

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {providers.reduceRight(
        (acc, { component: Provider, props }) => (
          <Provider {...props}>{acc}</Provider>
        ),
        children,
      )}
    </>
  );
};
