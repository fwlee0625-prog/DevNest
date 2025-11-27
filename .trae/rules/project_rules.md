1. 目录结构及作用

```md
.
├── src/ # 源代码根目录（可选但推荐）
│ ├── app/ # 🚀 路由核心：文件系统即路由（必需）
│ │ ├── layout.tsx # 根布局（包裹所有路由）
│ │ ├── page.tsx # 首页路由（对应 "/"）
│ │ └── ... # 其他路由文件夹（如 blog、api 等）
│ │
│ ├── components/ # 🧩 可复用 UI 组件（按功能/路由拆分）
│ │ ├── ui/ # 基础组件（按钮、卡片等）
│ │ └── marketing/ # 营销页面专用组件
│ │
│ ├── lib/ # ⚙️ 业务逻辑工具（非 UI 功能）
│ │ ├── api.ts # 数据请求封装
│ │ └── utils.ts # 通用工具函数
│ │
│ ├── utils/ # 🛠️ 项目级工具（类型守卫、格式化等）
│ ├── hooks/ # 🎣 自定义 React Hooks
│ ├── types/ # 📦 TypeScript 类型定义
│ ├── services/ # 🌐 API 服务层（如 authService.ts）
│ ├── constants/ # 🔒 静态常量（如 API_ENDPOINTS）
│ └── styles/ # 🎨 全局样式（Tailwind 配置等）
│
├── public/ # 🖼️ 静态资源（图片、字体等）
├── next.config.ts # ⚙️ Next.js 配置
├── package.json # 📦 依赖管理
├── tsconfig.json # 🛠️ TypeScript 配置
└── ... # 其他配置文件（.env, eslint 等）
```
