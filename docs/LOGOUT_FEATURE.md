# 🚪 退出登录功能文档

## 🎯 功能概述

完善的退出登录系统，提供安全、友好的用户体验。

## ✨ 实现的功能

### 1. 确认对话框
- ✅ 点击"退出登录"显示确认对话框
- ✅ 避免误操作
- ✅ 清晰的警告图标和提示文字
- ✅ 按 ESC 键可关闭对话框

### 2. 加载状态
- ✅ 退出过程显示加载动画
- ✅ 按钮文字变为"退出中..."
- ✅ 禁用所有交互防止重复提交

### 3. Toast 通知
- ✅ 成功退出显示绿色成功提示
- ✅ 失败时显示红色错误提示
- ✅ 3秒后自动消失
- ✅ 可点击提前关闭

### 4. 数据清理
- ✅ 清除 Supabase 认证令牌
- ✅ 清除 localStorage 数据
- ✅ 清除 sessionStorage 数据
- ✅ 清除全局认证状态

### 5. 页面跳转
- ✅ 退出成功后跳转到首页
- ✅ 延迟跳转让用户看到提示
- ✅ 平滑的过渡体验

---

## 📁 涉及的文件

### 新增文件

#### `src/components/ui/ConfirmDialog.tsx`
**确认对话框组件** - 可复用的确认弹窗

**特性：**
- 支持 3 种变体：danger、warning、info
- 自定义标题和消息
- 自定义按钮文字
- 加载状态支持
- 键盘快捷键（ESC 关闭）
- 点击背景关闭
- 禁止背景滚动
- 动画效果

**Props：**
```typescript
interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: 'danger' | 'warning' | 'info';
}
```

#### `src/lib/toast.ts`
**Toast 通知工具** - 全局提示消息

**方法：**
```typescript
toast.success(message, options?) // 成功提示（绿色）
toast.error(message, options?)   // 错误提示（红色）
toast.warning(message, options?) // 警告提示（黄色）
toast.info(message, options?)    // 信息提示（蓝色）
```

**选项：**
```typescript
{
  duration?: number;  // 显示时长，默认 3000ms
  position?: 'top-right' | 'top-center' | 'top-left' | 
             'bottom-right' | 'bottom-center' | 'bottom-left'
}
```

---

### 更新的文件

#### `src/components/ui/UserMenu.tsx`
**用户菜单组件**

**更新内容：**
- 添加确认对话框
- 添加加载状态 prop
- 退出按钮显示加载文字
- 集成 ConfirmDialog

**新增 Props：**
```typescript
interface UserMenuProps {
  user: User;
  onLogout: () => void;
  isLoggingOut?: boolean;  // 新增
}
```

#### `src/components/layout/Header.tsx`
**导航栏组件**

**更新内容：**
- 添加退出加载状态
- 清理本地存储
- 使用 toast 显示提示
- 延迟跳转优化体验

**核心逻辑：**
```typescript
const handleLogout = async () => {
  setIsLoggingOut(true);
  
  try {
    // 1. 清除本地存储
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.clear();
    
    // 2. 执行登出
    const result = await logout();
    
    if (result.success) {
      // 3. 显示成功提示
      toast.success('已成功退出登录');
      
      // 4. 延迟跳转
      setTimeout(() => {
        router.push('/');
      }, 500);
    }
  } catch (error) {
    toast.error('退出登录时发生错误');
  } finally {
    setIsLoggingOut(false);
  }
};
```

#### `src/app/login/page.tsx`
**登录页面**

**更新内容：**
- 登录成功显示 toast
- 登录失败显示 toast
- 延迟跳转优化体验

#### `src/app/account/page.tsx`
**账户设置页面**

**更新内容：**
- 移除页面级别的成功/错误提示
- 使用 toast 替代
- 所有操作统一使用 toast 反馈

---

## 🎨 UI 展示

### 退出确认对话框
```
┌─────────────────────────────────────┐
│  ⚠️  确认退出登录                    │
│                                     │
│  你确定要退出登录吗？               │
│  退出后需要重新登录才能访问         │
│  账户功能。                         │
│                                     │
│  [ 退出登录 ]  [ 取消 ]            │
└─────────────────────────────────────┘
```

### Toast 通知
```
右上角弹出：
┌─────────────────────────┐
│ ✅ 已成功退出登录       │
└─────────────────────────┘
```

---

## 🔧 使用方法

### 在其他组件中使用 ConfirmDialog

