# ConfirmDialog 确认对话框组件

一个功能完整的确认对话框组件，支持多种变体、加载状态和键盘快捷键。

## 特性

- 多种样式变体（danger, warning, info）
- 支持加载状态
- ESC 键关闭
- 点击遮罩关闭
- 动画效果
- 禁止背景滚动
- 可自定义按钮文本

## 使用方法

```tsx
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

// 基础用法
const [isOpen, setIsOpen] = useState(false);

<ConfirmDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={() => {
    // 执行确认操作
    console.log('确认');
  }}
  title="确认删除"
  message="你确定要删除这个项目吗？此操作不可撤销。"
/>

// 不同变体
<ConfirmDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleConfirm}
  title="警告"
  message="这是一个警告信息"
  variant="warning"
/>

// 带加载状态
<ConfirmDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleAsyncConfirm}
  title="确认操作"
  message="正在处理..."
  isLoading={isLoading}
/>

// 自定义按钮文本
<ConfirmDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleConfirm}
  title="确认"
  message="确认执行此操作？"
  confirmText="确定"
  cancelText="取消"
/>

// 无遮罩
<ConfirmDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleConfirm}
  title="提示"
  message="这是一个提示信息"
  showOverlay={false}
/>
```

## Props

- `isOpen`: 是否显示对话框（必需）
- `onClose`: 关闭对话框回调函数（必需）
- `onConfirm`: 确认操作回调函数（必需）
- `title`: 对话框标题（必需）
- `message`: 对话框消息内容（必需）
- `confirmText`: 确认按钮文本（可选，默认 `'确认'`）
- `cancelText`: 取消按钮文本（可选，默认 `'取消'`）
- `isLoading`: 是否正在加载（可选，默认 `false`）
- `variant`: 对话框变体（可选，默认 `'danger'`）
  - `'danger'`: 危险操作（红色）
  - `'warning'`: 警告信息（黄色）
  - `'info'`: 信息提示（蓝色）
- `showOverlay`: 是否显示遮罩（可选，默认 `true`）

## 功能说明

1. **键盘支持**: 按 ESC 键可以关闭对话框（加载中时禁用）
2. **点击遮罩**: 点击遮罩层可以关闭对话框（加载中时禁用）
3. **背景滚动**: 对话框打开时会禁止背景页面滚动
4. **动画效果**: 打开和关闭时有淡入淡出和缩放动画
5. **加载状态**: 加载中时按钮会禁用，防止重复操作

## 注意事项

- `onConfirm` 回调执行后，对话框会立即关闭，不等待异步操作完成
- 如果需要等待异步操作完成后再关闭，需要在外部管理 `isOpen` 状态
- 对话框使用固定定位，会覆盖整个屏幕

