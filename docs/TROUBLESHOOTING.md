# 🔧 登录错误排查指南

## ❌ 错误信息

```json
{
  "code": "unexpected_failure",
  "message": "Database error querying schema"
}
```

## 🎯 解决方案

### 步骤 1：检查环境变量配置

确保你的 `.env.local` 文件内容正确：

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://你的项目id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的超长anon-key字符串
```

#### ✅ 获取正确的值：

1. 访问 [supabase.com/dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 点击左侧菜单 **Settings** ⚙️
4. 点击 **API**
5. 复制以下内容：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys** → **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

⚠️ **注意事项：**

- URL 格式应该是：`https://xxxxx.supabase.co`（不要有多余的路径）
- anon key 是一个很长的字符串（通常几百个字符）
- 确保没有多余的空格或引号
- 环境变量必须以 `NEXT_PUBLIC_` 开头

---

### 步骤 2：重启开发服务器

修改 `.env.local` 后，**必须重启开发服务器**：

```bash
# 停止当前服务器（Ctrl + C）
# 然后重新启动
pnpm dev
```

---

### 步骤 3：检查 Supabase 项目状态

#### 3.1 确认项目已启动

在 Supabase Dashboard 中：

- 项目状态应该是 **Active** ✅
- 如果显示 **Paused**，点击 **Restore project**

#### 3.2 检查认证设置

进入 **Authentication** → **Providers**：

1. **Email** 提供商应该是 **已启用** ✅
2. 如果想在开发环境跳过邮箱验证：
   - 进入 **Authentication** → **Settings**
   - 找到 **Enable email confirmations**
   - 关闭此选项（用于开发测试）

---

### 步骤 4：创建测试用户

#### 方法 A：使用 SQL 编辑器（推荐）

1. 在 Supabase Dashboard，进入 **SQL Editor**
2. 点击 **New Query**
3. 粘贴并执行以下 SQL：

```sql
-- 创建管理员用户 admin/admin123
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@local.app',
  crypt('admin123', gen_salt('bf')),
  now(),
  '{"username": "admin", "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"}'::jsonb,
  now(),
  now(),
  '',
  ''
);
```

#### 方法 B：手动添加用户

1. 在 Supabase Dashboard，进入 **Authentication** → **Users**
2. 点击 **Add user** → **Create new user**
3. 填写信息：
   - Email: `admin@local.app`
   - Password: `admin123`
   - Auto Confirm User: ✅ **勾选**
4. 点击 **Create user**

---

### 步骤 5：测试 Supabase 连接

创建一个测试脚本来验证连接：

在项目根目录创建 `test-supabase.js`：

```javascript
// test-supabase.js
const { createClient } = require('@supabase/supabase-js');

// 从命令行参数读取或使用环境变量
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('测试 Supabase 连接...\n');
console.log('URL:', supabaseUrl);
console.log('Key (前20字符):', supabaseKey?.substring(0, 20) + '...\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ 错误: 环境变量未设置');
  console.log('请检查 .env.local 文件是否存在并包含正确的值');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('1. 测试基本连接...');
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError && userError.message !== 'Auth session missing!') {
      console.error('❌ 连接失败:', userError.message);
      return;
    }
    console.log('✅ 连接成功\n');

    console.log('2. 测试登录...');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@local.app',
      password: 'admin123',
    });

    if (error) {
      console.error('❌ 登录失败:', error.message);
      console.log('\n💡 提示: 如果提示用户不存在，请先在 Supabase 中创建用户');
    } else {
      console.log('✅ 登录成功!');
      console.log('用户信息:', {
        id: data.user.id,
        email: data.user.email,
        username: data.user.user_metadata?.username,
      });
    }
  } catch (err) {
    console.error('❌ 发生错误:', err.message);
  }
}

testConnection();
```

运行测试：

```bash
node test-supabase.js
```

---

## 🚨 常见错误及解决方案

### 错误 1: "Database error querying schema"

**原因：**

- Supabase 项目未正确初始化
- URL 或 Key 配置错误
- 项目被暂停

**解决：**

1. 确认项目状态是 Active
2. 重新复制 URL 和 Key
3. 重启开发服务器

---

### 错误 2: "Invalid login credentials"

**原因：**

- 用户不存在
- 密码错误
- 邮箱未验证

**解决：**

1. 在 Supabase 中检查用户是否存在
2. 重新创建用户
3. 确保邮箱已验证或关闭邮箱验证要求

---

### 错误 3: "Auth session missing"

**原因：**

- 正常现象，表示未登录

**解决：**

- 无需处理，这是预期行为

---

### 错误 4: 环境变量读取不到

**原因：**

- `.env.local` 文件位置错误
- 文件名拼写错误
- 没有重启开发服务器

**解决：**

1. 确保 `.env.local` 在项目根目录
2. 检查文件名（不是 `.env` 或 `.env.development`）
3. 重启开发服务器

---

## ✅ 验证清单

请按顺序检查以下项目：

- [ ] `.env.local` 文件存在于项目根目录
- [ ] `NEXT_PUBLIC_SUPABASE_URL` 格式正确（https://xxx.supabase.co）
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 是完整的 key（很长的字符串）
- [ ] Supabase 项目状态是 Active
- [ ] Email 认证提供商已启用
- [ ] 已创建测试用户（admin@local.app）
- [ ] 已重启开发服务器
- [ ] 测试脚本运行成功

---

## 🆘 仍然无法解决？

### 方案 1：使用 Supabase CLI 重新初始化

```bash
# 安装 Supabase CLI
npm install -g supabase

# 登录
supabase login

# 链接到你的项目
supabase link --project-ref your-project-id

# 检查状态
supabase status
```

### 方案 2：创建新的 Supabase 项目

如果问题持续，考虑创建一个全新的 Supabase 项目：

1. 访问 [supabase.com/dashboard](https://supabase.com/dashboard)
2. 点击 **New Project**
3. 填写项目信息
4. 等待项目初始化完成（约 2 分钟）
5. 复制新的 URL 和 Key
6. 更新 `.env.local`

### 方案 3：检查浏览器控制台

打开浏览器开发者工具（F12），查看：

- **Console** 标签页：查看 JavaScript 错误
- **Network** 标签页：查看 API 请求是否发送成功

---

## 📞 需要更多帮助？

如果以上方法都无法解决问题，请提供以下信息：

1. 浏览器控制台的完整错误信息
2. Network 标签中的请求详情
3. Supabase Dashboard 中项目的状态
4. `.env.local` 中的 URL（隐藏敏感信息）

这样我可以更准确地帮你诊断问题！🚀
