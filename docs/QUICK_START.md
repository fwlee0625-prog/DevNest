# 🚀 快速开始指南

## 🎉 恭喜！所有功能已完成

你现在拥有一个功能完整的用户认证和账户管理系统！

## ✅ 已实现的功能

### 1. **用户认证系统**
- ✅ 登录/登出
- ✅ 会话管理
- ✅ 自动状态同步

### 2. **账户设置（4个标签页）**
- ✅ **个人资料**：头像上传、基本信息编辑
- ✅ **技术栈**：30+ 预设技术 + 自定义添加
- ✅ **社交媒体**：8个平台链接配置
- ✅ **安全设置**：密码修改

### 3. **UI 功能**
- ✅ Header 导航（登录后显示）
- ✅ 用户头像下拉菜单
- ✅ 响应式设计
- ✅ 暗色模式支持

---

## 🛠️ 使用前准备

### ⚠️ 重要：设置 Supabase Storage

头像上传功能需要先设置 Storage，请按以下步骤操作：

#### 1. 创建 Storage Bucket

在 Supabase Dashboard:
1. 进入 **Storage** 📦
2. 点击 **New bucket**
3. Name: `avatars`
4. ✅ 勾选 **Public bucket**
5. 创建

#### 2. 设置访问策略

在 **SQL Editor** 中执行：

```sql
-- 允许已认证用户上传
CREATE POLICY "Allow authenticated users to upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- 允许所有人查看
CREATE POLICY "Allow public to view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- 允许用户删除
CREATE POLICY "Allow authenticated users to delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars');

-- 允许用户更新
CREATE POLICY "Allow authenticated users to update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars')
WITH CHECK (bucket_id = 'avatars');
```

> 📖 详细说明见 [STORAGE_SETUP.md](./STORAGE_SETUP.md)

---

## 🎮 立即开始使用

### 1. 启动应用

```bash
pnpm dev
# 或
npm run dev
```

访问：http://localhost:3000

### 2. 登录

使用测试账号：
- **用户名**: `admin`
- **密码**: `admin123`

### 3. 探索功能

#### 🎨 个人资料
1. 点击右上角头像 → **账户设置**
2. 在"个人资料"标签：
   - 上传你的头像
   - 填写个人简介
   - 添加个人网站
   - 设置所在地
   - 点击"保存更改"

#### 💻 技术栈
1. 切换到"技术栈"标签
2. 从预设列表选择你的技术栈
3. 或者输入自定义技术
4. 点击"保存更改"

#### 📱 社交媒体
1. 切换到"社交媒体"标签
2. 填写你的社交账号链接
   - GitHub
   - Twitter
   - LinkedIn
   - 微博
   - B站
   - YouTube
   - Instagram
   - 微信
3. 点击"保存更改"

#### 🔒 修改密码
1. 切换到"安全设置"标签
2. 输入当前密码
3. 输入新密码（至少6位）
4. 确认新密码
5. 点击"修改密码"

---

## 📁 项目结构

```
src/
├── lib/
│   ├── supabase.ts         # Supabase 客户端
│   └── upload.ts           # 📦 文件上传工具（可复用）
├── services/
│   └── authService.ts      # 认证服务
├── hooks/
│   └── useAuth.ts          # 认证 Hook
├── types/
│   └── auth.ts             # 类型定义
├── components/
│   ├── layout/
│   │   └── Header.tsx      # 导航栏
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Textarea.tsx    # ✨ 新增
│       ├── ImageUpload.tsx # ✨ 新增
│       └── UserMenu.tsx
└── app/
    ├── login/
    │   └── page.tsx
    └── account/
        └── page.tsx        # ✨ 增强版账户设置
```

---

## 🔧 核心工具类

### UploadService - 文件上传（可复用）

这是一个通用的文件上传工具，可以在任何需要上传的地方使用：

```typescript
import { UploadService } from '@/lib/upload';

// 上传图片
const { url, error } = await UploadService.uploadImage(
  file,
  'bucket-name',
  'folder-path',
  5 // 最大 5MB
);

// 压缩图片
const compressed = await UploadService.compressImage(
  file,
  800,  // 最大宽度
  800,  // 最大高度
  0.8   // 质量
);

// 删除文件
const { success } = await UploadService.deleteFile(
  'file-path',
  'bucket-name'
);
```

---

## 📊 用户数据结构

```typescript
{
  id: string;              // 用户 ID
  email: string;           // 邮箱
  username: string;        // 用户名
  avatar_url?: string;     // 头像 URL
  bio?: string;            // 个人简介
  website?: string;        // 个人网站
  location?: string;       // 所在地
  skills?: string[];       // 技术栈
  social?: {              // 社交媒体
    github?: string;
    twitter?: string;
    linkedin?: string;
    weibo?: string;
    wechat?: string;
    bilibili?: string;
    youtube?: string;
    instagram?: string;
  };
}
```

---

## 🎨 UI 特性

### 响应式设计
- 📱 移动端：单列布局
- 💻 桌面端：宽松间距

### 暗色模式
- 🌙 自动适配系统主题
- 所有组件完美支持

### 交互反馈
- ✅ 成功提示（绿色，3秒后消失）
- ❌ 错误提示（红色，持续显示）
- ⏳ 加载状态（按钮禁用 + 文字变化）

---

## 🆘 遇到问题？

### Storage 上传失败？
→ 查看 [STORAGE_SETUP.md](./STORAGE_SETUP.md)

### 登录问题？
→ 查看 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

### 了解所有功能？
→ 查看 [FEATURES.md](./FEATURES.md)

### 认证系统详情？
→ 查看 [README_AUTH.md](./README_AUTH.md)

---

## 💡 提示和技巧

### 1. 头像上传
- 建议尺寸：400x400 或更大
- 系统会自动压缩到合适大小
- 支持拖拽上传

### 2. 技术栈
- 可以添加任意数量的技能
- 建议选择 5-15 个核心技术
- 自定义技能可以添加任何内容

### 3. 社交媒体
- 建议填写完整 URL
- 微信可以只填微信号
- 留空的平台不会显示

### 4. 密码安全
- 至少使用 6 位字符
- 建议包含数字和字母
- 定期更换密码

---

## 🚀 下一步

你可以考虑添加：

1. **用户个人主页** - 公开展示用户资料
2. **双因素认证** - 增强安全性
3. **邮箱验证** - 验证用户邮箱
4. **数据导出** - 导出个人数据
5. **活动日志** - 查看登录历史

---

## 📞 技术支持

如有问题：
1. 查看相关文档
2. 检查浏览器控制台
3. 查看 Supabase Dashboard 日志

---

**开始使用吧！** 🎉

祝你使用愉快！如需帮助，随时查看文档。

