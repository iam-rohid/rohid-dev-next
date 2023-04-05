import BlogCard from "@/components/BlogCard";
import PageLayout from "@/components/layouts/PageLayout";
import { allPosts } from "contentlayer/generated";

export const metadata = {
  title: "Blog",
};

const BlogPage = () => {
  return (
    <PageLayout title="Blog" description="All my personal blog">
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        {allPosts.map((post) => (
          <BlogCard post={post} key={post._id} />
        ))}
      </div>
    </PageLayout>
  );
};

export default BlogPage;
