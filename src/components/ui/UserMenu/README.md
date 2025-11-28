# UserMenu 用户菜单组件

一个用户下拉菜单组件，显示用户信息和账户操作选项。

## 特性

- 用户头像显示（支持自定义或自动生成）
- 下拉菜单
- 账户设置链接
- 退出登录功能（带确认对话框）
- 点击外部关闭菜单
- 响应式设计
- 深色模式支持

## 使用方法

```tsx
import { UserMenu } from '@/components/ui/UserMenu';

// 基础用法
const user = {
  id: '1',
  username: 'john_doe',
  email: 'john@example.com',
  avatar_url: '/avatar.jpg', // 可选
};

<UserMenu
  user={user}
  onLogout={async () => {
    // 处理退出登录逻辑
    await logout();
  }}
/>

// 带加载状态
<UserMenu
  user={user}
  onLogout={handleLogout}
  isLoggingOut={isLoggingOut}
/>
```

## Props

- `user`: 用户对象（必需）
  - `id`: 用户 ID
  - `username`: 用户名
  - `email`: 用户邮箱
  - `avatar_url`: 头像 URL（可选，如果没有会使用 DiceBear Avatars 自动生成）
- `onLogout`: 退出登录回调函数（必需）
- `isLoggingOut`: 是否正在退出登录（可选，默认 `false`）

## 功能说明

1. **用户头像**: 
   - 如果提供了 `avatar_url`，使用提供的头像
   - 如果没有，使用 DiceBear Avatars API 根据用户名生成头像

2. **下拉菜单**:
   - 点击用户头像打开/关闭菜单
   - 点击菜单外部自动关闭
   - 显示用户名和邮箱

3. **账户设置**:
   - 点击"账户设置"跳转到 `/account` 页面

4. **退出登录**:
   - 点击"退出登录"会显示确认对话框
   - 确认后调用 `onLogout` 回调

## 依赖

- `ConfirmDialog`: 用于退出登录确认对话框
- `@/types/auth`: 用户类型定义

## 注意事项

- 组件会自动处理菜单的打开和关闭状态
- 退出登录确认对话框是内置的，不需要外部管理
- 头像 URL 如果无效，会回退到自动生成的头像

