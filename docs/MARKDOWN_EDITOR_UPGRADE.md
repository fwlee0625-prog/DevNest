# Markdown 编辑器升级说明

## 📦 使用开源编辑器

我们已经将自定义的 Markdown 编辑器升级为使用成熟的开源组件 **`@uiw/react-md-editor`**。

### 为什么选择 @uiw/react-md-editor？

✅ **功能完整** - 内置丰富的工具栏和快捷键  
✅ **实时预览** - 支持编辑、预览、双栏模式  
✅ **语法高亮** - 代码块自动高亮  
✅ **深色模式** - 自动适配系统主题  
✅ **活跃维护** - GitHub 6k+ stars，定期更新  
✅ **轻量高效** - 性能优秀，体积小  
✅ **文档完善** - 详细的 API 文档和示例  

---

## 🚀 安装依赖

### 使用 npm
```bash
npm install @uiw/react-md-editor
```

### 使用 pnpm
```bash
pnpm add @uiw/react-md-editor
```

### 使用 yarn
```bash
yarn add @uiw/react-md-editor
```

---

## 📝 组件 API

### Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `value` | `string` | ✅ | - | 当前编辑的 Markdown 内容 |
| `onChange` | `(value: string) => void` | ✅ | - | 内容变化回调函数 |
| `placeholder` | `string` | ❌ | `'请输入 Markdown 内容...'` | 占位符文本 |
| `label` | `string` | ❌ | `'项目详情'` | 标签文本 |
| `error` | `string` | ❌ | - | 错误提示信息 |
| `height` | `number` | ❌ | `400` | 编辑器高度（像素） |

---

## 💡 使用示例

### 基础使用

```tsx
import { useState } from 'react';
import { MarkdownEditor } from '@/components/ui/MarkdownEditor';

export default function MyForm() {
  const [content, setContent] = useState('# Hello\n\n这是一段 Markdown 文本');

  return (
    <MarkdownEditor
      value={content}
      onChange={setContent}
      label="内容编辑"
      placeholder="请输入内容..."
      height={500}
    />
  );
}
```

### 表单集成

```tsx
import { MarkdownEditor } from '@/components/ui/MarkdownEditor';

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const [errors, setErrors] = useState<{ content?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证
    if (!formData.content || formData.content.trim().length === 0) {
      setErrors({ content: '内容不能为空' });
      return;
    }

    // 提交...
  };

  return (
    <form onSubmit={handleSubmit}>
      <MarkdownEditor
        value={formData.content}
        onChange={(value) => setFormData({ ...formData, content: value })}
        label="项目详情"
        error={errors.content}
        height={600}
      />
      
      <button type="submit">提交</button>
    </form>
  );
}
```

---

## ✨ 核心功能

### 1. 工具栏功能

编辑器自带完整的工具栏，支持：

#### 文本格式
- **粗体** (`Ctrl+B`)
- *斜体* (`Ctrl+I`)
- ~~删除线~~
- `行内代码`
- 标题 (H1-H6)

#### 插入元素
- 链接
- 图片
- 代码块
- 引用
- 有序/无序列表
- 任务列表
- 表格
- 水平分隔线

#### 编辑操作
- 撤销/重做
- 全屏模式
- 实时预览
- 双栏模式

### 2. 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+B` | 粗体 |
| `Ctrl+I` | 斜体 |
| `Ctrl+K` | 插入链接 |
| `Ctrl+Shift+C` | 插入代码块 |
| `Ctrl+Shift+I` | 插入图片 |
| `Ctrl+Z` | 撤销 |
| `Ctrl+Y` | 重做 |

### 3. 预览模式

编辑器支持三种模式：
- **编辑模式** - 纯文本编辑
- **预览模式** - 只读渲染视图
- **双栏模式** - 编辑和预览并排显示

---

## 🎨 样式定制

### 全局样式

我们在 `src/app/globals.css` 中添加了自定义样式以适配项目的设计系统：

```css
/* Markdown Editor 样式定制 */
.markdown-editor-wrapper [data-color-mode='auto'] {
  --color-canvas-default: #ffffff;
  --color-border-default: #e5e7eb;
  /* ... 更多变量 */
}

@media (prefers-color-scheme: dark) {
  .markdown-editor-wrapper [data-color-mode='auto'] {
    --color-canvas-default: #0a0a0a;
    --color-border-default: #374151;
    /* ... 深色模式变量 */
  }
}
```

### 自定义主题变量

可以通过 CSS 变量自定义编辑器的外观：

```css
.markdown-editor-wrapper {
  --color-canvas-default: 你的背景色;
  --color-border-default: 你的边框色;
  --color-accent-fg: 你的强调色;
}
```

---

## 🔧 高级配置

### 1. 自定义工具栏

```tsx
<MDEditor
  value={value}
  onChange={onChange}
  height={500}
  commands={[
    // 自定义命令
    commands.bold,
    commands.italic,
    commands.hr,
  ]}
/>
```

### 2. 隐藏工具栏

```tsx
<MDEditor
  value={value}
  onChange={onChange}
  height={500}
  hideToolbar={true}
/>
```

### 3. 禁用预览

```tsx
<MDEditor
  value={value}
  onChange={onChange}
  height={500}
  preview="edit" // 只显示编辑模式
/>
```

---

## 📦 项目中的应用

### 新建项目页面
**文件**: `src/app/(site)/admin/projects/new/page.tsx`

```tsx
<MarkdownEditor
  value={formData.content}
  onChange={(value) => setFormData({ ...formData, content: value })}
  placeholder="使用 Markdown 格式编写项目详情..."
  label="项目详情"
  height={500}
/>
```

