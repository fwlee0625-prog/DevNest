'use client';

import Link from 'next/link';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
    >
      {/* 项目图片 */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {project.featured && (
          <div className="absolute right-2 top-2 rounded-full bg-black px-2 py-1 text-xs font-medium text-white dark:bg-white dark:text-black">
            推荐
          </div>
        )}
      </div>

      {/* 项目信息 */}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {project.category}
          </span>
          {project.framework && (
            <>
              <span className="text-gray-300 dark:text-gray-700">·</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {project.framework}
              </span>
            </>
          )}
        </div>

        <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-black dark:text-white dark:group-hover:text-gray-200">
          {project.name}
        </h3>

        <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {project.description}
        </p>

        {/* 技术栈标签 */}
        <div className="mt-3 flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

