import PageHeader from "@/components/PageHeader";
import { allPosts, Post } from "contentlayer/generated";
import { GetStaticProps, GetStaticPaths } from "next";
import { FC } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";

type Props = {
  post: Post;
};
const Post: FC<Props> = ({ post: { title, description, body } }) => {
  const MDXContent = useMDXComponent(body.code);

  return (
    <main>
      <div className="container mx-auto px-4 lg:px-8 xl:max-w-screen-xl">
        <PageHeader title={title} description={description} />

        <div className="my-16 flex lg:gap-8">
          <div className="flex-1 overflow-hidden">
            <div className="prose prose-lg overflow-hidden dark:prose-invert max-xl:max-w-none xl:mx-auto xl:px-8">
              <MDXContent components={{}} />
            </div>
          </div>
          {/* <TableOfContent client:idle headings={toc} slug={entry.slug} /> */}
        </div>
      </div>
      {/* <BlogStats client:only slug={slug} title={title} description={description} /> */}
    </main>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPosts.map((post) => ({
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
  const post = allPosts.find((post) => post.slug === params?.slug);
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
