"use client";
import { FullPage } from "@cwe/ui/full-page";
import React from "react";

export const Profile: React.FC = () => {
  return (
    <FullPage
      id="profile"
      className="flex flex-col items-center justify-center"
    >
      <div>
        <p className="font-bold text-background text-4xl">Hello, </p>
        <p className="font-bold text-background text-4xl">My name is Daniel </p>
        <br />
        <p className="text-grey02 text-2xl">I&apos;m a software engineer</p>
      </div>
    </FullPage>
  );
};
