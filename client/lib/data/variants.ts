import { Variants } from "framer-motion";

export const stiffTransition = { type: "spring", stiffness: 200, damping: 30 };

export const fadeToTopVariant: Variants = {
  initial: { opacity: 0, y: "10%" },
  animate: { opacity: 1, y: 0, transition: { ...stiffTransition } },
  exit: { opacity: 0, y: "10%" },
};

export const fadeToBottomVariant: Variants = {
  initial: { opacity: 0, y: "-10%" },
  animate: { opacity: 1, y: 0, transition: { ...stiffTransition } },
  exit: { opacity: 0, y: "-10%" },
};