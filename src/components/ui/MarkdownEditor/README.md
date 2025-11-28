# MarkdownEditor Markdown 编辑器组件

一个功能强大的 Markdown 编辑器组件，基于 `@uiw/react-md-editor`，支持实时预览和语法高亮。

## 特性

- 实时预览功能
- 语法高亮
- 工具栏支持
- 可自定义高度
- 支持深色模式
- 错误提示显示
- 语法帮助链接

## 使用方法

```tsx
import { MarkdownEditor } from '@/components/ui/MarkdownEditor';

// 基础用法
const [content, setContent] = useState('');
<MarkdownEditor
  value={content}
  onChange={setContent}
/>

// 自定义配置
<MarkdownEditor
  value={content}
  onChange={setContent}
  label="项目详情"
  placeholder="请输入项目详情..."
  height={500}
  error={errors.content}
/>

// 受控组件示例
const [markdown, setMarkdown] = useState('# Hello World');
<MarkdownEditor
  value={markdown}
  onChange={(val) => setMarkdown(val)}
/>
```

## Props

- `value`: Markdown 内容字符串（必需）
- `onChange`: 内容变化回调函数，接收新的内容字符串（必需）
- `placeholder`: 占位符文本（可选，默认 `'请输入 Markdown 内容...'`）
- `label`: 标签文本（可选，默认 `'项目详情'`）
- `error`: 错误提示文本（可选）
- `height`: 编辑器高度（像素）（可选，默认 `400`）

## 功能说明

1. **实时预览**: 编辑时右侧实时显示渲染结果
2. **工具栏**: 提供常用的 Markdown 格式化工具
3. **语法高亮**: 代码块支持语法高亮
4. **深色模式**: 自动适配系统深色模式设置
5. **错误提示**: 可以显示验证错误信息
6. **语法帮助**: 提供 Markdown 语法帮助链接

## 依赖

- `@uiw/react-md-editor`: Markdown 编辑器核心库
- `@uiw/react-markdown-preview`: Markdown 预览库

## 注意事项

- 组件使用动态导入以避免 SSR 问题
- 需要确保已安装相关依赖包
- 编辑器会自动适配深色模式

