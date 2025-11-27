// 用户类型定义
export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  bio?: string; // 个人简介
  website?: string; // 个人网站
  location?: string; // 所在地
  skills?: string[]; // 技术栈
  social?: SocialLinks; // 社交媒体
  created_at?: string;
}

// 社交媒体链接
export interface SocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
  weibo?: string;
  wechat?: string;
  bilibili?: string;
  youtube?: string;
  instagram?: string;
}

// 登录凭证
export interface LoginCredentials {
  username: string;
  password: string;
}

// 认证状态
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
