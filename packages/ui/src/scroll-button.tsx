import React, { PropsWithChildren } from "react";

export interface ScrollButtonProps extends React.HTMLProps<HTMLDivElement> {
  fragment: string;
}

export const ScrollButton: React.FC<ScrollButtonProps & PropsWithChildren> = ({
  fragment,
  children,
  ...rest
}) => {
  return (
    <div
      role="button"
      onClick={() =>
        window.scrollTo({
          top: document.getElementById(fragment)?.offsetTop || 0,
          behavior: "smooth",
        })
      }
      {...rest}
    >
      {children}
    </div>
  );
};
