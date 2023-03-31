import { Post } from "contentlayer/generated";
import { format } from "date-fns";
import Link from "next/link";

const BlogCard = ({ post }: { post: Post }) => {
  const viewCount = 0;
  const shareCount = 0;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col rounded-xl border border-gray-900/10 p-6 hover:border-gray-900/20 dark:border-gray-50/10 dark:hover:border-gray-50/20"
    >
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {format(new Date(post.publishDate), "MMMM dd, yyy")}
      </p>
      <h3 className="text-2xl font-semibold line-clamp-2">{post.title}</h3>
      <p className="mt-2 text-gray-600 line-clamp-2 dark:text-gray-400">
        {post.description}
      </p>
    </Link>
  );
};

export default BlogCard;
