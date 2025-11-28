# Button 按钮组件

一个功能丰富的按钮组件，支持多种样式变体和尺寸，可以作为按钮或链接使用。

## 特性

- 支持多种样式变体（primary, secondary, outline, ghost）
- 支持多种尺寸（sm, md, lg）
- 可以作为按钮或 Next.js Link 使用
- 响应式设计，支持深色模式
- 可自定义样式类名
- 使用 forwardRef 支持 ref 传递

## 使用方法

```tsx
import { Button } from '@/components/ui/Button';

// 基础用法
<Button>点击我</Button>

// 不同变体
<Button variant="primary">主要按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="outline">轮廓按钮</Button>
<Button variant="ghost">幽灵按钮</Button>

// 不同尺寸
<Button size="sm">小按钮</Button>
<Button size="md">中等按钮</Button>
<Button size="lg">大按钮</Button>

// 作为链接使用
<Button href="/about">关于我们</Button>

// 禁用状态
<Button disabled>禁用按钮</Button>

// 自定义样式
<Button className="custom-class">自定义按钮</Button>
```

## Props

继承自 `React.ButtonHTMLAttributes<HTMLButtonElement>`，并添加了以下属性：

- `variant`: 按钮样式变体，可选值：`'primary' | 'secondary' | 'outline' | 'ghost'`，默认 `'primary'`
- `size`: 按钮尺寸，可选值：`'sm' | 'md' | 'lg'`，默认 `'md'`
- `href`: 如果提供此属性，按钮会渲染为 Next.js Link 组件
- `className`: 自定义样式类名
- ...其他所有原生 button 属性

## 样式变体

- **primary**: 黑色背景，白色文字（深色模式下反转）
- **secondary**: 灰色背景
- **outline**: 边框样式，透明背景
- **ghost**: 无边框，悬停时显示背景

## 尺寸

- **sm**: 高度 32px，小号内边距
- **md**: 高度 36px，中等内边距（默认）
- **lg**: 高度 40px，大号内边距

