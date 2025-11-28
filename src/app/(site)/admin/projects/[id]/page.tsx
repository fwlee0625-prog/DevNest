'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { MarkdownEditor } from '@/components/ui/MarkdownEditor';
import { toast } from '@/lib/toast';
import { ProjectService } from '@/services/projectService';
import { AdminProject, UpdateProjectInput } from '@/types/admin';

const categories = [
  'AI',
  'Starter',
  'Ecommerce',
  'SaaS',
  'Blog',
  'Portfolio',
  'Other',
];

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [project, setProject] = useState<AdminProject | null>(null);
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    const data = await ProjectService.getProjectById(projectId);
    if (data) {
      setProject(data);
    } else {
      toast.error('项目不存在');
      router.push('/admin/projects');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    setIsSaving(true);
    const { data, error } = await ProjectService.updateProject({
      id: project.id,
      name: project.name,
      description: project.description,
      content: project.content,
      image: project.image,
      category: project.category,
      tech_stack: project.tech_stack,
      framework: project.framework,
      css: project.css,
      database: project.database,
      repo_url: project.repo_url,
      demo_url: project.demo_url,
      download_url: project.download_url,
      is_downloadable: project.is_downloadable,
      is_public: project.is_public,
      featured: project.featured,
    });

    if (data) {
      toast.success('保存成功！');
      router.push('/admin/projects');
    } else {
      toast.error(error || '保存失败');
    }

    setIsSaving(false);
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-600 dark:text-gray-400">
        加载中...
      </div>
    );
  }

  if (!project) {
    return null;
  }

  const handleAddTech = () => {
    if (techInput && !project.tech_stack.includes(techInput)) {
      setProject({
        ...project,
        tech_stack: [...project.tech_stack, techInput],
      });
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setProject({
      ...project,
      tech_stack: project.tech_stack.filter((t) => t !== tech),
    });
  };

  return (
    <div>
      <div className="mb-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
          size="sm"
          className="mb-4"
        >
          ← 返回
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          编辑项目
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold">基本信息</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">项目名称 *</label>
              <Input
                value={project.name}
                onChange={(e) =>
                  setProject({ ...project, name: e.target.value })
                }
                required
                className="mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">简短描述 *</label>
              <Textarea
                value={project.description}
                onChange={(e) =>
                  setProject({ ...project, description: e.target.value })
                }
                required
                rows={2}
                className="mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">项目图片 URL</label>
              <Input
                value={project.image}
                onChange={(e) =>
                  setProject({ ...project, image: e.target.value })
                }
                className="mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">分类</label>
              <select
                value={project.category}
                onChange={(e) =>
                  setProject({ ...project, category: e.target.value })
                }
                className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm dark:border-gray-800 dark:bg-gray-900"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <MarkdownEditor
            value={project.content}
            onChange={(value) => setProject({ ...project, content: value })}
            placeholder="使用 Markdown 格式编写项目详情..."
            label="项目详情"
            height={500}
          />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold">技术栈</h2>
          <div className="flex gap-2">
            <Input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), handleAddTech())
              }
              placeholder="输入技术名称"
            />
            <Button
              type="button"
              className="w-20"
              onClick={handleAddTech}
              variant="outline"
            >
              添加
            </Button>
          </div>
          {project.tech_stack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800"
                >
                  {tech}
                  <button type="button" onClick={() => handleRemoveTech(tech)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold">链接信息</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">GitHub 仓库</label>
              <Input
                value={project.repo_url || ''}
                onChange={(e) =>
                  setProject({ ...project, repo_url: e.target.value })
                }
                placeholder="https://github.com/username/repo"
                className="mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">在线演示</label>
              <Input
                value={project.demo_url || ''}
                onChange={(e) =>
                  setProject({ ...project, demo_url: e.target.value })
                }
                placeholder="https://demo.example.com"
                className="mt-2"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold">项目设置</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={project.is_public}
                onChange={(e) =>
                  setProject({ ...project, is_public: e.target.checked })
                }
                className="h-4 w-4 rounded"
              />
              <span className="text-sm">公开展示</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={project.featured}
                onChange={(e) =>
                  setProject({ ...project, featured: e.target.checked })
                }
                className="h-4 w-4 rounded"
              />
              <span className="text-sm">推荐项目</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-black text-white dark:bg-white dark:text-black"
          >
            {isSaving ? '保存中...' : '保存更改'}
          </Button>
          <Button
            type="button"
            onClick={() => router.back()}
            variant="outline"
            disabled={isSaving}
          >
            取消
          </Button>
        </div>
      </form>
    </div>
  );
}
