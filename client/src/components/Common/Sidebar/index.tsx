import { opacityVariant } from "@/lib/data/variants";
import { motion } from "framer-motion";
import { FC, useEffect, useMemo, useRef } from "react";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

type SidebarCompProps = {
  isOpen?: boolean;
  onClose: () => void;
  isAutomatic?: boolean;
  width?: string | number;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const SidebarComp: FC<SidebarCompProps> = ({
  children,
  isOpen = true,
  onClose,
  isAutomatic = true,
  width,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const variant = useMemo(
    () => ({
      initial: { width: 0 },
      animate: {
        opacity: 1,
        width: isMobile ? "90%" : width || "30%",
        transition: {
          ease: "easeInOut",
          damping: 5,
          duration: 0.2,
        },
      },
      exit: { width: 0 },
    }),
    [width]
  );

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose;
      }
    };

    if (isOpen) {
      window.addEventListener("click", handleOutsideClick);
      document.body.style.overflowY = "hidden";
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 right-0 min-w-full min-h-full z-[2999] overflow-hidden">
          {/* background */}
          <motion.div
            {...opacityVariant}
            className="fixed top-0 right-0 min-w-full min-h-full bg-black/10 backdrop-blur"
            onClick={isAutomatic ? onClose : () => {}}
          ></motion.div>

          {/* modal */}
          <motion.div
            {...variant}
            className="h-screen overflow-y-auto z-[299] fixed top-0 right-0 bg-white overflow-hidden shadow-2xl"
          >
            <div ref={ref} {...rest}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default SidebarComp;
