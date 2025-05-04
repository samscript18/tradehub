"use client";
import React, { FC, ReactNode } from "react";
import BackButton from "../Button/back-button";

interface Props {
  title: string;
  maxWidth?: number;
  children: ReactNode;
  showBackButton?: boolean;
}

const FormContainer: FC<Props> = ({
  title,
  maxWidth = 800,
  children,
  showBackButton = true,
}) => {

  return (
    <section
      className="space-y-6 mx-auto mb-32"
      style={{ maxWidth: maxWidth, width: "100vw" }}
    >
      <header className="flex items-center gap-4">
        {showBackButton && <BackButton />}

        <h2 className="text-[1.5rem] max-md:text-[1.1rem] font-bold">
          {title}
        </h2>
      </header>
      <div className="rounded-md border w-full">{children}</div>
    </section>
  );
};

export default FormContainer;
