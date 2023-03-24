import PageHeader from "@/components/PageHeader";
import { allPages, Page } from "contentlayer/generated";
import { GetStaticProps, GetStaticPaths } from "next";
import { FC } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";

type Props = {
  page: Page;
};
const Post: FC<Props> = ({ page: { title, description, body } }) => {
  const MDXContent = useMDXComponent(body.code);

  return (
    <main>
      <div className="container mx-auto px-4 lg:px-8 xl:max-w-screen-xl [&_.toc]:hidden">
        <PageHeader title={title} description={description} />

        <div className="my-16 flex lg:gap-8">
          <div className="flex-1 overflow-hidden">
            <div className="prose prose-lg overflow-hidden dark:prose-invert max-xl:max-w-none xl:mx-auto xl:px-8">
              <MDXContent />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPages.map((page) => ({
    params: {
      slug: page.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const post = allPages.find((page) => page.slug === params?.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page: post,
    },
  };
};
