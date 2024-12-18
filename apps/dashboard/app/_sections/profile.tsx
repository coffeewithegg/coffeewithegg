"use client";
import { FullPage } from "@cwe/ui/full-page";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

import { useDashboardContext } from "../context";

export const Profile: React.FC = () => {
  const t = useTranslations("dashboard.profile");
  const { updateFragment } = useDashboardContext();
  return (
    <FullPage
      id="profile"
      className="flex flex-col items-center justify-center"
      onVisible={() => updateFragment("profile")}
    >
      <div className="px-32 mobile:px-6">
        <p className="font-bold text-background text-4xl">{t("hello")}</p>
        <p className="font-bold text-background text-4xl">{t("iam")}</p>
        <br />
        <p className="text-grey02 text-2xl">
          {t.rich("description", {
            hint: (text) => (
              <span className="text-background underline decoration-wavy underline-offset-[6px] hover:cursor-pointer">
                {text}
              </span>
            ),
          })}
        </p>
        <br />
        <p className="text-grey02 text-2xl">
          {t.rich("getResume", {
            download: (text) => (
              <Link
                href="https://cwe-public.s3.ap-southeast-2.amazonaws.com/Resume.pdf"
                className="text-background underline decoration-wavy underline-offset-[6px]"
              >
                {text}
              </Link>
            ),
          })}
        </p>
      </div>
    </FullPage>
  );
};
