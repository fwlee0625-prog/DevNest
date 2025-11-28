// 项目类型定义

export interface Project {
  id: string;
  name: string;
  description: string;
  content?: string; // Markdown 内容
  image: string;
  category: 'AI' | 'Starter' | 'Ecommerce' | 'SaaS' | 'Blog' | 'Portfolio' | 'Other';
  techStack: string[];
  framework?: string;
  css?: string;
  database?: string;
  repoUrl?: string;
  demoUrl?: string;
  downloadUrl?: string;
  isDownloadable?: boolean;
  featured?: boolean;
  createdAt: string;
  author?: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  count: number;
}

export interface ProjectFilter {
  category?: string;
  framework?: string;
  search?: string;
}

