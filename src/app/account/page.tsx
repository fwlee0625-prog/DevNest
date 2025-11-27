'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { UploadService } from '@/lib/upload';
import { toast } from '@/lib/toast';
import { SocialLinks } from '@/types/auth';

// 常用技术栈选项
const TECH_STACKS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Vue',
  'Angular',
  'Node.js',
  'Python',
  'Java',
  'Go',
  'Rust',
  'PHP',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'SQL',
  'MongoDB',
  'PostgreSQL',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'Firebase',
  'Supabase',
  'Git',
  'GraphQL',
  'REST API',
  'WebSocket',
  'Redis',
  'Nginx',
];

export default function AccountPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // 基本信息
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');

  // 技术栈
  const [skills, setSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');

  // 社交媒体
  const [social, setSocial] = useState<SocialLinks>({});

  // 密码
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 头像
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // UI 状态
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'profile' | 'skills' | 'social' | 'security'
  >('profile');

  // 加载用户信息
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setBio(user.bio || '');
      setWebsite(user.website || '');
      setLocation(user.location || '');
      setSkills(user.skills || []);
      setSocial(user.social || {});
      setAvatarUrl(
        user.avatar_url ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
      );
    }
  }, [user]);

  // 未登录则跳转到登录页
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // 上传头像
  const handleAvatarUpload = async (file: File) => {
    setIsUploadingAvatar(true);

    try {
      // 先压缩图片
      const compressedFile = await UploadService.compressImage(
        file,
        400,
        400,
        0.8
      );

      // 上传到 Supabase Storage
      const { url, error: uploadError } = await UploadService.uploadImage(
        compressedFile,
        'avatars',
        `user_${user?.id}`
      );

      if (uploadError || !url) {
        throw new Error(uploadError || '上传失败');
      }

      // 更新用户元数据
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: url },
      });

      if (updateError) throw updateError;

      setAvatarUrl(url);
      toast.success('头像上传成功！');
    } catch (err: any) {
      toast.error(err.message || '上传失败，请重试');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // 保存个人资料
  const handleSaveProfile = async () => {
    setIsSaving(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          username,
          bio,
          website,
          location,
          skills,
          social,
        },
      });

      if (updateError) throw updateError;

      toast.success('保存成功！');
    } catch (err: any) {
      toast.error(err.message || '保存失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  // 修改密码
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('请填写所有密码字段');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('两次输入的新密码不一致');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('新密码长度至少为 6 位');
      return;
    }

    setIsSaving(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      toast.success('密码修改成功！');
    } catch (err: any) {
      toast.error(err.message || '修改密码失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  // 添加技能
  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  // 删除技能
  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // 添加自定义技能
  const handleAddCustomSkill = () => {
    if (customSkill && !skills.includes(customSkill)) {
      setSkills([...skills, customSkill]);
      setCustomSkill('');
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">加载中...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <Link
            href="/"
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
            返回首页
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            账户设置
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            管理你的个人信息和账户安全
          </p>
        </div>

        {/* 标签页导航 */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-800">
          <nav className="flex gap-8">
            {[
              { id: 'profile', label: '个人资料' },
              { id: 'skills', label: '技术栈' },
              { id: 'social', label: '社交媒体' },
              { id: 'security', label: '安全设置' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`border-b-2 pb-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-black text-black dark:border-white dark:text-white'
                    : 'border-transparent text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* 个人资料标签 */}
        {activeTab === 'profile' && (
          <div className="space-y-8">
            {/* 头像上传 */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
              <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  头像
                </h2>
              </div>
              <div className="p-6">
                <ImageUpload
                  currentImage={avatarUrl}
                  onUpload={handleAvatarUpload}
                  isUploading={isUploadingAvatar}
                  label="个人头像"
                  description="支持 JPG、PNG、GIF、WebP，最大 5MB"
                />
              </div>
            </div>

            {/* 基本信息 */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
              <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  基本信息
                </h2>
              </div>
              <div className="space-y-6 p-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    用户名
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="输入用户名"
                    className="mt-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    邮箱
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="mt-2"
                  />
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    邮箱地址不可修改
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    个人简介
                  </label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="介绍一下你自己..."
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    个人网站
                  </label>
                  <Input
                    id="website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://example.com"
                    className="mt-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    所在地
                  </label>
                  <Input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="城市, 国家"
                    className="mt-2"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  >
                    {isSaving ? '保存中...' : '保存更改'}
                  </Button>
                  <Button
                    onClick={() => {
                      setUsername(user.username);
                      setBio(user.bio || '');
                      setWebsite(user.website || '');
                      setLocation(user.location || '');
                    }}
                    variant="outline"
                  >
                    取消
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 技术栈标签 */}
        {activeTab === 'skills' && (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                技术栈
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                选择你擅长的技术栈
              </p>
            </div>
            <div className="space-y-6 p-6">
              {/* 已选择的技能 */}
              {skills.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                    已选择 ({skills.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 rounded-full bg-black px-3 py-1 text-sm text-white dark:bg-white dark:text-black"
                      >
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:opacity-70"
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 可选技能 */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  常用技术
                </h3>
                <div className="flex flex-wrap gap-2">
                  {TECH_STACKS.filter((tech) => !skills.includes(tech)).map(
                    (tech) => (
                      <button
                        key={tech}
                        onClick={() => handleAddSkill(tech)}
                        className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        + {tech}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* 自定义技能 */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  添加自定义技术
                </h3>
                <div className="flex gap-2">
                  <Input
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && handleAddCustomSkill()
                    }
                    placeholder="输入技术名称"
                  />
                  <Button onClick={handleAddCustomSkill} variant="outline">
                    添加
                  </Button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  {isSaving ? '保存中...' : '保存更改'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 社交媒体标签 */}
        {activeTab === 'social' && (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                社交媒体账号
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                添加你的社交媒体链接
              </p>
            </div>
            <div className="space-y-6 p-6">
              {[
                {
                  key: 'github',
                  label: 'GitHub',
                  icon: '🐙',
                  placeholder: 'https://github.com/username',
                },
                {
                  key: 'twitter',
                  label: 'Twitter / X',
                  icon: '🐦',
                  placeholder: 'https://twitter.com/username',
                },
                {
                  key: 'linkedin',
                  label: 'LinkedIn',
                  icon: '💼',
                  placeholder: 'https://linkedin.com/in/username',
                },
                {
                  key: 'weibo',
                  label: '微博',
                  icon: '🔴',
                  placeholder: 'https://weibo.com/username',
                },
                {
                  key: 'bilibili',
                  label: 'B站',
                  icon: '📺',
                  placeholder: 'https://space.bilibili.com/xxx',
                },
                {
                  key: 'youtube',
                  label: 'YouTube',
                  icon: '▶️',
                  placeholder: 'https://youtube.com/@username',
                },
                {
                  key: 'instagram',
                  label: 'Instagram',
                  icon: '📷',
                  placeholder: 'https://instagram.com/username',
                },
                {
                  key: 'wechat',
                  label: '微信',
                  icon: '💬',
                  placeholder: '微信号',
                },
              ].map((platform) => (
                <div key={platform.key}>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    {platform.icon} {platform.label}
                  </label>
                  <Input
                    value={(social as any)[platform.key] || ''}
                    onChange={(e) =>
                      setSocial({ ...social, [platform.key]: e.target.value })
                    }
                    placeholder={platform.placeholder}
                    className="mt-2"
                  />
                </div>
              ))}

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  {isSaving ? '保存中...' : '保存更改'}
                </Button>
                <Button
                  onClick={() => {
                    setSocial(user.social || {});
                  }}
                  variant="outline"
                >
                  取消
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 安全设置标签 */}
        {activeTab === 'security' && (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                修改密码
              </h2>
            </div>
            <div className="space-y-6 p-6">
              <div>
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  当前密码
                </label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="输入当前密码"
                  className="mt-2"
                />
              </div>

              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  新密码
                </label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="输入新密码（至少 6 位）"
                  className="mt-2"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  确认新密码
                </label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="再次输入新密码"
                  className="mt-2"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleChangePassword}
                  disabled={isSaving}
                  className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  {isSaving ? '修改中...' : '修改密码'}
                </Button>
                <Button
                  onClick={() => {
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  variant="outline"
                >
                  清空
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
