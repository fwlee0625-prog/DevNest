'use client';

import { useState, useEffect } from 'react';
import { AuthService } from '@/services/authService';
import { User, AuthState } from '@/types/auth';

/**
 * 认证 Hook
 * 用于管理用户认证状态和提供认证相关方法
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // 初始化时获取当前用户
  useEffect(() => {
    const initAuth = async () => {
      const user = await AuthService.getCurrentUser();
      setAuthState({
        user,
        loading: false,
        error: null,
      });
    };

    initAuth();

    // 监听认证状态变化
    const { data: authListener } = AuthService.onAuthStateChange((user) => {
      setAuthState((prev) => ({
        ...prev,
        user,
        loading: false,
      }));
    });

    // 清理监听器
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  /**
   * 登录
   */
  const login = async (username: string, password: string) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    const { user, error } = await AuthService.login({ username, password });

    if (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error,
      }));
      return { success: false, error };
    }

    setAuthState({
      user,
      loading: false,
      error: null,
    });

    return { success: true, user };
  };

  /**
   * 登出
   */
  const logout = async () => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    const { error } = await AuthService.logout();

    if (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error,
      }));
      return { success: false, error };
    }

    setAuthState({
      user: null,
      loading: false,
      error: null,
    });

    return { success: true };
  };

  /**
   * 注册
   */
  const register = async (username: string, password: string, email?: string) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    const { user, error } = await AuthService.register({ username, password, email });

    if (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error,
      }));
      return { success: false, error };
    }

    setAuthState({
      user,
      loading: false,
      error: null,
    });

    return { success: true, user };
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    login,
    logout,
    register,
    isAuthenticated: !!authState.user,
  };
}

