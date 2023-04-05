import { allDocs } from "contentlayer/generated";
import { format } from "date-fns";
import { Metadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };
export async function generateStaticParams() {
  return allDocs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const post = allDocs.find((item) => item.slug === slug);

  return {
    title: post?.title,
  };
}

const DocPage = ({ params: { slug } }: Props) => {
  const post = allDocs.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const { body, title, updatedAt } = post;

  return (
    <main className="prose mx-auto dark:prose-invert prose-lg my-16">
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: body.html }} />
      <p>Last updated on {format(new Date(updatedAt), "MMMM dd, yyyy")}</p>
    </main>
  );
};

export default DocPage;
