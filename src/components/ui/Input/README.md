# Input 输入框组件

一个基础的输入框组件，支持所有原生 HTML input 元素的属性。

## 特性

- 支持所有原生 HTML input 属性
- 响应式设计，支持深色模式
- 可自定义样式类名
- 使用 forwardRef 支持 ref 传递

## 使用方法

```tsx
import { Input } from '@/components/ui/Input';

// 基础用法
<Input type="text" placeholder="请输入内容" />

// 带 ref
const inputRef = useRef<HTMLInputElement>(null);
<Input ref={inputRef} type="email" />

// 自定义样式
<Input className="custom-class" />
```

## Props

继承自 `React.InputHTMLAttributes<HTMLInputElement>`，支持所有原生 input 属性：

- `type`: 输入框类型（text, email, password 等）
- `placeholder`: 占位符文本
- `value`: 输入值
- `onChange`: 值变化回调
- `disabled`: 是否禁用
- `className`: 自定义样式类名
- ...其他所有原生 input 属性

## 样式

组件使用 Tailwind CSS 构建，包含以下样式特性：

- 圆角边框
- 聚焦时的环形高亮效果
- 深色模式支持
- 响应式设计

