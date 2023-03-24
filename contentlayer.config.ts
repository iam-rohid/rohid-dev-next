import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
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
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => {
        const items = post._raw.flattenedPath.split("/");
        const slug = items[items.length - 1];
        return slug;
      },
    },
    url: {
      type: "string",
      resolve: (post) => {
        const items = post._raw.flattenedPath.split("/");
        const slug = items[items.length - 1];
        return `/blog/${slug}`;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Post],
});
