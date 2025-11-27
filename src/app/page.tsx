import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative flex w-full flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>
        <div className="group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
          <div className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span className="text-sm font-medium text-black dark:text-white">
              ✨ Introducing Vercel Style
            </span>
          </div>
        </div>
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
          Build the Web. <span className="text-blue-600">Faster.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
          A high-performance boilerplate for your Next.js projects. Packed with
          features, optimized for speed, and designed to scale.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button href="#" size="lg">
            Get Started
          </Button>
          <Button href="#" variant="ghost" size="lg" className="gap-1">
            Learn more <span aria-hidden="true">→</span>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            A complete toolkit to build your next big idea.
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
              <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
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
    description:
      'The latest features from Next.js, including App Router, Server Components, and more.',
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
    description:
      'Rapidly build modern websites without ever leaving your HTML.',
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
    description:
      'Static type checking for better code quality and developer experience.',
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
    description:
      'Built-in dark mode support for a better viewing experience in low light.',
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
    description:
      'Optimized for search engines with meta tags, sitemaps, and more.',
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
    description:
      'Looks great on all devices, from mobile phones to desktop computers.',
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