### 编辑项目页面
**文件**: `src/app/(site)/admin/projects/[id]/page.tsx`

```tsx
<MarkdownEditor
  value={project.content}
  onChange={(value) => setProject({ ...project, content: value })}
  placeholder="使用 Markdown 格式编写项目详情..."
  label="项目详情"
  height={500}
/>
```

---

## 🆚 与之前版本的对比

### 自定义版本 vs 开源版本

| 功能 | 自定义版本 | 开源版本 (@uiw/react-md-editor) |
|------|-----------|--------------------------------|
| 工具栏按钮 | 9个基础按钮 | 20+ 完整功能 |
| 预览模式 | 简单切换 | 编辑/预览/双栏三种模式 |
| 快捷键 | 无 | 完整快捷键支持 |
| 语法高亮 | 基础 | 完整的语法高亮 |
| 代码维护 | 需要自己维护 | 社区维护，定期更新 |
| 代码量 | ~275 行 | ~50 行（封装） |
| Bug 修复 | 需要自己处理 | 社区支持 |
| 功能扩展 | 需要自己开发 | 插件生态 |

---

## 🐛 常见问题

### Q: 为什么使用 dynamic import？

A: 因为 `@uiw/react-md-editor` 依赖浏览器 API，不支持服务端渲染（SSR）。使用 `dynamic(() => import(...), { ssr: false })` 可以避免 SSR 错误。

### Q: 如何更改编辑器高度？

A: 使用 `height` prop：

```tsx
<MarkdownEditor height={600} ... />
```

### Q: 支持哪些 Markdown 语法？

A: 支持完整的 CommonMark 规范和 GitHub Flavored Markdown (GFM)，包括：
- 标题、段落、列表
- 粗体、斜体、删除线
- 代码块（带语法高亮）
- 表格
- 任务列表
- 链接、图片
- 引用
- 等等...

### Q: 如何禁用某些工具栏按钮？

A: 可以通过 `commands` 属性自定义工具栏：

```tsx
import MDEditor, { commands } from '@uiw/react-md-editor';

<MDEditor
  commands={[
    commands.bold,
    commands.italic,
    // 只显示这两个按钮
  ]}
/>
```

### Q: 编辑器样式与项目不匹配怎么办？

A: 可以在 `globals.css` 中覆盖 CSS 变量。参考上面的"样式定制"部分。

---

## 📚 参考资源

- [官方文档](https://uiwjs.github.io/react-md-editor/)
- [GitHub 仓库](https://github.com/uiwjs/react-md-editor)
- [在线演示](https://uiwjs.github.io/react-md-editor/)
- [Markdown 语法指南](https://www.markdownguide.org/basic-syntax/)

---

## 🔄 迁移指南

### 从旧版本迁移

如果你之前使用的是自定义版本，只需要更新以下 props：

**之前**:
```tsx
<MarkdownEditor
  value={value}
  onChange={onChange}
  showPreview={true}
  minHeight="min-h-[500px]"
/>
```

**现在**:
```tsx
<MarkdownEditor
  value={value}
  onChange={onChange}
  height={500}
/>
```

主要变化：
- ❌ 移除了 `showPreview` prop（新版本始终支持预览）
- ❌ 移除了 `minHeight` prop
- ✅ 添加了 `height` prop（数字类型，单位为像素）

---

## 📝 更新日志

### v2.0.0 (2024-11-28)
- ✨ 升级为使用 `@uiw/react-md-editor` 开源组件
- ✨ 增加完整的工具栏功能（20+ 按钮）
- ✨ 支持编辑/预览/双栏三种模式
- ✨ 添加完整的快捷键支持
- ✨ 改进的语法高亮
- 🐛 修复 SSR 问题
- 🎨 优化深色模式样式
- 📝 简化代码，从 275 行减少到 50 行

### v1.0.0 (2024-11-28)
- ✨ 初始自定义版本
- 🎨 基础工具栏
- 👁️ 简单的预览功能

---

## 💡 最佳实践

### 1. 内容验证

```tsx
const validateContent = (content: string): string | null => {
  if (!content || content.trim().length === 0) {
    return '内容不能为空';
  }
  
  if (content.length > 50000) {
    return '内容过长，建议控制在 50000 字符以内';
  }
  
  return null;
};
```

### 2. 自动保存

```tsx
import { useEffect } from 'react';
import { debounce } from 'lodash';

const debouncedSave = debounce((content: string) => {
  localStorage.setItem('draft_content', content);
}, 1000);

export default function Editor() {
  const [content, setContent] = useState('');
  
  useEffect(() => {
    debouncedSave(content);
  }, [content]);
  
  return <MarkdownEditor value={content} onChange={setContent} />;
}
```

### 3. 图片上传

```tsx
const handleImageUpload = async (file: File) => {
  // 上传到图床或 CDN
  const url = await uploadImage(file);
  
  // 插入到编辑器
  const imageMarkdown = `![${file.name}](${url})`;
  setContent(content + '\n' + imageMarkdown);
};
```

---

## 🎯 总结

使用 `@uiw/react-md-editor` 相比自定义方案的优势：

✅ **节省开发时间** - 无需实现复杂功能  
✅ **更好的用户体验** - 专业的编辑器体验  
✅ **持续维护** - 社区支持和 Bug 修复  
✅ **功能完整** - 开箱即用的丰富功能  
✅ **易于定制** - 灵活的配置选项  

这是一个更成熟、更可靠的解决方案！🎉

