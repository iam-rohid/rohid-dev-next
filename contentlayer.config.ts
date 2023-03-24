import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypeToc from "@jsdevtools/rehype-toc";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    slug: {
      type: "string",
      required: true,
    },
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    publishDate: {
      type: "date",
      required: true,
    },
    isDraft: {
      type: "boolean",
      default: false,
    },
  },
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [rehypeSlug, rehypeToc],
  },
});
