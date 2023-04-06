import PageHeader from "@/components/PageHeader";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { TWITTER_HANDLE } from "@/data/constants";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return allPosts.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const post = allPosts.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  const { title, description, publishDate: publishedTime, coverImage } = post;

  const ogImage = coverImage
    ? coverImage.startsWith("/")
      ? `https://rohid.dev${coverImage}`
      : coverImage
    : `https://rohid.dev/api/og?title=${title}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://rohid.dev/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: `@${TWITTER_HANDLE}`,
    },
  };
}

const PostPage = ({ params: { slug } }: Props) => {
  const post = allPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }
  const { body, title, description, publishDate } = post;

  const MDXContent = useMDXComponent(body.code);

  return (
    <main>
      <div className="container mx-auto px-4 lg:px-8 xl:max-w-screen-xl">
        <PageHeader title={title} description={description}>
          <p className="mt-4 text-md text-gray-600 dark:text-gray-400">
            Published at {format(new Date(publishDate), "MMMM dd, yyy")}
          </p>
        </PageHeader>

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

export default PostPage;
