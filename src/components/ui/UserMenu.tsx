'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User } from '@/types/auth';
import { ConfirmDialog } from './ConfirmDialog';

interface UserMenuProps {
  user: User;
  onLogout: () => void;
  isLoggingOut?: boolean;
}

export function UserMenu({
  user,
  onLogout,
  isLoggingOut = false,
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 获取用户头像（使用 DiceBear Avatars API）
  const avatarUrl =
    user.avatar_url ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`;

  return (
    <div className="relative" ref={menuRef}>
      {/* 用户头像按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full transition-opacity hover:opacity-80 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none dark:focus:ring-gray-600"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <img
            src={avatarUrl}
            alt={user.username}
            className="h-full w-full object-cover"
          />
        </div>
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="ring-opacity-5 absolute right-0 mt-2 w-56 origin-top-right rounded-lg border border-gray-200 bg-white shadow-lg ring-black focus:outline-none dark:border-gray-700 dark:bg-gray-900">
          <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <img
                  src={avatarUrl}
                  alt={user.username}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {user.username}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="py-1">
            <Link
              href="/account"
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              账户设置
            </Link>

            <button
              onClick={() => {
                setIsOpen(false);
                setShowLogoutDialog(true);
              }}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              {isLoggingOut ? '退出中...' : '退出登录'}
            </button>
          </div>
        </div>
      )}

      {/* 退出登录确认对话框 */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={onLogout}
        title="确认退出登录"
        message="你确定要退出登录吗？退出后需要重新登录才能访问账户功能。"
        confirmText="退出登录"
        cancelText="取消"
        variant="warning"
      />
    </div>
  );
}
