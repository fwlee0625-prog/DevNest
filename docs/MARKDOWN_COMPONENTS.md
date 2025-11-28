# Markdown 组件使用文档

本项目提供了两个可复用的 Markdown 组件，用于编辑和展示 Markdown 内容。

## 组件概览

### 1. MarkdownViewer - Markdown 展示组件
用于前台展示 Markdown 格式的内容，支持完整的 Markdown 语法和自定义样式。

### 2. MarkdownEditor - Markdown 编辑器组件
用于后台编辑 Markdown 内容，提供实时预览、工具栏和语法快捷操作。

---

## MarkdownViewer 组件

### 📍 位置
`src/components/ui/MarkdownViewer.tsx`

### ✨ 特性
- ✅ 支持完整的 Markdown 语法
- ✅ 支持 GitHub Flavored Markdown (GFM)
- ✅ 支持原始 HTML 标签
- ✅ 自定义样式，深色模式支持
- ✅ 代码高亮显示
- ✅ 表格、列表、引用等
- ✅ 响应式图片
- ✅ 外链自动在新标签打开

### 📦 Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `content` | `string` | ✅ | - | 要展示的 Markdown 内容 |
| `className` | `string` | ❌ | `''` | 额外的 CSS 类名 |

### 💡 使用示例

```tsx
import { MarkdownViewer } from '@/components/ui/MarkdownViewer';

export default function ProjectDetail() {
  const content = `
# 项目标题

这是一个**重点内容**，支持 *斜体* 和 \`代码\`。

## 功能列表

- 功能一
- 功能二
- 功能三

\`\`\`javascript
const hello = () => {
  console.log("Hello World");
}
\`\`\`
  `;

  return (
    <div>
      <MarkdownViewer content={content} className="mt-4" />
    </div>
  );
}
```

### 🎨 支持的 Markdown 语法

- **标题**: `# H1` 到 `###### H6`
- **粗体**: `**文本**` 或 `__文本__`
- **斜体**: `*文本*` 或 `_文本_`
- **行内代码**: `` `代码` ``
- **代码块**: ` ```语言 代码 ``` `
- **链接**: `[文本](url)`
- **图片**: `![描述](url)`
- **列表**: `- 项目` 或 `1. 项目`
- **引用**: `> 引用文本`
- **表格**: GFM 表格语法
- **分隔线**: `---` 或 `***`
- **删除线**: `~~文本~~` (GFM)
- **任务列表**: `- [ ] 任务` (GFM)

---

## MarkdownEditor 组件

### 📍 位置
`src/components/ui/MarkdownEditor.tsx`

### ✨ 特性
- ✅ 富文本工具栏（粗体、斜体、标题等）
- ✅ 实时预览功能
- ✅ 编辑/预览标签切换
- ✅ 快捷插入常用 Markdown 语法
- ✅ 自动光标定位
- ✅ 语法帮助链接
- ✅ 深色模式支持
- ✅ 可自定义高度

### 📦 Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `value` | `string` | ✅ | - | 当前编辑的 Markdown 内容 |
| `onChange` | `(value: string) => void` | ✅ | - | 内容变化回调函数 |
| `placeholder` | `string` | ❌ | `'请输入 Markdown 内容...'` | 占位符文本 |
| `label` | `string` | ❌ | `'项目详情'` | 标签文本 |
| `error` | `string` | ❌ | - | 错误提示信息 |
| `showPreview` | `boolean` | ❌ | `true` | 是否显示预览功能 |
| `minHeight` | `string` | ❌ | `'min-h-[400px]'` | 最小高度（Tailwind 类名） |

### 💡 使用示例

```tsx
import { useState } from 'react';
import { MarkdownEditor } from '@/components/ui/MarkdownEditor';

export default function ProjectForm() {
  const [content, setContent] = useState('# 项目标题\n\n项目描述...');

  return (
    <form>
      <MarkdownEditor
        value={content}
        onChange={setContent}
        label="项目详情"
        placeholder="使用 Markdown 格式编写项目详情..."
        showPreview={true}
        minHeight="min-h-[500px]"
      />
    </form>
  );
}
```

### 🔧 工具栏功能

| 按钮 | 功能 | Markdown 语法 | 快捷键提示 |
|------|------|---------------|-----------|
| **B** | 粗体 | `**文本**` | Ctrl+B |
| _I_ | 斜体 | `*文本*` | Ctrl+I |
| **H** | 标题 | `## 文本` | - |
| `<>` | 行内代码 | `` `代码` `` | - |
| `{}` | 代码块 | ` ```代码``` ` | - |
| 🔗 | 链接 | `[文本](url)` | - |
| 🖼️ | 图片 | `![描述](url)` | - |
| ≡ | 列表 | `- 项目` | - |
| 💬 | 引用 | `> 文本` | - |

