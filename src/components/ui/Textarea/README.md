# Textarea 文本域组件

一个增强的文本域组件，支持错误状态显示和自定义样式。

## 特性

- 支持错误状态显示
- 响应式设计，支持深色模式
- 可自定义样式类名
- 使用 forwardRef 支持 ref 传递
- 禁用状态样式

## 使用方法

```tsx
import { Textarea } from '@/components/ui/Textarea';

// 基础用法
<Textarea placeholder="请输入内容" />

// 带错误提示
<Textarea error="请输入有效的内容" />

// 受控组件
const [value, setValue] = useState('');
<Textarea value={value} onChange={(e) => setValue(e.target.value)} />

// 禁用状态
<Textarea disabled />

// 自定义样式
<Textarea className="custom-class" />
```

## Props

继承自 `React.TextareaHTMLAttributes<HTMLTextAreaElement>`，并添加了以下属性：

- `error`: 错误提示文本，如果提供会显示在输入框下方
- `className`: 自定义样式类名
- ...其他所有原生 textarea 属性

## 样式

组件使用 Tailwind CSS 构建，包含以下样式特性：

- 圆角边框
- 聚焦时的环形高亮效果
- 错误状态下的红色边框
- 深色模式支持
- 禁用状态的视觉反馈

