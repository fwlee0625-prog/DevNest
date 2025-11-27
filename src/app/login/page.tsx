import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
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
            登录 Vercel
          </h2>
        </div>

        <form className="mt-8 space-y-6" action="#" method="POST">
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
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="密码"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              size="lg"
            >
              登录
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500 dark:bg-black">
                没有账号？
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              注册
            </Link>
          </div>
        </div>

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
