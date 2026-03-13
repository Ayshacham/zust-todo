import Link from "next/link";
import { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  backLink?: ReactNode;
}

export function PageLayout({ title, children, backLink }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#191717] text-white p-8">
      <div className="flex justify-end gap-2 mb-4">
        <Link href="/login" className="text-[#c8c7c7] hover:text-white text-sm">
          Log in
        </Link>
        <span className="text-[#555]">|</span>
        <Link href="/register" className="text-[#c8c7c7] hover:text-white text-sm">
          Sign up
        </Link>
      </div>
      <h1 className="text-center text-4xl font-semibold mb-8">{title}</h1>
      {backLink && <div className="mb-6">{backLink}</div>}
      {children}
    </div>
  );
}
