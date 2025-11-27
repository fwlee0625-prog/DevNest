import { supabase } from './supabase';

/**
 * 文件上传工具类
 * 提供统一的文件上传接口，支持图片、文档等多种文件类型
 */
export class UploadService {
  /**
   * 上传文件到 Supabase Storage
   * @param file 要上传的文件
   * @param bucket Storage bucket 名称
   * @param folder 文件夹路径（可选）
   * @returns 上传后的公共 URL 或错误信息
   */
  static async uploadFile(
    file: File,
    bucket: string = 'avatars',
    folder: string = ''
  ): Promise<{ url: string | null; error: string | null }> {
    try {
      // 验证文件
      if (!file) {
        return { url: null, error: '请选择文件' };
      }

      // 生成唯一文件名
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExt = file.name.split('.').pop();
      const fileName = `${timestamp}_${randomString}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      // 上传文件
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return { url: null, error: uploadError.message };
      }

      // 获取公共 URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return { url: urlData.publicUrl, error: null };
    } catch (error: any) {
      console.error('Upload error:', error);
      return { url: null, error: error.message || '上传失败' };
    }
  }

  /**
   * 上传图片（带验证）
   * @param file 图片文件
   * @param bucket Storage bucket 名称
   * @param folder 文件夹路径
   * @param maxSizeMB 最大文件大小（MB）
   * @returns 上传后的公共 URL 或错误信息
   */
  static async uploadImage(
    file: File,
    bucket: string = 'avatars',
    folder: string = '',
    maxSizeMB: number = 5
  ): Promise<{ url: string | null; error: string | null }> {
    try {
      // 验证文件类型
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        return { url: null, error: '只支持 JPG、PNG、GIF、WebP 格式的图片' };
      }

      // 验证文件大小
      const maxSize = maxSizeMB * 1024 * 1024; // 转换为字节
      if (file.size > maxSize) {
        return { url: null, error: `图片大小不能超过 ${maxSizeMB}MB` };
      }

      // 上传文件
      return await this.uploadFile(file, bucket, folder);
    } catch (error: any) {
      console.error('Upload image error:', error);
      return { url: null, error: error.message || '上传失败' };
    }
  }

  /**
   * 删除文件
   * @param filePath 文件路径
   * @param bucket Storage bucket 名称
   * @returns 是否删除成功
   */
  static async deleteFile(
    filePath: string,
    bucket: string = 'avatars'
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase.storage.from(bucket).remove([filePath]);

      if (error) {
        console.error('Delete error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error: any) {
      console.error('Delete error:', error);
      return { success: false, error: error.message || '删除失败' };
    }
  }

  /**
   * 获取文件的公共 URL
   * @param filePath 文件路径
   * @param bucket Storage bucket 名称
   * @returns 公共 URL
   */
  static getPublicUrl(filePath: string, bucket: string = 'avatars'): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  }

  /**
   * 压缩图片（客户端压缩）
   * @param file 原始图片文件
   * @param maxWidth 最大宽度
   * @param maxHeight 最大高度
   * @param quality 压缩质量 (0-1)
   * @returns 压缩后的 File 对象
   */
  static async compressImage(
    file: File,
    maxWidth: number = 800,
    maxHeight: number = 800,
    quality: number = 0.8
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // 计算缩放比例
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                reject(new Error('压缩失败'));
              }
            },
            file.type,
            quality
          );
        };

        img.onerror = () => {
          reject(new Error('图片加载失败'));
        };
      };

      reader.onerror = () => {
        reject(new Error('文件读取失败'));
      };
    });
  }
}

