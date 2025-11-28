# MarkdownViewer Markdown 内容展示组件

一个用于渲染 Markdown 内容的组件，支持 GitHub Flavored Markdown 和丰富的自定义样式。

## 特性

- 支持 GitHub Flavored Markdown (GFM)
- 支持原始 HTML 渲染
- 丰富的自定义样式
- 响应式设计
- 深色模式支持
- 代码语法高亮样式

## 使用方法

```tsx
import { MarkdownViewer } from '@/components/ui/MarkdownViewer';

// 基础用法
<MarkdownViewer content="# Hello World\n\nThis is **bold** text." />

// 自定义样式类
<MarkdownViewer 
  content={markdownContent}
  className="custom-prose"
/>

// 显示项目详情
const projectDescription = `
# 项目标题

## 功能特性

- 特性 1
- 特性 2

\`\`\`javascript
console.log('Hello World');
\`\`\`
`;

<MarkdownViewer content={projectDescription} />
```

## Props

- `content`: 要渲染的 Markdown 内容字符串（必需）
- `className`: 自定义样式类名（可选）

## 支持的 Markdown 特性

- 标题（H1-H6）
- 段落和换行
- 列表（有序和无序）
- 代码块和行内代码
- 链接
- 图片
- 表格
- 引用块
- 分隔线
- 粗体和斜体

## 样式特性

组件使用 Tailwind CSS 的 `prose` 类，并自定义了以下元素的样式：

- **标题**: 不同级别的标题有不同的字体大小和间距
- **段落**: 合适的行高和间距
- **代码**: 行内代码和代码块有不同的背景色
- **链接**: 蓝色下划线样式，悬停时变色
- **表格**: 带边框的表格样式
- **引用**: 左侧边框的引用样式

## 依赖

- `react-markdown`: Markdown 渲染核心库
- `remark-gfm`: GitHub Flavored Markdown 支持
- `rehype-raw`: 原始 HTML 支持

## 注意事项

- 组件会自动处理 Markdown 语法
- 支持在 Markdown 中嵌入 HTML
- 代码块会保持原始格式，不会执行

