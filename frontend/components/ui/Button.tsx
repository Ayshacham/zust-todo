import { ButtonHTMLAttributes } from "react";

const variants = {
  primary: "bg-[#3f95f2] text-white hover:bg-[#2e7bc1]",
  secondary: "bg-[#444343] text-[#c8c7c7] hover:bg-[#555454] hover:text-white",
  danger: "bg-[#dc3545] text-white hover:bg-[#c82333]",
  cancel: "bg-[#555454] text-white hover:bg-[#666]",
} as const;

type ButtonVariant = keyof typeof variants;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md";
}

export function Button({
  variant = "secondary",
  size = "sm",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const sizeClasses = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2.5";
  return (
    <button
      className={`rounded font-semibold transition-colors ${sizeClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
