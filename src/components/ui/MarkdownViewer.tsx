'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

/**
 * Markdown 内容展示组件
 * 支持 GitHub Flavored Markdown 和自定义样式
 */
export function MarkdownViewer({ content, className = '' }: MarkdownViewerProps) {
  return (
    <div className={`prose prose-gray prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // 自定义渲染组件样式
          h1: ({ children }) => (
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-3 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mb-2 mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="mb-2 mt-3 text-base font-semibold text-gray-900 dark:text-white">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="mb-2 mt-3 text-sm font-semibold text-gray-900 dark:text-white">
              {children}
            </h6>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-7 text-gray-600 dark:text-gray-400">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 list-inside list-decimal space-y-2 text-gray-600 dark:text-gray-400">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-600 dark:text-gray-400">
              {children}
            </li>
          ),
          code: ({ inline, children, ...props }: any) =>
            inline ? (
              <code
                className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code
                className="block overflow-x-auto rounded-lg bg-gray-100 p-4 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                {...props}
              >
                {children}
              </code>
            ),
          pre: ({ children }) => (
            <pre className="mb-4 overflow-x-auto">{children}</pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mb-4 border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:border-gray-700 dark:text-gray-400">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="mb-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50 dark:bg-gray-800">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {children}
            </tbody>
          ),
          th: ({ children }) => (
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
              {children}
            </td>
          ),
          hr: () => (
            <hr className="my-8 border-gray-200 dark:border-gray-700" />
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt || ''}
              className="max-w-full rounded-lg"
            />
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-gray-900 dark:text-white">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-900 dark:text-white">
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

