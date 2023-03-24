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

const customizeTOC = (toc: any): any => {
  try {
    const { children } = toc;
    const childrenOfChildren = children?.[0]?.children;
    if (!children?.length || !childrenOfChildren?.length) return null;
  } catch (e) {}
  return {
    type: "element",
    tagName: "div",
    properties: { className: "toc" },
    children: [
      {
        type: "element",
        tagName: "h3",
        properties: { className: "title" },
        children: [
          {
            type: "text",
            value: "Table of Contents",
          },
        ],
      },
      ...(toc.children || []),
    ],
  };
};

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [rehypeSlug, [rehypeToc, { customizeTOC }]],
  },
});
