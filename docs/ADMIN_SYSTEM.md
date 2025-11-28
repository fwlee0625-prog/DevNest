# 🎛️ 应用管理系统文档

## 🎯 功能概述

完整的后台管理系统，支持项目的增删改查，使用 Markdown 编写内容，数据存储在 Supabase。

## ✨ 核心功能

### 1. 项目管理
- ✅ 创建新项目
- ✅ 编辑项目
- ✅ 删除项目
- ✅ 公开/私密状态切换
- ✅ 推荐标记
- ✅ Markdown 内容编辑

### 2. 权限控制
- ✅ 需要登录才能访问
- ✅ 用户只能管理自己的项目
- ✅ Row Level Security (RLS)

### 3. 数据存储
- ✅ Supabase PostgreSQL 数据库
- ✅ 自动时间戳
- ✅ 关联用户ID

---

## 🚀 快速开始

### 步骤 1：创建数据库表

在 Supabase Dashboard → **SQL Editor** 中执行：

```sql
-- 复制 docs/SUPABASE_TABLES.sql 中的 SQL
-- 这将创建 projects 表和所有必要的策略
```

**重要字段：**
- `is_public` - 是否公开展示
- `content` - Markdown 格式的详细内容
- `tech_stack` - 技术栈数组
- `author_id` - 关联到创建者

### 步骤 2：访问管理后台

1. 登录应用（admin / admin123）
2. 点击 Header 的"应用管理"链接
3. 或直接访问：http://localhost:3000/admin/projects

### 步骤 3：创建项目

1. 点击"新建项目"按钮
2. 填写项目信息：
   - **项目名称** ✅ 必填
   - **简短描述** ✅ 必填
   - 项目图片 URL
   - 分类选择
3. 使用 Markdown 编写详细内容
4. 添加技术栈标签
5. 填写 GitHub 和演示链接
6. 选择是否公开
7. 点击"创建项目"

---

## 📁 文件结构

```
src/
├── types/
│   ├── project.ts             # 前端项目类型
│   └── admin.ts               # 后台项目类型
├── services/
│   └── projectService.ts      # 项目CRUD服务
├── data/
│   └── projects.ts            # Mock数据（已弃用）
└── app/(site)/
    ├── projects/              # 前台展示
    │   ├── page.tsx          # 项目列表（公开项目）
    │   └── [id]/page.tsx     # 项目详情
    └── admin/                 # 后台管理
        ├── layout.tsx         # 管理布局（左侧菜单）
        └── projects/
            ├── page.tsx       # 项目列表（全部）
            ├── new/page.tsx   # 新建项目
            └── [id]/page.tsx  # 编辑项目

docs/
└── SUPABASE_TABLES.sql       # 数据库表结构
```

---

## 🎨 界面设计

### 管理后台布局

```
┌─────────────────────────────────────────────┐
│         Header (Logo + 导航 + 用户)          │
├──────────┬──────────────────────────────────┤
│ 应用管理  │                                  │
│ 管理... │        主内容区                   │
│          │                                  │
│ 项目管理  │     [项目列表表格]               │
│ ├ 项目列表│                                  │
│          │                                  │
│          │                                  │
│ 返回首页  │                                  │
└──────────┴──────────────────────────────────┘
```

### 项目列表表格

| 项目名称 | 分类 | 状态 | 创建时间 | 操作 |
|---------|------|------|---------|------|
| [图片] Next.js | Starter | 公开 | 2024-01-15 | [编辑] [删除] |

### 项目编辑表单

```
┌─ 基本信息 ─────────────────┐
│ 项目名称: [________]       │
│ 简短描述: [________]       │
│ 图片 URL: [________]       │
│ 分类: [Starter ▼]          │
└────────────────────────────┘

┌─ 项目详情 (Markdown) ──────┐
│ # 标题                     │
│ ## 小标题                  │
│ 内容...                    │
└────────────────────────────┘

┌─ 技术栈 ───────────────────┐
│ [输入技术] [添加]          │
│ [Next.js ×] [React ×]      │
└────────────────────────────┘

┌─ 链接信息 ─────────────────┐
│ GitHub: [________]         │
│ 演示: [________]           │
└────────────────────────────┘

┌─ 项目设置 ─────────────────┐
│ ☑ 公开展示                 │
│ ☐ 推荐项目                 │
└────────────────────────────┘

[创建项目] [取消]
```

