import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypeToc from "@jsdevtools/rehype-toc";

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
    coverImage: {
      type: "string",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => {
        const segments = post._raw.flattenedPath.split("/");
        return segments[segments.length - 1];
      },
    },
  },
}));
export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
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
    isDraft: {
      type: "boolean",
      default: false,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => {
        const segments = post._raw.flattenedPath.split("/");
        return segments[segments.length - 1];
      },
    },
  },
}));
export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.md`,
  fields: {
    title: {
      type: "string",
      required: true,
    },
    createdAt: {
      type: "date",
      required: true,
    },
    updatedAt: {
      type: "date",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => {
        const segments = post._raw.flattenedPath.split("/");
        return segments[segments.length - 1];
      },
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
  documentTypes: [Post, Page, Doc],
  mdx: {
    rehypePlugins: [rehypeSlug, [rehypeToc, { customizeTOC }]],
  },
});
