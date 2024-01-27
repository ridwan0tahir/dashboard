import { ReactNode } from "react";
import { Head } from "../head";
import { Header } from "../header";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <>
      <Head title={title} />
      <Header title={title} />
      <div className="p-5">{children}</div>
    </>
  );
}
