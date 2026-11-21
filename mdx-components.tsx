import type { MDXComponents } from "mdx/types";

// required by @next/mdx in the App Router; no custom components, styling is in .markdown
export function useMDXComponents(): MDXComponents {
  return {};
}
