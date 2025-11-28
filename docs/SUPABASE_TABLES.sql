-- ============================================
-- 应用管理系统 - Supabase 数据库表结构
-- ============================================

-- 1. 创建项目表
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT, -- Markdown 内容
  image VARCHAR(500),
  category VARCHAR(50),
  tech_stack TEXT[], -- 技术栈数组
  framework VARCHAR(100),
  css VARCHAR(100),
  database VARCHAR(100),
  repo_url VARCHAR(500),
  demo_url VARCHAR(500),
  download_url VARCHAR(500),
  is_downloadable BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT false, -- 是否公开
  featured BOOLEAN DEFAULT false,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 3. 启用 Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 4. 创建 RLS 策略

-- 允许所有人查看公开的项目
CREATE POLICY "Allow public to view public projects"
  ON projects FOR SELECT
  USING (is_public = true);

-- 允许已登录用户查看自己的所有项目
CREATE POLICY "Allow users to view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = author_id);

-- 允许已登录用户创建项目
CREATE POLICY "Allow authenticated users to create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- 允许用户更新自己的项目
CREATE POLICY "Allow users to update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- 允许用户删除自己的项目
CREATE POLICY "Allow users to delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = author_id);

-- 5. 创建索引以提高查询性能
CREATE INDEX idx_projects_author_id ON projects(author_id);
CREATE INDEX idx_projects_is_public ON projects(is_public);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- 6. 插入示例数据（可选）
-- 注意：需要替换 'your-user-id' 为实际的用户 ID
/*
INSERT INTO projects (
  name, description, content, image, category, tech_stack, 
  framework, css, repo_url, demo_url, is_public, featured, author_id
) VALUES (
  'Next.js Boilerplate',
  '使用 Next.js 和 React 快速开始开发',
  '# Next.js Boilerplate\n\n完整的开发环境配置...',
  'https://example.com/image.png',
  'Starter',
  ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  'Next.js',
  'Tailwind CSS',
  'https://github.com/vercel/next.js',
  'https://nextjs-boilerplate.vercel.app',
  true,
  true,
  'your-user-id'::uuid
);
*/

-- ============================================
-- 查询示例
-- ============================================

-- 查询所有公开的项目
-- SELECT * FROM projects WHERE is_public = true ORDER BY created_at DESC;

-- 查询当前用户的所有项目
-- SELECT * FROM projects WHERE author_id = auth.uid() ORDER BY created_at DESC;

-- 查询某个分类的公开项目
-- SELECT * FROM projects WHERE is_public = true AND category = 'AI' ORDER BY created_at DESC;

-- 更新项目状态
-- UPDATE projects SET is_public = true WHERE id = 'project-id';

-- 删除项目
-- DELETE FROM projects WHERE id = 'project-id' AND author_id = auth.uid();

