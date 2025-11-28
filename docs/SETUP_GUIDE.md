# 🚀 完整设置指南

## 📋 需要完成的设置

按照以下步骤完成所有配置，让系统正常运行。

---

## 1️⃣ Supabase 配置

### 环境变量

确保 `.env.local` 文件包含：

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 2️⃣ 创建数据库表

在 Supabase Dashboard → **SQL Editor** 中执行 `docs/SUPABASE_TABLES.sql`

这将创建：
- ✅ `projects` 表
- ✅ 更新时间触发器
- ✅ RLS 策略（4条）
- ✅ 性能索引

**验证表创建成功：**
```sql
SELECT * FROM projects LIMIT 1;
```

---

## 3️⃣ 设置 Storage (头像上传)

### 创建 Bucket

1. 进入 **Storage** 📦
2. 点击 **New bucket**
3. Name: `avatars`
4. ✅ 勾选 **Public bucket**

### 设置策略

在 **SQL Editor** 执行：

```sql
CREATE POLICY "Allow authenticated users to upload"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Allow public to view avatars"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'avatars');

CREATE POLICY "Allow authenticated users to delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'avatars');

CREATE POLICY "Allow authenticated users to update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'avatars')
WITH CHECK (bucket_id = 'avatars');
```

---

## 4️⃣ 创建管理员用户

在 Supabase Dashboard → **Authentication** → **Users**：

1. 点击 **Add user** → **Create new user**
2. Email: `admin@local.app`
3. Password: `admin123`
4. ✅ 勾选 **Auto Confirm User**
5. User Metadata:
```json
{
  "username": "admin",
  "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
}
```

---

## 5️⃣ 启动应用

```bash
# 使用 pnpm 或 npm
pnpm dev
# 或
npm run dev
```

访问：http://localhost:3000

---

## 🧪 测试功能

### 测试登录
1. 访问 `/login`
2. 用户名：`admin`
3. 密码：`admin123`
4. ✅ 登录成功

### 测试账户设置
1. 点击头像 → 账户设置
2. 测试：上传头像、编辑信息、添加技术栈
3. ✅ 保存成功

### 测试项目管理
1. 点击"应用管理"
2. 创建新项目
3. 设置为公开
4. 前台查看是否显示
5. ✅ 功能正常

---

## ✅ 完整检查清单

### Supabase 配置
- [ ] 环境变量已设置
- [ ] projects 表已创建
- [ ] RLS 策略已创建
- [ ] Storage bucket 已创建
- [ ] Storage 策略已创建
- [ ] 管理员用户已创建

### 功能测试
- [ ] 可以登录
- [ ] 可以退出
- [ ] 可以编辑账户
- [ ] 可以上传头像
- [ ] 可以访问管理后台
- [ ] 可以创建项目
- [ ] 可以编辑项目
- [ ] 可以删除项目
- [ ] 公开项目前台可见
- [ ] 私密项目前台不可见

### UI 测试
- [ ] Header 显示正常
- [ ] 用户菜单工作正常
- [ ] Toast 提示显示
- [ ] 确认对话框工作
- [ ] 暗色模式正常
- [ ] 响应式布局正常

---

## 🎯 快速开始命令

```bash
# 1. 克隆或进入项目
cd my-app

# 2. 安装依赖
pnpm install

# 3. 配置环境变量
cp .env.local.example .env.local
# 编辑 .env.local 填入你的 Supabase 配置

# 4. 在 Supabase 执行 SQL
# 复制 docs/SUPABASE_TABLES.sql 内容到 SQL Editor 执行

# 5. 创建管理员用户
# 在 Supabase Dashboard → Authentication → Users 创建

# 6. 启动应用
pnpm dev

# 7. 访问应用
open http://localhost:3000
```

---

## 📞 获取帮助

如遇到问题：
1. 查看相关文档
2. 检查 Supabase Dashboard 日志
3. 查看浏览器控制台
4. 检查数据库表和策略

**文档列表：**
- `docs/ADMIN_SYSTEM.md` - 管理系统
- `docs/SUPABASE_TABLES.sql` - 数据库结构
- `docs/PROJECTS_FEATURE.md` - 项目功能

---

**设置完成后，你就可以开始使用完整的项目管理系统了！** 🚀

