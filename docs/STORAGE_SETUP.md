# 📦 Supabase Storage 设置指南

## 🎯 为什么需要设置 Storage？

头像上传功能需要使用 Supabase Storage 来存储图片文件。

## 🚀 快速设置步骤

### 1️⃣ 创建 Storage Bucket

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 点击左侧菜单 **Storage** 📦
4. 点击 **New bucket** 按钮
5. 填写信息：
   - **Name**: `avatars`
   - **Public bucket**: ✅ **勾选**（允许公开访问）
6. 点击 **Create bucket**

### 2️⃣ 设置 Storage 策略（重要！）

为了让用户能够上传和访问头像，需要设置存储策略：

#### 方法 A：使用 Dashboard（推荐）

1. 在 **Storage** 页面，点击 `avatars` bucket
2. 点击 **Policies** 标签
3. 点击 **New Policy** → **For full customization**
4. 创建以下策略：

**策略 1：允许已认证用户上传**
- Policy name: `Allow authenticated users to upload`
- Allowed operation: `INSERT`
- Target roles: `authenticated`
- WITH CHECK expression:
```sql
(bucket_id = 'avatars'::text)
```

**策略 2：允许所有人查看**
- Policy name: `Allow public to view`
- Allowed operation: `SELECT`
- Target roles: `public`
- USING expression:
```sql
(bucket_id = 'avatars'::text)
```

**策略 3：允许用户删除自己的文件**
- Policy name: `Allow users to delete their own files`
- Allowed operation: `DELETE`
- Target roles: `authenticated`
- USING expression:
```sql
(bucket_id = 'avatars'::text)
```

#### 方法 B：使用 SQL（更快）

在 **SQL Editor** 中执行：

```sql
-- 允许已认证用户上传到 avatars bucket
CREATE POLICY "Allow authenticated users to upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- 允许所有人查看 avatars bucket 中的文件
CREATE POLICY "Allow public to view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- 允许用户删除 avatars bucket 中的文件
CREATE POLICY "Allow authenticated users to delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars');

-- 允许用户更新文件
CREATE POLICY "Allow authenticated users to update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars')
WITH CHECK (bucket_id = 'avatars');
```

### 3️⃣ 验证设置

运行以下 SQL 查询验证策略是否创建成功：

```sql
SELECT 
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects';
```

你应该看到至少 4 条策略记录。

---

## 🧪 测试上传

1. 启动应用：`pnpm dev`
2. 访问：http://localhost:3000/account
3. 在"个人资料"标签下，点击"选择图片"
4. 选择一张图片并上传
5. 如果成功，你会看到：
   - ✅ "保存成功！"提示
   - 图片预览更新
   - Header 中的头像更新

---

## 🛠️ 高级配置

### 限制文件大小

在 Supabase Dashboard → Settings → Storage：
- 设置 **Upload file size limit**（默认 50MB）
- 建议设置为 5-10MB

### 文件类型限制

代码中已实现（在 `src/lib/upload.ts`）：
- 只允许：JPG、PNG、GIF、WebP
- 最大：5MB
- 自动压缩到 400x400

### 自动清理旧头像

如果想在用户上传新头像时删除旧头像，可以在代码中添加：

```typescript
// 在上传新头像前
if (user.avatar_url && user.avatar_url.includes('supabase')) {
  // 提取文件路径
  const oldPath = user.avatar_url.split('/').pop();
  // 删除旧文件
  await UploadService.deleteFile(oldPath, 'avatars');
}
```

---

## ❓ 常见问题

### Q: 上传时提示 "new row violates row-level security policy"

**A:** Storage 策略未正确设置。请重新执行步骤 2。

### Q: 图片上传成功但无法显示

**A:** 确保 bucket 设置为 **Public**。可以在 Bucket 设置中修改：
1. Storage → avatars → Settings
2. 勾选 **Public bucket**

### Q: 如何查看已上传的文件？

**A:** 在 Supabase Dashboard：
1. Storage → avatars
2. 点击 bucket 名称
3. 可以看到所有上传的文件

### Q: 可以使用其他 bucket 名称吗？

**A:** 可以！修改以下位置：
1. 创建 bucket 时使用新名称
2. 在 `src/lib/upload.ts` 中修改默认 bucket 参数
3. 更新 Storage 策略中的 bucket_id

---

## 📊 Storage 使用情况

在 Supabase Dashboard 可以查看：
- 已使用空间
- 文件数量
- 流量使用

免费计划限制：
- **存储空间**: 1GB
- **带宽**: 2GB/月
- **请求**: 无限制

---

## 🔗 相关文档

- [Supabase Storage 文档](https://supabase.com/docs/guides/storage)
- [存储策略文档](https://supabase.com/docs/guides/storage/security/access-control)
- [文件上传最佳实践](https://supabase.com/docs/guides/storage/uploads)

---

## ✅ 检查清单

设置完成后，请确认：

- [ ] 已创建 `avatars` bucket
- [ ] Bucket 设置为 Public
- [ ] 已创建 4 条 Storage 策略（INSERT、SELECT、DELETE、UPDATE）
- [ ] 可以在应用中成功上传图片
- [ ] 上传后头像正确显示
- [ ] 可以在 Dashboard 中看到上传的文件

全部完成后，你的头像上传功能就可以正常使用了！🎉

