import { cn } from "@/lib/utils/cn";
import React, { FC, ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  headerClass?: string;
}

const FormSection: FC<Props> = ({ title, children, headerClass }) => {
  return (
    <section className="bg-white">
      <header className={cn(`p-3 bg-gray-50 ${headerClass || ""}`)}>
        <h1 className="text-[1.2rem] font-bold text-gray-600">{title}</h1>
      </header>

      <main className="p-4">{children}</main>
    </section>
  );
};

export default FormSection;
