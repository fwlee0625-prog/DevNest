// 管理后台类型定义

export interface AdminProject {
  id: string;
  name: string;
  description: string;
  content: string; // Markdown 内容
  image: string;
  category: string;
  tech_stack: string[];
  framework?: string;
  css?: string;
  database?: string;
  repo_url?: string;
  demo_url?: string;
  download_url?: string;
  is_downloadable: boolean;
  is_public: boolean; // 是否公开
  featured: boolean;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectInput {
  name: string;
  description: string;
  content: string;
  image: string;
  category: string;
  tech_stack: string[];
  framework?: string;
  css?: string;
  database?: string;
  repo_url?: string;
  demo_url?: string;
  download_url?: string;
  is_downloadable: boolean;
  is_public: boolean;
  featured: boolean;
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: string;
}

