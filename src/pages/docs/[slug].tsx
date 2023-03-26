import { allDocs, Doc } from "contentlayer/generated";
import { format } from "date-fns";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { FC } from "react";

type Props = {
  doc: Doc;
};
const Doc: FC<Props> = ({ doc: { body, title, updatedAt } }) => {
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

export default Doc;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allDocs.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const post = allDocs.find((post) => post.slug === params?.slug);
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      doc: post,
    },
  };
};