### 📝 编辑/预览模式

编辑器支持两种模式切换：

1. **编辑模式**: 显示文本编辑区域，可输入和编辑 Markdown 内容
2. **预览模式**: 实时渲染 Markdown 内容，查看最终效果

通过顶部的标签按钮可以自由切换。

---

## 项目中的应用

### 前台项目详情页
**文件**: `src/app/(site)/projects/[id]/page.tsx`

```tsx
{project.content && (
  <div className="mt-8">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
      项目详情
    </h2>
    <MarkdownViewer content={project.content} className="mt-4" />
  </div>
)}
```

### 后台新建项目页面
**文件**: `src/app/(site)/admin/projects/new/page.tsx`

```tsx
<MarkdownEditor
  value={formData.content}
  onChange={(value) => setFormData({ ...formData, content: value })}
  placeholder="使用 Markdown 格式编写项目详情..."
  label="项目详情"
  showPreview={true}
/>
```

### 后台编辑项目页面
**文件**: `src/app/(site)/admin/projects/[id]/page.tsx`

```tsx
<MarkdownEditor
  value={project.content}
  onChange={(value) => setProject({ ...project, content: value })}
  placeholder="使用 Markdown 格式编写项目详情..."
  label="项目详情"
  showPreview={true}
/>
```

---

## 依赖包

这些组件依赖以下 npm 包：

```json
{
  "react-markdown": "^10.1.0",
  "remark-gfm": "^4.0.0",
  "rehype-raw": "^7.0.0"
}
```

### 安装命令

```bash
npm install react-markdown remark-gfm rehype-raw
```

或

```bash
pnpm add react-markdown remark-gfm rehype-raw
```

---

## 样式定制

### 自定义 Markdown 样式

如果需要自定义 Markdown 元素的样式，可以修改 `MarkdownViewer.tsx` 中的 `components` 配置：

```tsx
components={{
  h1: ({ children }) => (
    <h1 className="你的自定义类名">
      {children}
    </h1>
  ),
  // ... 其他元素
}}
```

### 支持的元素

- `h1`, `h2`, `h3`, `h4`, `h5`, `h6` - 标题
- `p` - 段落
- `ul`, `ol`, `li` - 列表
- `code`, `pre` - 代码
- `blockquote` - 引用
- `a` - 链接
- `table`, `thead`, `tbody`, `th`, `td` - 表格
- `hr` - 分隔线
- `img` - 图片
- `strong` - 粗体
- `em` - 斜体

---

## 最佳实践

### 1. 内容验证
在提交前验证 Markdown 内容：

```tsx
const validateContent = (content: string) => {
  if (!content || content.trim().length === 0) {
    return '内容不能为空';
  }
  if (content.length > 10000) {
    return '内容过长，请控制在 10000 字符以内';
  }
  return null;
};
```

### 2. 图片处理
建议使用图床或 CDN 存储图片，在 Markdown 中引用 URL：

```markdown
![项目截图](https://cdn.example.com/images/project.png)
```

### 3. 代码块语法高亮
在代码块中指定语言以获得更好的显示效果：

```markdown
\`\`\`javascript
const hello = () => console.log("Hello");
\`\`\`
```

### 4. 响应式设计
MarkdownViewer 默认支持响应式，但大型表格可能需要横向滚动。

---

## 常见问题

### Q: 如何禁用预览功能？
A: 设置 `showPreview={false}`

```tsx
<MarkdownEditor
  value={content}
  onChange={setContent}
  showPreview={false}
/>
```

### Q: 如何修改编辑器高度？
A: 使用 `minHeight` 属性：

```tsx
<MarkdownEditor
  value={content}
  onChange={setContent}
  minHeight="min-h-[600px]"
/>
```

### Q: 支持哪些 Markdown 扩展？
A: 支持 GitHub Flavored Markdown (GFM)，包括：
- 表格
- 删除线 (~~文本~~)
- 任务列表 (- [ ] 任务)
- 自动链接识别

### Q: 如何添加自定义工具栏按钮？
A: 在 `MarkdownEditor.tsx` 的工具栏部分添加新按钮：

```tsx
<button
  type="button"
  onClick={() => insertMarkdown('custom', '自定义内容')}
  className="rounded p-2..."
  title="自定义功能"
>
  图标
</button>
```

---

## 更新日志

### v1.0.0 (2024-11-28)
- ✨ 初始版本
- 🎨 支持完整的 Markdown 语法
- 🌗 深色模式支持
- 📝 工具栏快捷操作
- 👁️ 实时预览功能

---

## 参考链接

- [Markdown 基础语法](https://www.markdownguide.org/basic-syntax/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [react-markdown 文档](https://github.com/remarkjs/react-markdown)
- [remark-gfm 插件](https://github.com/remarkjs/remark-gfm)

