'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const menuItems = [
  {
    id: 'projects',
    name: '项目管理',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    children: [
      { id: 'project-list', name: '项目列表', href: '/admin/projects' },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  // 权限检查：只有登录用户可以访问
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">加载中...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* 左侧菜单 */}
      <aside className="w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
        <div className="flex h-full flex-col">
          {/* 头部 */}
          <div className="border-b border-gray-200 p-6 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              应用管理
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              管理你的项目和内容
            </p>
          </div>

          {/* 菜单列表 */}
          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => (
              <div key={item.id}>
                {/* 菜单分组标题 */}
                <div className="mb-2 flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {item.icon}
                  <span>{item.name}</span>
                </div>

                {/* 子菜单 */}
                {item.children && (
                  <div className="space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          pathname === child.href
                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white'
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 底部 */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-800">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              返回首页
            </Link>
          </div>
        </div>
      </aside>

      {/* 右侧内容区 */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-8">{children}</div>
      </main>
    </div>
  );
}

