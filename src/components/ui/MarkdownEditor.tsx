'use client';

import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

// 动态导入以避免 SSR 问题
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  height?: number;
}

/**
 * Markdown 编辑器组件
 * 使用 @uiw/react-md-editor 开源组件
 * 支持实时预览、工具栏、语法高亮等功能
 */
export function MarkdownEditor({
  value,
  onChange,
  placeholder = '请输入 Markdown 内容...',
  label = '项目详情',
  error,
  height = 400,
}: MarkdownEditorProps) {
  return (
    <div className="markdown-editor-wrapper">
      {/* 标签 */}
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Markdown 编辑器 */}
      <div data-color-mode="auto">
        <MDEditor
          value={value}
          onChange={(val) => onChange(val || '')}
          height={height}
          preview="live"
          textareaProps={{
            placeholder: placeholder,
          }}
          previewOptions={{
            rehypePlugins: [],
          }}
        />
      </div>

      {/* 错误提示 */}
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {/* 提示信息 */}
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        支持 Markdown 语法。{' '}
        <a
          href="https://www.markdownguide.org/basic-syntax/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          查看语法帮助
        </a>
      </p>
    </div>
  );
}
