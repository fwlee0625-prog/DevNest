import { supabase } from '@/lib/supabase';
import { AdminProject, CreateProjectInput, UpdateProjectInput } from '@/types/admin';

/**
 * 项目管理服务
 */
export class ProjectService {
  /**
   * 获取所有公开的项目
   */
  static async getPublicProjects(): Promise<AdminProject[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching public projects:', error);
      return [];
    }

    return data as AdminProject[];
  }

  /**
   * 获取当前用户的所有项目
   */
  static async getUserProjects(): Promise<AdminProject[]> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('author_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user projects:', error);
      return [];
    }

    return data as AdminProject[];
  }

  /**
   * 根据 ID 获取项目（管理员）
   */
  static async getProjectById(id: string): Promise<AdminProject | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching project:', error);
      return null;
    }

    return data as AdminProject;
  }

  /**
   * 根据 ID 获取公开项目（前台展示）
   */
  static async getPublicProjectById(id: string): Promise<AdminProject | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .eq('is_public', true)
      .single();

    if (error) {
      console.error('Error fetching public project:', error);
      return null;
    }

    return data as AdminProject;
  }

  /**
   * 创建新项目
   */
  static async createProject(input: CreateProjectInput): Promise<{ data: AdminProject | null; error: string | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { data: null, error: '用户未登录' };
      }

      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            ...input,
            author_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        return { data: null, error: error.message };
      }

      return { data: data as AdminProject, error: null };
    } catch (error: any) {
      console.error('Error creating project:', error);
      return { data: null, error: error.message || '创建失败' };
    }
  }

  /**
   * 更新项目
   */
  static async updateProject(input: UpdateProjectInput): Promise<{ data: AdminProject | null; error: string | null }> {
    try {
      const { id, ...updateData } = input;

      const { data, error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating project:', error);
        return { data: null, error: error.message };
      }

      return { data: data as AdminProject, error: null };
    } catch (error: any) {
      console.error('Error updating project:', error);
      return { data: null, error: error.message || '更新失败' };
    }
  }

  /**
   * 删除项目
   */
  static async deleteProject(id: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error: any) {
      console.error('Error deleting project:', error);
      return { success: false, error: error.message || '删除失败' };
    }
  }

  /**
   * 切换项目公开状态
   */
  static async togglePublic(id: string, isPublic: boolean): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ is_public: isPublic })
        .eq('id', id);

      if (error) {
        console.error('Error toggling public status:', error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error: any) {
      console.error('Error toggling public status:', error);
      return { success: false, error: error.message || '操作失败' };
    }
  }
}

