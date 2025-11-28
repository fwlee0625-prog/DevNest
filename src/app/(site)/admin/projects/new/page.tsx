'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { MarkdownEditor } from '@/components/ui/MarkdownEditor';
import { toast } from '@/lib/toast';
import { ProjectService } from '@/services/projectService';
import { CreateProjectInput } from '@/types/admin';

const categories = [
  'AI',
  'Starter',
  'Ecommerce',
  'SaaS',
  'Blog',
  'Portfolio',
  'Other',
];

export default function NewProjectPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<CreateProjectInput>({
    name: '',
    description: '',
    content: '# 项目标题\n\n## 简介\n\n项目描述...',
    image: '',
    category: 'Starter',
    tech_stack: [],
    framework: '',
    css: '',
    database: '',
    repo_url: '',
    demo_url: '',
    download_url: '',
    is_downloadable: false,
    is_public: false,
    featured: false,
  });
  const [techInput, setTechInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      toast.error('请填写必填项');
      return;
    }

    setIsSaving(true);
    const { data, error } = await ProjectService.createProject(formData);

    if (data) {
      toast.success('创建成功！');
      router.push('/admin/projects');
    } else {
      toast.error(error || '创建失败');
    }

    setIsSaving(false);
  };

  const handleAddTech = () => {
    if (techInput && !formData.tech_stack.includes(techInput)) {
      setFormData({
        ...formData,
        tech_stack: [...formData.tech_stack, techInput],
      });
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData({
      ...formData,
      tech_stack: formData.tech_stack.filter((t) => t !== tech),
    });
  };

  return (
    <div>
      {/* 头部 */}
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
          新建项目
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          填写项目信息并使用 Markdown 编写内容
        </p>
      </div>

      {/* 表单 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本信息 */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            基本信息
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                项目名称 *
              </label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="输入项目名称"
                required
                className="mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                简短描述 *
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="一句话描述项目"
                required
                rows={2}
                className="mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                项目图片 URL
              </label>
              <Input
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="https://example.com/image.png"
                className="mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                分类
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-gray-400 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white"
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

        {/* Markdown 内容 */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <MarkdownEditor
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            placeholder="使用 Markdown 格式编写项目详情..."
            label="项目详情"
            height={500}
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            支持 Markdown 语法：# 标题, **粗体**, *斜体*, [链接](url), 等
          </p>
        </div>

        {/* 技术栈 */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            技术栈
          </h2>
          <div className="flex gap-2">
            <Input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), handleAddTech())
              }
              placeholder="输入技术名称，按回车添加"
            />
            <Button type="button" onClick={handleAddTech} variant="outline">
              添加
            </Button>
          </div>
          {formData.tech_stack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {formData.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 链接信息 */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            链接信息
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                GitHub 仓库
              </label>
              <Input
                value={formData.repo_url}
                onChange={(e) =>
                  setFormData({ ...formData, repo_url: e.target.value })
                }
                placeholder="https://github.com/username/repo"
                className="mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                在线演示
              </label>
              <Input
                value={formData.demo_url}
                onChange={(e) =>
                  setFormData({ ...formData, demo_url: e.target.value })
                }
                placeholder="https://demo.example.com"
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* 设置 */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            项目设置
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_public}
                onChange={(e) =>
                  setFormData({ ...formData, is_public: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-900 dark:text-white">
                公开展示（勾选后将在项目列表中显示）
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-900 dark:text-white">
                设为推荐项目
              </span>
            </label>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            {isSaving ? '保存中...' : '创建项目'}
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
