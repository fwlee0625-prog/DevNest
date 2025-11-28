'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MarkdownViewer } from '@/components/ui/MarkdownViewer';
import { ProjectService } from '@/services/projectService';
import { toast } from '@/lib/toast';
import { Project } from '@/types/project';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // 加载项目详情
  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      setNotFound(false);

      const data = await ProjectService.getPublicProjectById(projectId);

      if (data) {
        // 转换数据格式
        const converted: Project = {
          id: data.id,
          name: data.name,
          description: data.description,
          content: data.content,
          image: data.image,
          category: data.category as any,
          techStack: data.tech_stack,
          framework: data.framework,
          css: data.css,
          database: data.database,
          repoUrl: data.repo_url,
          demoUrl: data.demo_url,
          downloadUrl: data.download_url,
          isDownloadable: data.is_downloadable,
          featured: data.featured,
          createdAt: data.created_at,
        };
        setProject(converted);
      } else {
        setNotFound(true);
      }

      setLoading(false);
    };

    loadProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            项目未找到
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            您访问的项目不存在
          </p>
          <Button
            onClick={() => router.push('/projects')}
            className="mt-4 bg-black text-white dark:bg-white dark:text-black"
          >
            返回项目列表
          </Button>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    if (project.downloadUrl) {
      window.open(project.downloadUrl, '_blank');
      toast.success('开始下载...');
    } else {
      toast.info('该项目暂不支持下载');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* 返回按钮 */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              className="h-4 w-4"
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
            返回项目列表
          </Link>
        </div>
      </div>

      {/* 项目头部 */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="rounded-full bg-black px-3 py-1 text-sm font-medium text-white dark:bg-white dark:text-black">
                    推荐
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                {project.name}
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
            </div>

            <div className="flex gap-3">
              {project.demoUrl && (
                <Button
                  onClick={() => window.open(project.demoUrl, '_blank')}
                  variant="outline"
                >
                  查看演示
                </Button>
              )}
              {project.isDownloadable && (
                <Button
                  onClick={handleDownload}
                  className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  下载资源
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 项目内容 */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* 主内容区 */}
          <div className="lg:col-span-2">
            {/* 项目主图 */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
              <img
                src={project.image}
                alt={project.name}
                className="h-[400px] w-full object-cover"
              />
            </div>

            {/* 项目详情内容 */}
            {project.content && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  项目详情
                </h2>
                <MarkdownViewer content={project.content} className="mt-4" />
              </div>
            )}
          </div>

          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* 技术栈 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  技术栈
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 项目信息 */}
              {(project.framework || project.css || project.database) && (
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    项目信息
                  </h3>
                  <dl className="mt-4 space-y-4">
                    {project.framework && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          框架
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {project.framework}
                        </dd>
                      </div>
                    )}
                    {project.css && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          CSS
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {project.css}
                        </dd>
                      </div>
                    )}
                    {project.database && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          数据库
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {project.database}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              {/* 链接 */}
              {(project.repoUrl || project.demoUrl) && (
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    相关链接
                  </h3>
                  <div className="mt-4 space-y-3">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub 仓库
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
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
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        在线演示
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
