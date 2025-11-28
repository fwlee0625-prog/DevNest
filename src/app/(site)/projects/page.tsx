'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectService } from '@/services/projectService';
import { Project } from '@/types/project';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载公开项目
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await ProjectService.getPublicProjects();
    // 转换数据格式
    const converted = data.map((p) => ({
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
    }));
    setProjects(converted);
    setLoading(false);
  };

  // 计算分类数量
  const projectCategories = [
    { id: 'all', name: '全部', count: projects.length },
    { id: 'ai', name: 'AI', count: projects.filter(p => p.category === 'AI').length },
    { id: 'starter', name: '启动模板', count: projects.filter(p => p.category === 'Starter').length },
    { id: 'ecommerce', name: '电商', count: projects.filter(p => p.category === 'Ecommerce').length },
    { id: 'saas', name: 'SaaS', count: projects.filter(p => p.category === 'SaaS').length },
    { id: 'blog', name: '博客', count: projects.filter(p => p.category === 'Blog').length },
    { id: 'portfolio', name: '作品集', count: projects.filter(p => p.category === 'Portfolio').length },
  ];

  // 过滤项目
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      project.category.toLowerCase() === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* 页面头部 */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              发现你的项目模板
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              使用预构建的解决方案快速启动应用开发
            </p>

            {/* 搜索框 */}
            <div className="mx-auto mt-8 max-w-2xl">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <Input
                  type="text"
                  placeholder="搜索项目..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 分类过滤 */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto py-4">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
                <span className="ml-2 opacity-60">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 项目列表 */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">加载中...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              没有找到匹配的项目
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

