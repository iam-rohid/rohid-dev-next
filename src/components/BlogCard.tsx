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
      {/* {
    !!category && (
      <p className="mb-2 text-lg font-medium text-primary-500 dark:text-primary-400">
        {category}
      </p>
    )
  } */}
      <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
        {format(new Date(post.publishDate), "MMMM dd, yyy")}
      </p>
      <h3 className="text-2xl font-semibold line-clamp-2">{post.title}</h3>
      <p className="my-4 text-gray-600 line-clamp-2 dark:text-gray-400">
        {post.description}
      </p>
      <div className="mt-auto flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="inline-flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          {viewCount} Views
        </div>
        <span> •</span>
        <div className="inline-flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            ></path>
          </svg>
          {shareCount} Shares
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
