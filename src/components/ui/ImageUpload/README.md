# ImageUpload 图片上传组件

一个功能完整的图片上传组件，支持图片预览、文件验证和删除功能。

## 特性

- 图片预览功能
- 文件大小验证
- 支持多种图片格式（JPG, PNG, GIF, WebP）
- 上传状态显示
- 删除图片功能
- 可自定义标签和描述

## 使用方法

```tsx
import { ImageUpload } from '@/components/ui/ImageUpload';

// 基础用法
<ImageUpload
  onUpload={async (file) => {
    // 处理文件上传
    console.log('上传文件:', file);
  }}
/>

// 带当前图片
<ImageUpload
  currentImage="/path/to/image.jpg"
  onUpload={handleUpload}
  onRemove={handleRemove}
/>

// 自定义配置
<ImageUpload
  label="项目封面"
  description="支持 JPG、PNG 格式，最大 10MB"
  maxSizeMB={10}
  accept="image/jpeg,image/png"
  onUpload={handleUpload}
  isUploading={isUploading}
/>
```

## Props

- `currentImage`: 当前显示的图片 URL（可选）
- `onUpload`: 文件上传回调函数，接收 File 对象，返回 Promise
- `onRemove`: 删除图片回调函数（可选）
- `isUploading`: 是否正在上传（可选，默认 `false`）
- `accept`: 接受的文件类型（可选，默认 `'image/jpeg,image/jpg,image/png,image/gif,image/webp'`）
- `maxSizeMB`: 最大文件大小（MB）（可选，默认 `5`）
- `label`: 标签文本（可选，默认 `'上传图片'`）
- `description`: 描述文本（可选，默认 `'支持 JPG、PNG、GIF、WebP，最大 5MB'`）

## 功能说明

1. **文件选择**: 点击按钮选择图片文件
2. **文件验证**: 自动验证文件大小，超过限制会显示提示
3. **图片预览**: 选择文件后立即显示预览
4. **上传处理**: 调用 `onUpload` 回调处理实际上传逻辑
5. **删除功能**: 可以删除已上传的图片

## 注意事项

- `onUpload` 函数应该是异步的，用于处理实际上传逻辑
- 组件内部只负责文件选择和预览，实际上传逻辑需要在外部实现
- 文件大小验证会在选择文件时进行，超过限制的文件不会被处理

