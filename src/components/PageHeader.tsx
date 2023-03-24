import Head from "next/head";

export type PageHeaderProps = {
  title: string;
  description: string;
  category?: string;
};

const PageHeader = ({ title, description, category }: PageHeaderProps) => {
  return (
    <header className="my-12 md:my-16">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      {!!category && (
        <p className="mb-2 text-xl font-semibold text-primary-500 dark:text-primary-400 md:text-2xl">
          {category}
        </p>
      )}
      <h1 className="text-5xl font-bold md:text-6xl" id="overview">
        {title}
      </h1>
      <p className="mt-4 font-medium text-gray-600 dark:text-gray-400 md:text-lg">
        {description}
      </p>
    </header>
  );
};

export default PageHeader;
