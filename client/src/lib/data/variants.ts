import { Variants } from "framer-motion";
import { cva } from "class-variance-authority";

export const parentVariant: Variants = {
  animate: { transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0 },
};

export const opacityVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.06 } },
  exit: { opacity: 0 },
};

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

export const fadeToRightVariant: Variants = {
  initial: { opacity: 0, x: "-5%" },
  animate: { opacity: 1, x: 0, transition: { ...stiffTransition } },
  exit: { opacity: 0, x: "-5%" },
};

export const fadeToLeftVariant: Variants = {
  initial: { opacity: 0, x: "100%" },
  animate: { opacity: 1, x: 0, transition: { ...stiffTransition } },
  exit: { opacity: 0, x: "-100%" },
};

export const heightVariant: Variants = {
  initial: { height: "0%", opacity: 0 },
  animate: { height: "100%", opacity: 1 },
  exit: { height: "0%", opacity: 0 },
};

export const fadeToTopSlowVariant: Variants = {
  initial: { opacity: 0, y: "100%" },
  animate: {
    opacity: 1,
    y: 0,
    transition: { ...stiffTransition, duration: 0.8 },
  },
  exit: { opacity: 0, y: "100%" },
};

export const heightOpenVariant: Variants = {
  initial: { opacity: 0, height: "0px" },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: "0px" },
};

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
        destructive:
          "bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        secondary:
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
        ghost:
          "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