---

## 🔧 功能详解

### 1. 创建项目

**必填字段：**
- 项目名称
- 简短描述

**可选字段：**
- 项目图片
- Markdown 内容
- 技术栈
- GitHub 链接
- 演示链接
- 分类
- 公开状态
- 推荐状态

**Markdown 编辑：**
- 使用 textarea 编写
- 支持完整 Markdown 语法
- 实时保存

### 2. 编辑项目

1. 在项目列表点击"编辑"
2. 修改任意字段
3. 点击"保存更改"
4. 自动返回列表页

### 3. 删除项目

1. 点击"删除"按钮
2. 显示确认对话框
3. 确认后永久删除
4. 刷新列表

### 4. 切换公开状态

- 点击状态标签直接切换
- 公开 ↔ 私密
- 私密项目不会在前台显示

---

## 💾 数据库设计

### projects 表结构

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,              -- Markdown内容
  image VARCHAR(500),
  category VARCHAR(50),
  tech_stack TEXT[],         -- 技术栈数组
  framework VARCHAR(100),
  css VARCHAR(100),
  database VARCHAR(100),
  repo_url VARCHAR(500),
  demo_url VARCHAR(500),
  download_url VARCHAR(500),
  is_downloadable BOOLEAN,
  is_public BOOLEAN,         -- 是否公开
  featured BOOLEAN,
  author_id UUID,            -- 创建者ID
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### RLS 策略

1. **查看权限**
   - 所有人可查看公开项目
   - 用户可查看自己的所有项目

2. **创建权限**
   - 已登录用户可创建

3. **更新权限**
   - 只能更新自己的项目

4. **删除权限**
   - 只能删除自己的项目

---

## 🔐 权限控制

### 访问控制

```typescript
// 管理后台布局中的检查
useEffect(() => {
  if (!loading && !user) {
    router.push('/login');  // 未登录跳转
  }
}, [user, loading]);
```

### 数据安全

- ✅ RLS 策略保护
- ✅ author_id 自动关联
- ✅ 只能操作自己的数据

---

## 📝 Markdown 使用指南

### 支持的语法

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文本**
*斜体文本*

