import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative flex w-full flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] [background-size:16px_16px] dark:bg-black dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>
        <div className="group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
          <div className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span className="text-sm font-medium text-black dark:text-white">
              ✨ 引入 Vercel 风格
            </span>
          </div>
        </div>
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-black sm:text-6xl dark:text-white">
          更快地构建 Web。
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
          一个基于 Next.js 的项目模板，为你的下一个项目提供一个快速的开始。
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button href="#" size="lg">
            开始使用
          </Button>
          <Button href="#" variant="ghost" size="lg" className="gap-1">
            了解更多 <span aria-hidden="true">→</span>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-base leading-7 font-semibold text-blue-600">
            功能
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            你需要的一切
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            一个完整的工具包，助您实现下一个伟大创意。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-neutral-900/50"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <feature.icon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg leading-8 font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: 'Next.js 15',
    description: 'Next.js 的最新功能，包括 App Router、Server Components 等。',
    icon: (props: any) => (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
        />
      </svg>
    ),
  },
  {
    title: 'Tailwind CSS',
    description: '无需离开 HTML 即可快速构建现代网站。',
    icon: (props: any) => (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.048 4.388a10.502 10.502 0 01-1.132-5.952 5.952 5.952 0 011.132-1.132 10.5 10.5 0 011.132 5.952c0 2.226.425 4.34 1.132 5.952M12 20.25v-6m0 0a9.333 9.333 0 01-3.388-1.62m3.388 1.62a15.998 15.998 0 013.388 1.62m-6.776 0a9.333 9.333 0 01-3.388-1.62m0 0a15.998 15.998 0 013.388 1.62"
        />
      </svg>
    ),
  },
  {
    title: 'TypeScript',
    description: '静态类型检查，提升代码质量和开发体验。',
    icon: (props: any) => (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 18"
        />
      </svg>
    ),
  },
  {
    title: 'Dark Mode',
    description: '内置暗黑模式支持，在弱光环境下提供更好的观看体验。',
    icon: (props: any) => (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    ),
  },
  {
    title: 'SEO Optimized',
    description: '通过元标签、站点地图等进行搜索引擎优化。',
    icon: (props: any) => (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    ),
  },
  {
    title: 'Responsive Design',
    description: '在所有设备上都表现出色，从手机到台式电脑。',
    icon: (props: any) => (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0024 20.25v-4.125a2.25 2.25 0 00-2.25-2.25h-2.25M10.5 1.5V9a2.25 2.25 0 002.25 2.25h1.5M10.5 1.5l5.625 5.625 1.5 1.5M19.875 12.75H24M19.875 12.75a2.25 2.25 0 012.25 2.25v4.125a2.25 2.25 0 01-2.25 2.25h-4.125a2.25 2.25 0 01-2.25-2.25v-4.125a2.25 2.25 0 012.25-2.25h.375M12 12h.008v.008H12V12zm0 4.5h.008v.008H12v-.008zm0 4.5h.008v.008H12v-.008zM15 16.5h.008v.008H15v-.008zm0 4.5h.008v.008H15v-.008z"
        />
      </svg>
    ),
  },
];
