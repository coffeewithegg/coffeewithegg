"use client";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import React, { Suspense, useEffect, type PropsWithChildren } from "react";

export const PosthogProvider: React.FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      return;
    }
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false,
      capture_pageleave: true,
    });
  }, []);
  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PosthogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
};

const PosthogPageView: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      return;
    }
    if (!pathname || !searchParams) {
      return;
    }
    let url = window.origin + pathname;
    if (searchParams.toString()) {
      url += "?" + searchParams.toString();
    }

    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, posthog, searchParams]);
  return null;
};
