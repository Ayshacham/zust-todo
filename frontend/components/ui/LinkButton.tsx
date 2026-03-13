import Link from "next/link";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

const variants = {
  primary: "bg-[#3f95f2] hover:bg-[#2e7bc1]",
  secondary: "bg-[#444343] text-[#c8c7c7] hover:bg-[#555454] hover:text-white",
} as const;

export function LinkButton({
  href,
  children,
  variant = "secondary",
  className = "",
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-block px-3 py-1.5 rounded text-sm font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
