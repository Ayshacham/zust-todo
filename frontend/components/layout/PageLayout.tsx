import { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  backLink?: ReactNode;
}

export function PageLayout({ title, children, backLink }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#191717] text-white p-8">
      <h1 className="text-center text-4xl font-semibold mb-8">{title}</h1>
      {backLink && <div className="mb-6">{backLink}</div>}
      {children}
    </div>
  );
}
