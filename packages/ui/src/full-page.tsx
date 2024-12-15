"use client";
import { useIntersectionObserver } from "@cwe/hooks";
import { cn } from "@cwe/utils/misc";
import React, { useEffect, type PropsWithChildren } from "react";

export interface FullPageProps extends React.HTMLProps<HTMLDivElement> {
  onVisible?: () => void;
}

export const FullPage: React.FC<PropsWithChildren & FullPageProps> = ({
  onVisible,
  children,
  className,
  ...rest
}) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (isIntersecting && onVisible) {
      onVisible();
    }
  }, [isIntersecting, onVisible]);

  return (
    <section
      ref={ref}
      className={cn(className, "ui-h-screen ui-w-full ui-snap-start")}
      {...rest}
    >
      {children}
    </section>
  );
};
