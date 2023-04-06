import BlogCard from "@/components/BlogCard";
import PageLayout from "@/components/layouts/PageLayout";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export const metadata = {
  title: "Blog",
};

const BlogPage = () => {
  const sortedPosts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.publishDate), new Date(b.publishDate))
  );
  return (
    <PageLayout title="Blog" description="All my personal blog">
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        {sortedPosts.map((post) => (
          <BlogCard post={post} key={post._id} />
        ))}
      </div>
    </PageLayout>
  );
};

export default BlogPage;
