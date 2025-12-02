'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectService } from '@/services/projectService';
import { Project } from '@/types/project';

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProjects();
  }, []);

  const loadFeaturedProjects = async () => {
    setLoading(true);
    const data = await ProjectService.getPublicProjects();
    // 转换数据格式并筛选精选项目
    const converted = data
      .map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        image: p.image,
        category: p.category as any,
        techStack: p.tech_stack,
        framework: p.framework,
        css: p.css,
        database: p.database,
        repoUrl: p.repo_url,
        demoUrl: p.demo_url,
        downloadUrl: p.download_url,
        isDownloadable: p.is_downloadable,
        featured: p.featured,
        createdAt: p.created_at,
        author: 'Admin',
      }))
      .filter((p) => p.featured)
      .slice(0, 6); // 只显示前6个精选项目
    setFeaturedProjects(converted);
    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] [background-size:16px_16px] dark:bg-[#0a0a0a] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] dark:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
          <div className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span className="text-sm font-medium text-black dark:text-white">
              🚀 独立开发者工作室
            </span>
          </div>
        </div>

        <h1 className="mt-8 text-4xl font-bold tracking-tight text-black sm:text-6xl dark:text-white">
          用代码创造价值
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
          专注于打造高质量的产品和解决方案，分享技术经验与实践心得。
          在这里你可以找到我的项目作品、技术博客和个人思考。
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <Button href="/projects" size="lg">
            查看项目
          </Button>
          <Button href="/projects" variant="ghost" size="lg" className="gap-1">
            了解更多 <span aria-hidden="true">→</span>
          </Button>
        </div>
      </section>

      {/* 精选项目展示 */}
      {featuredProjects.length > 0 && (
        <section className="mx-auto w-full max-w-7xl bg-white px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#0a0a0a]">
          <div className="mb-12 text-center">
            <h2 className="text-base leading-7 font-semibold text-blue-600 dark:text-blue-400">
              精选项目
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              我的作品集
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              以下是一些我精心打造的项目，涵盖不同领域和技术栈
            </p>
          </div>

          {loading ? (
            <div className="py-12 text-center">
              <p className="text-gray-600 dark:text-gray-400">加载中...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button href="/projects" variant="outline" size="lg">
              查看所有项目
            </Button>
          </div>
        </section>
      )}

      {/* 个人简介/关于我 */}
      <section className="mx-auto w-full max-w-7xl bg-white px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#0a0a0a]">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm lg:p-12 dark:border-gray-800 dark:bg-[#0a0a0a]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                关于我
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                我是一名独立开发者，专注于 Web 应用开发和技术创新。
                热爱编程，享受从想法到产品的完整过程。
              </p>
              <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                在这个站点，我会分享我的项目作品、技术博客和开发经验。
                希望通过这些内容，能够帮助到其他开发者，同时也记录自己的成长历程。
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button href="/projects" variant="outline" size="sm">
                  查看项目
                </Button>
                <Button href="#" variant="outline" size="sm">
                  联系我
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  技术栈
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  React · Next.js · TypeScript · Node.js · Tailwind CSS
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  关注领域
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Web 开发 · 全栈应用 · 产品设计 · 技术分享
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 博客预览（预留） */}
      <section className="mx-auto w-full max-w-7xl bg-white px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#0a0a0a]">
        <div className="mb-12 text-center">
          <h2 className="text-base leading-7 font-semibold text-blue-600 dark:text-blue-400">
            最新文章
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            技术博客
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            分享开发经验、技术思考和最佳实践
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-[#0a0a0a]">
          <div className="py-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              博客功能即将上线，敬请期待...
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-7xl bg-white px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#0a0a0a]">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-8 text-center lg:p-12 dark:border-gray-800 dark:from-[#0a0a0a] dark:to-[#141414]">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            有项目想法？
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
            欢迎与我交流，一起探讨技术，创造价值
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="#" size="lg">
              联系我
            </Button>
            <Button href="/projects" variant="outline" size="lg">
              查看项目
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