[链接文字](https://example.com)

- 列表项 1
- 列表项 2

1. 有序列表
2. 第二项

`代码`

\`\`\`javascript
// 代码块
console.log('Hello');
\`\`\`

> 引用文本
```

### 编写技巧

1. **结构清晰** - 使用标题分层
2. **简洁明了** - 避免过长段落
3. **格式统一** - 保持风格一致
4. **预览效果** - 前台查看实际效果

---

## 🎯 使用流程

### 完整的项目发布流程

1. **登录管理后台**
   - 访问 `/admin/projects`
   - 需要登录权限

2. **创建新项目**
   - 点击"新建项目"
   - 填写基本信息
   - 编写 Markdown 内容
   - 添加技术栈
   - 设置为私密（草稿）

3. **预览和测试**
   - 保存项目
   - 检查前台不显示（私密）
   - 编辑完善内容

4. **发布项目**
   - 编辑项目
   - 勾选"公开展示"
   - 保存更改
   - 前台立即可见

5. **管理项目**
   - 随时编辑内容
   - 切换公开状态
   - 删除过时项目

---

## 🧪 测试步骤

### 1. 设置数据库

```bash
# 在 Supabase SQL Editor 执行
docs/SUPABASE_TABLES.sql
```

### 2. 创建测试项目

```bash
访问: http://localhost:3000/admin/projects
点击: 新建项目
填写: 测试项目信息
勾选: 公开展示
保存
```

### 3. 验证前台显示

```bash
访问: http://localhost:3000/projects
查看: 新建的项目是否出现在列表中
点击: 查看详情页
```

### 4. 测试权限

```bash
# 未登录状态
访问: /admin/projects
结果: 自动跳转到登录页 ✅

# 登录状态
访问: /admin/projects  
结果: 显示项目列表 ✅
```

---

## 🔄 数据流转

```
1. 创建项目
   └→ 表单填写
      └→ ProjectService.createProject()
         └→ Supabase INSERT
            └→ 返回列表

2. 公开展示
   └→ is_public = true
      └→ 前台列表
         └→ SELECT WHERE is_public = true

3. 私密状态
   └→ is_public = false
      └→ 前台不显示
         └→ 只在后台可见
```

---

## 🎨 UI 特点

### 1. 左侧菜单
- 固定宽度 256px
- 分组菜单结构
- 当前页面高亮
- 返回首页按钮

### 2. 右侧内容
- 自动撑满剩余空间
- 最大宽度容器
- 滚动溢出处理

### 3. 表格设计
- 响应式表格
- 悬停高亮行
- 操作按钮对齐
- 状态标签

### 4. 表单设计
- 卡片式分组
- 清晰的标签
- 实时验证
- 保存反馈

---

## 📊 API 方法

### ProjectService

```typescript
// 获取公开项目（前台）
await ProjectService.getPublicProjects();

// 获取用户项目（后台）
await ProjectService.getUserProjects();

// 获取单个项目
await ProjectService.getProjectById(id);

// 创建项目
await ProjectService.createProject(input);

// 更新项目
await ProjectService.updateProject(input);

// 删除项目
await ProjectService.deleteProject(id);

// 切换公开状态
await ProjectService.togglePublic(id, isPublic);
```

---

## 🔮 未来功能

### 高级编辑器
- [ ] 专业 Markdown 编辑器
- [ ] 实时预览
- [ ] 语法高亮
- [ ] 图片拖拽上传

### 项目管理
- [ ] 批量操作
- [ ] 项目排序
- [ ] 项目复制
- [ ] 版本历史

### 统计分析
- [ ] 访问统计
- [ ] 热门项目
- [ ] 用户反馈
- [ ] 下载统计

---

## ⚠️ 注意事项

### 1. 数据库设置
- 必须先在 Supabase 创建表
- 确保 RLS 策略正确
- 检查用户权限

### 2. 图片URL
- 建议使用 CDN
- 或上传到 Supabase Storage
- 确保链接可访问

### 3. Markdown 内容
- 注意安全性
- 避免 XSS 攻击
- 验证输入内容

### 4. 权限管理
- 确保已登录
- 检查 author_id
- 测试RLS策略

---

## 🛠️ 故障排查

### Q: 无法访问管理后台？
**A:** 检查是否已登录，未登录会自动跳转到登录页。

### Q: 创建项目失败？
**A:** 
1. 检查 Supabase 表是否已创建
2. 查看浏览器控制台错误
3. 验证 RLS 策略

### Q: 前台看不到项目？
**A:** 确保项目的 `is_public` 设置为 `true`。

### Q: 无法删除项目？
**A:** 检查 RLS 策略，确保 `author_id` 匹配。

---

## 📖 相关文档

- [Supabase RLS 文档](https://supabase.com/docs/guides/auth/row-level-security)
- [Markdown 语法](https://www.markdownguide.org/basic-syntax/)
- [PostgreSQL 数组](https://www.postgresql.org/docs/current/arrays.html)

---

## ✅ 功能检查清单

**数据库设置：**
- [ ] 已创建 projects 表
- [ ] 已设置 RLS 策略
- [ ] 已创建索引
- [ ] 已测试权限

**功能测试：**
- [ ] 可以创建项目
- [ ] 可以编辑项目
- [ ] 可以删除项目
- [ ] 可以切换公开状态
- [ ] 私密项目不显示在前台
- [ ] 公开项目正确显示

**用户体验：**
- [ ] 菜单高亮正确
- [ ] Toast 提示正常
- [ ] 加载状态显示
- [ ] 错误处理完善

---

**应用管理系统已完成！** 🎉

现在你可以通过后台管理项目，前台自动展示公开的项目了！

