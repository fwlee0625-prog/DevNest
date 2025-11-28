'use client';

import { useState, useRef } from 'react';
import { Button } from '../Button';

interface ImageUploadProps {
  currentImage?: string;
  onUpload: (file: File) => Promise<void>;
  onRemove?: () => void;
  isUploading?: boolean;
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  description?: string;
}

export function ImageUpload({
  currentImage,
  onUpload,
  onRemove,
  isUploading = false,
  accept = 'image/jpeg,image/jpg,image/png,image/gif,image/webp',
  maxSizeMB = 5,
  label = '上传图片',
  description = '支持 JPG、PNG、GIF、WebP，最大 5MB',
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 验证文件大小
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`文件大小不能超过 ${maxSizeMB}MB`);
      return;
    }

    // 创建预览
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // 上传文件
    await onUpload(file);
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onRemove?.();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-6">
        {/* 图片预览 */}
        {preview && (
          <div className="relative h-24 w-24 overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700">
            <img
              src={preview}
              alt="预览"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* 上传按钮 */}
        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          
          <div className="flex gap-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              variant="outline"
              size="sm"
            >
              {isUploading ? '上传中...' : preview ? '更换图片' : '选择图片'}
            </Button>

            {preview && (
              <Button
                onClick={handleRemove}
                disabled={isUploading}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 dark:text-red-400"
              >
                删除
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

