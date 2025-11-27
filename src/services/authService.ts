import { supabase } from '@/lib/supabase';
import { LoginCredentials, User } from '@/types/auth';

/**
 * 认证服务类
 * 处理所有与用户认证相关的操作
 */
export class AuthService {
  /**
   * 用户登录
   * @param credentials 登录凭证（用户名和密码）
   * @returns 用户信息或错误
   */
  static async login(credentials: LoginCredentials) {
    try {
      // 由于 Supabase 默认使用邮箱登录，我们将用户名映射为邮箱格式
      // 实际项目中，你需要在数据库中存储用户名和邮箱的映射关系
      const email = `${credentials.username}@local.app`;

      // 调试日志
      console.log('[AuthService] 尝试登录:', { username: credentials.username, email });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: credentials.password,
      });

      if (error) {
        console.error('[AuthService] 登录失败:', error);
        throw error;
      }

      if (data.user) {
        // 获取用户完整信息（包括自定义字段）
        const user: User = {
          id: data.user.id,
          email: data.user.email || '',
          username: data.user.user_metadata?.username || credentials.username,
          avatar_url: data.user.user_metadata?.avatar_url,
          bio: data.user.user_metadata?.bio,
          website: data.user.user_metadata?.website,
          location: data.user.user_metadata?.location,
          skills: data.user.user_metadata?.skills,
          social: data.user.user_metadata?.social,
        };
        console.log('[AuthService] 登录成功:', { userId: user.id, username: user.username });
        return { user, error: null };
      }

      return { user: null, error: new Error('登录失败') };
    } catch (error: any) {
      console.error('[AuthService] Login error:', error);
      return {
        user: null,
        error: error.message || '登录失败，请检查用户名和密码',
      };
    }
  }

  /**
   * 用户注册
   * @param credentials 注册凭证
   * @returns 用户信息或错误
   */
  static async register(credentials: LoginCredentials & { email?: string }) {
    try {
      const email = credentials.email || `${credentials.username}@local.app`;

      const { data, error } = await supabase.auth.signUp({
        email,
        password: credentials.password,
        options: {
          data: {
            username: credentials.username,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.username}`,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || '',
          username: credentials.username,
          avatar_url: data.user.user_metadata?.avatar_url,
          bio: data.user.user_metadata?.bio,
          website: data.user.user_metadata?.website,
          location: data.user.user_metadata?.location,
          skills: data.user.user_metadata?.skills,
          social: data.user.user_metadata?.social,
        };
        return { user, error: null };
      }

      return { user: null, error: new Error('注册失败') };
    } catch (error: any) {
      console.error('Register error:', error);
      return {
        user: null,
        error: error.message || '注册失败',
      };
    }
  }

  /**
   * 用户登出
   */
  static async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Logout error:', error);
      return { error: error.message || '登出失败' };
    }
  }

  /**
   * 获取当前用户
   * @returns 当前登录的用户信息
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        return {
          id: user.id,
          email: user.email || '',
          username: user.user_metadata?.username || user.email?.split('@')[0] || '',
          avatar_url: user.user_metadata?.avatar_url,
          bio: user.user_metadata?.bio,
          website: user.user_metadata?.website,
          location: user.user_metadata?.location,
          skills: user.user_metadata?.skills,
          social: user.user_metadata?.social,
        };
      }

      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  /**
   * 获取当前会话
   */
  static async getSession() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      return session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  }

  /**
   * 监听认证状态变化
   * @param callback 状态变化回调函数
   */
  static onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email || '',
          username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || '',
          avatar_url: session.user.user_metadata?.avatar_url,
          bio: session.user.user_metadata?.bio,
          website: session.user.user_metadata?.website,
          location: session.user.user_metadata?.location,
          skills: session.user.user_metadata?.skills,
          social: session.user.user_metadata?.social,
        };
        callback(user);
      } else {
        callback(null);
      }
    });
  }
}