```typescript
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

function MyComponent() {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    // 执行删除操作
    await deleteData();
    setIsLoading(false);
    setShowDialog(false);
  };

  return (
    <>
      <button onClick={() => setShowDialog(true)}>
        删除
      </button>

      <ConfirmDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleDelete}
        title="确认删除"
        message="此操作不可撤销，确定要删除吗？"
        confirmText="删除"
        cancelText="取消"
        isLoading={isLoading}
        variant="danger"
      />
    </>
  );
}
```

### 在任何地方使用 Toast

```typescript
import { toast } from '@/lib/toast';

// 成功提示
toast.success('操作成功！');

// 错误提示
toast.error('操作失败，请重试');

// 警告提示
toast.warning('请注意，此操作有风险');

// 信息提示
toast.info('新消息：系统将于今晚维护');

// 自定义选项
toast.success('已保存', {
  duration: 5000,
  position: 'top-center'
});
```

---

## 🎯 用户体验流程

### 完整的退出流程

1. **触发退出**
   - 用户点击头像
   - 下拉菜单出现
   - 点击"退出登录"按钮

2. **显示确认**
   - 下拉菜单关闭
   - 确认对话框弹出
   - 背景变暗（遮罩）

3. **用户选择**
   - **点击"取消"** → 关闭对话框，什么都不做
   - **点击"退出登录"** → 进入下一步
   - **按 ESC** → 关闭对话框
   - **点击背景** → 关闭对话框

4. **执行退出**
   - 按钮显示加载状态
   - 禁用所有交互
   - 清理本地数据
   - 调用 Supabase 登出 API

5. **显示反馈**
   - 关闭对话框
   - 显示成功 toast
   - 延迟 500ms

6. **页面跳转**
   - 跳转到首页
   - Header 变为未登录状态

---

## 🛡️ 安全特性

### 数据清理
```typescript
// 清除认证令牌
localStorage.removeItem('supabase.auth.token');

// 清除会话数据
sessionStorage.clear();

// Supabase 清除服务端会话
await supabase.auth.signOut();
```

### 防止误操作
- 确认对话框
- 加载状态禁用按钮
- 清晰的提示文字

### 错误处理
```typescript
try {
  await logout();
  toast.success('已成功退出登录');
} catch (error) {
  toast.error('退出登录时发生错误');
}
```

---

## 🎨 样式特性

### 动画效果
- 对话框淡入淡出
- Toast 滑入滑出
- 按钮加载动画

### 响应式设计
- 移动端优化
- 触摸友好
- 自适应布局

### 暗色模式
- 完美支持暗色主题
- 所有颜色适配
- 对比度优化

---

## 🧪 测试场景

### 正常流程
1. ✅ 点击退出 → 显示确认对话框
2. ✅ 确认退出 → 显示加载状态
3. ✅ 成功退出 → 显示 toast
4. ✅ 跳转首页 → Header 变为未登录

### 取消操作
1. ✅ 点击"取消" → 关闭对话框
2. ✅ 按 ESC → 关闭对话框
3. ✅ 点击背景 → 关闭对话框

### 错误处理
1. ✅ 网络错误 → 显示错误 toast
2. ✅ API 失败 → 显示错误提示
3. ✅ 重复点击 → 防止重复请求

---

## 📊 技术细节

### 状态管理
```typescript
const [isLoggingOut, setIsLoggingOut] = useState(false);
const [showLogoutDialog, setShowLogoutDialog] = useState(false);
```

### 事件监听
```typescript
// ESC 键关闭
document.addEventListener('keydown', handleEsc);

// 点击外部关闭
document.addEventListener('mousedown', handleClickOutside);
```

### 防止背景滚动
```typescript
if (isOpen) {
  document.body.style.overflow = 'hidden';
} else {
  document.body.style.overflow = 'unset';
}
```

---

## 🔮 未来增强

可以考虑添加：

1. **退出历史记录** - 记录每次退出的时间和设备
2. **强制登出** - 管理员可以强制用户退出
3. **多设备登出** - 一键退出所有设备
4. **退出原因统计** - 分析用户退出原因
5. **自动登出** - 长时间不活动自动退出

---

## 💡 最佳实践

### 确认对话框使用场景
- ✅ 退出登录
- ✅ 删除数据
- ✅ 取消订单
- ✅ 清空购物车
- ❌ 保存草稿
- ❌ 返回上一页

### Toast 使用建议
- 成功操作：绿色 success
- 失败错误：红色 error
- 警告提示：黄色 warning
- 普通信息：蓝色 info

### 加载状态
- 始终显示加载指示器
- 禁用相关按钮
- 显示进度文字

---

**退出登录功能已完善！** 🎉

现在用户可以安全、优雅地退出系统了。

