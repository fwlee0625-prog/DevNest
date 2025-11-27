'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/lib/toast';

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }

    const result = await login(username, password);

    if (result.success) {
      // 显示成功提示
      toast.success('登录成功！');

      // 登录成功，延迟跳转
      setTimeout(() => {
        router.push('/');
      }, 500);
    } else {
      setError(result.error || '登录失败，请检查用户名和密码');
      toast.error('登录失败，请检查用户名和密码');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8 dark:bg-black">
      {/* Top Left Logo */}
      <div className="absolute top-8 left-8">
        <Link href="/">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-8 w-8 fill-black dark:fill-white"
          >
            <path d="M12 2L2 19.7778H22L12 2Z" />
          </svg>
        </Link>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            登录
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* 错误提示 */}
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">
                用户名
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder="用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                密码
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* 提示信息 */}
          {/* <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            测试账号：admin / admin123
          </div> */}

          <div>
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              size="lg"
              disabled={loading}
            >
              {loading ? '登录中...' : '登录'}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          <Link href="#" className="hover:underline">
            条款
          </Link>
          <span className="mx-2">·</span>
          <Link href="#" className="hover:underline">
            隐私政策
          </Link>
        </div>
      </div>
    </div>
  );
}
