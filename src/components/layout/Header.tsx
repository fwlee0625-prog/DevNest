'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { UserMenu } from '@/components/ui/UserMenu';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/lib/toast';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 判断链接是否激活
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // 清除本地存储
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.clear();

      // 执行登出
      const result = await logout();

      if (result.success) {
        // 显示成功提示
        toast.success('已成功退出登录');

        // 延迟跳转，让用户看到提示
        setTimeout(() => {
          router.push('/');
        }, 500);
      } else {
        // 显示错误提示
        toast.error(result.error || '退出登录失败，请重试');
      }
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error('退出登录时发生错误');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-all dark:bg-black/80 ${
        isScrolled ? 'border-b border-gray-200 dark:border-gray-800' : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6 fill-black dark:fill-white"
            >
              <path d="M12 2L2 19.7778H22L12 2Z" />
            </svg>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Vercel Style
            </span>
          </Link>
          {/* 只在登录后显示导航链接 */}

          <nav className="hidden md:block">
            <ul className="flex items-center gap-2">
              <li>
                <Link
                  href="/projects"
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive('/projects')
                      ? 'bg-gray-100 text-black dark:bg-gray-800 dark:text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white'
                  }`}
                >
                  项目
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link
                    href="/admin/projects"
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      isActive('/admin')
                        ? 'bg-gray-100 text-black dark:bg-gray-800 dark:text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white'
                    }`}
                  >
                    应用管理
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button href="#" variant="outline" size="sm">
            联系我们
          </Button>

          {/* 根据登录状态显示不同的按钮 */}
          {isAuthenticated && user ? (
            <UserMenu
              user={user}
              onLogout={handleLogout}
              isLoggingOut={isLoggingOut}
            />
          ) : (
            <Button href="/login" size="sm">
              登录
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
