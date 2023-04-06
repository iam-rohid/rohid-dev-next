import { Post } from "contentlayer/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ post }: { post: Post }) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col rounded-xl border border-gray-900/10 hover:border-gray-900/20 dark:border-gray-50/10 dark:hover:border-gray-50/20 overflow-hidden"
    >
      <Image
        src={post.coverImage}
        width={600}
        height={400}
        className="object-cover w-full aspect-video"
        alt={`${post.title} Cover Image`}
      />
      <div className="p-6">
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {format(new Date(post.publishDate), "MMMM dd, yyy")}
        </p>
        <h3 className="text-2xl font-semibold line-clamp-2">{post.title}</h3>
        <p className="mt-2 text-gray-600 line-clamp-2 dark:text-gray-400">
          {post.description}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
