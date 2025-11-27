/**
 * Toast 通知工具
 * 用于显示临时提示消息
 */

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  duration?: number; // 显示时长（毫秒）
  position?:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left';
}

const defaultOptions: Required<ToastOptions> = {
  duration: 3000,
  position: 'top-right',
};

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-left': 'bottom-4 left-4',
};

const typeStyles = {
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-800 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    icon: '✅',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-800 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    icon: '❌',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    text: 'text-yellow-800 dark:text-yellow-400',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: '⚠️',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-800 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'ℹ️',
  },
};

function showToast(
  message: string,
  type: ToastType = 'info',
  options?: ToastOptions
) {
  const opts = { ...defaultOptions, ...options };
  const style = typeStyles[type];

  // 创建 toast 元素
  const toast = document.createElement('div');
  toast.className = `
    fixed z-50 
    ${positionClasses[opts.position]}
    animate-in fade-in slide-in-from-top-2 duration-300
    rounded-lg border px-4 py-3 shadow-lg
    ${style.bg} ${style.text} ${style.border}
    max-w-md
  `
    .replace(/\s+/g, ' ')
    .trim();

  toast.innerHTML = `
    <div class="flex items-center gap-2">
      <span class="text-base">${style.icon}</span>
      <span class="text-sm font-medium">${message}</span>
    </div>
  `;

  // 添加到页面
  document.body.appendChild(toast);

  // 设置自动移除
  const timer = setTimeout(() => {
    toast.classList.add('animate-out', 'fade-out', 'slide-out-to-top-2');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }, opts.duration);

  // 点击关闭
  toast.addEventListener('click', () => {
    clearTimeout(timer);
    toast.classList.add('animate-out', 'fade-out', 'slide-out-to-top-2');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  });

  return toast;
}

export const toast = {
  success: (message: string, options?: ToastOptions) =>
    showToast(message, 'success', options),
  error: (message: string, options?: ToastOptions) =>
    showToast(message, 'error', options),
  warning: (message: string, options?: ToastOptions) =>
    showToast(message, 'warning', options),
  info: (message: string, options?: ToastOptions) =>
    showToast(message, 'info', options),
};
