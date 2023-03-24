import { ReactNode } from "react";
import PageHeader, { PageHeaderProps } from "../PageHeader";

export type PageLayoutProps = { children: ReactNode } & PageHeaderProps;

const PageLayout = ({ children, ...pageHeaderProps }: PageLayoutProps) => {
  return (
    <main className="container mx-auto px-4 lg:px-8 xl:max-w-screen-xl">
      <PageHeader {...pageHeaderProps} />
      <div className="my-16">{children}</div>
    </main>
  );
};

export default PageLayout;
