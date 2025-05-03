import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";
import { RiLoader5Line } from "react-icons/ri";

type Props = {
  children: ReactNode;
  size?: "small" | "medium" | "large" | "extra-small";
  variant?:
    | "filled"
    | "accent"
    | "outline"
    | "black"
    | "destructive"
    | "success";
  className?: string;
  rounded?: "full" | "sm" | "md" | "lg" | "xl" | "2xl" | "none";
  icon?: React.ReactNode;
  iconPosition?: "right" | "left";
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: () => void;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: FC<Props> = (props) => {
  const {
    onClick,
    icon,
    className: extraClass = "",
    variant = "outline",
    children,
    size = "small",
    disabled = false,
    loading = false,
    iconPosition = "right",
    rounded = "md",
    fullWidth = false,
    role,
    ...rest
  } = props;
  let mainClass = `rounded-${rounded} font-semibold text-center duration-300 ${
    fullWidth
      ? "w-full flex items-center justify-center gap-3"
      : "w-auto flex items-center gap-2"
  } disabled:opacity-40 disabled:cursor-not-allowed disabled:text-black `;

  switch (variant) {
    case "filled":
      mainClass += "bg-primary text-white hover:bg-primary/80 text-center ";
      break;
    case "accent":
      mainClass +=
        "bg-accent text-white hover:bg-accent/80 text-center border border-primary text-black ";
      break;
    case "outline":
      mainClass +=
        "bg-transparent border border-primary hover:bg-primary/5 text-primary disabled:border-zinc-500/50 ";
      break;
    case "destructive":
      mainClass +=
        "bg-transparent border border-red-500/50 hover:border-red-500 hover:bg-red-500 disabled:hover:bg-transparent hover:text-black disabled:hover:text-red-500 text-red-500 disabled:border-red-500/50 ";
      break;
    case "success":
      mainClass +=
        "bg-transparent border border-green-500/50 hover:border-green-500 hover:bg-green-500 disabled:hover:bg-transparent hover:text-black disabled:hover:text-green-500 text-green-500 disabled:border-green-500/50 ";
      break;
    case "black":
      mainClass += "hover:bg-primary/80 bg-primary text-primary ";
      break;
    default:
      break;
  }

  switch (size) {
    case "extra-small":
      mainClass += "px-4 py-[6px] text-xs ";
      break;
    case "small":
      mainClass += "px-6 py-2 text-[14px] ";
      break;
    case "medium":
      mainClass += "px-6 py-3 text-[.9rem] ";
      break;
    case "large":
      mainClass += "px-8 py-[14px] ";
      break;
    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      className={cn(mainClass, extraClass)}
      disabled={disabled || loading}
      role={role}
      {...rest}
    >
      {iconPosition === "left" && (
        <>
          {loading ? (
            <div className="flex-shrink-0">
              <RiLoader5Line size={12} className="animate-spin" />
            </div>
          ) : (
            icon
          )}
        </>
      )}

      <span className="flex-shrink-0">
        {!loading ? children : "Loading..."}
      </span>

      {iconPosition === "right" && (
        <>
          {loading ? (
            <div className="flex-shrink-0">
              <RiLoader5Line size={12} className="animate-spin" />
            </div>
          ) : (
            icon
          )}
        </>
      )}
    </button>
  );
};

export default Button;
