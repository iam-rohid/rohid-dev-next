import PageHeader from "@/components/PageHeader";
import { allPages } from "contentlayer/generated";
import { Metadata } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

type Props = {
  params: {
    pageId: string;
  };
};

export async function generateStaticParams() {
  return allPages.map((item) => ({
    pageId: item.slug,
  }));
}

export async function generateMetadata({
  params: { pageId },
}: Props): Promise<Metadata> {
  const post = allPages.find((item) => item.slug === pageId);

  return {
    title: post?.title,
    description: post?.description,
  };
}

const Page = ({ params: { pageId } }: Props) => {
  const page = allPages.find((item) => item.slug === pageId);

  if (!page) {
    notFound();
  }

  const { body, title, description } = page;

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

export default Page;
