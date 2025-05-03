"use client";

import { SiSinglestore } from "react-icons/si";

interface Props {
  type?: "full" | "small";
}

const LogoLoader = ({ type = "full" }: Props) => {
  return type === "full" ? (
    <div className="fixed flex items-center justify-center w-full h-full z-[1000]">
      <div className="animate-pulse">
        <Logo />
      </div>
    </div>
  ) : (
    <div className="animate-pulse">
      <Logo />
    </div>
  );
};

export const Logo = ({ color }: { color?: "white" | "black" }) => {
  return (
    <div
      className={`${
        color === "white"
          ? "text-white"
          : color === "black"
          ? "text-black"
          : "text-primary"
      } flex items-center gap-1 text-2xl`}
    >
      <SiSinglestore />
      <span className="font-bold">TradeHub</span>
    </div>
  );
};

export default LogoLoader;
