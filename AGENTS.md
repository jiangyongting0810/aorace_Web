# AGENTS.md

禁止批量删除文件或目录。

不要使用：

- `del /s`
- `rd /s`
- `rmdir /s`
- `Remove-Item -Recurse`
- `rm -rf`

需要删除文件时，只能一次删除一个明确路径的文件。

正确示例：

```powershell
Remove-Item "C:\path\to\file.txt"
```

如果需要批量删除文件，应停止操作，并向用户请求，让用户手动删除。

---

# FishWeb 项目说明

FishWeb 是一个鱼具独立站前端项目，品牌名目前是 Aorace / TideForge。项目已经从早期单文件原型重构为 React + Vite 工程，包含首页、鱼竿集合页、鱼轮集合页、商品详情页、文章详情页、购物车抽屉、结账弹窗、搜索浮层、Cookie 面板和多语言内容。

## 当前技术栈

- Vite 8
- React 19
- React Router DOM 7
- Vitest
- Testing Library
- jsdom
- Node.js 原生 HTTP 服务
- Netlify Functions

## 常用命令

```powershell
npm run dev
npm run api
npm run build
npm run preview
npm run test
```

说明：

- `npm run dev` 默认启动 Vite，地址 `http://127.0.0.1:5173`。
- Vite 会把 `/api` 代理到 `http://127.0.0.1:4173`。
- `npm run api` 启动本地订单接口服务。
- `npm run build` 输出到 `dist/`。
- `npm run test` 运行 Vitest。

## 关键结构

- `src/main.jsx`：前端入口。
- `src/App.jsx`：应用装配、全局状态、路由、购物车入口、搜索和结账入口。
- `src/router.jsx`：根据运行时配置选择 `BrowserRouter` 或 `HashRouter`。
- `src/config/runtime.js`：API 地址和路由模式配置。
- `src/pages/`：页面组件。
- `src/components/`：通用 UI 组件。
- `src/features/collections/useCollectionFilters.js`：集合页筛选、排序、价格区间等业务 hook。
- `src/hooks/useLocalStorageState.js`：localStorage 状态封装。
- `src/services/orders.js`：前端订单提交服务。
- `src/data/content.js`：中英文文案、商品、分类、文章和评价数据。
- `src/test/setup.js`：测试环境初始化。
- `src/App.test.jsx`：核心前端测试。
- `server.js`：本地静态预览和 `POST /api/orders`。
- `shared/orders.js`：本地 API 和 Netlify Functions 共用的订单校验与生成逻辑。
- `netlify/functions/orders.js`：Netlify 订单函数。

## 当前实现状态

- 页面路由已经使用 `React.lazy()` 和 `Suspense` 做页面级懒加载。
- Header 吸顶滚动逻辑会在滚动/resize 时重新查找当前页面 hero，并在 lazy 页面首屏渲染后补一次 RAF 检查，避免首次进入页面向下滚动时 header 不跟随。
- 应用根部已经包裹 `ErrorBoundary`，避免单个组件异常直接导致整页白屏。
- Header 的移动端菜单状态保留在 `Header.jsx` 内部，避免污染根组件状态。
- 结账成功结果状态保留在 `CheckoutModal.jsx` 内部。
- 集合页筛选、排序、价格区间逻辑已抽到 `src/features/collections/useCollectionFilters.js`。
- `ReelsFAQ` 和 `ReelsSEOContent` 已加 `React.memo`，并对列表数据做了空值兜底。
- 首页热卖区仍只展示前 4 个商品，保持桌面端单行四列。
- 搜索仍偏本地展示型，没有完整搜索结果页。
- 真实支付、账户、邮箱订阅、订单后台和 CMS 尚未接入。

## 订单逻辑

前端统一调用：

```text
POST /api/orders
```

本地开发由 `server.js` 处理，成功订单追加到 `orders.json`。Netlify 部署由 `netlify/functions/orders.js` 处理。共享校验逻辑在 `shared/orders.js`。

当前基础校验：

- `order` 必须是对象
- 必须有 `customer.email`
- 必须有 `customer.name`
- `items` 必须是非空数组

订单号格式：

```text
TF-时间戳
```

订单状态：

```text
paid_pending_fulfillment
```

## 持久化状态

以下 key 会写入 `localStorage`：

- `tideforge-lang`
- `tideforge-cart`
- `tideforge-cookie-consent`

购物车商品唯一 key：

```js
`${product.id}-${option}`
```

## 改动注意事项

- 新增可见文案时，优先同步维护中英文版本。
- 新增路由时，同时检查 `src/App.jsx`、`public/_redirects` 和路由模式兼容。
- 修改订单字段时，同时更新 `CheckoutModal.jsx`、`src/services/orders.js`、`shared/orders.js`、`server.js` 和 `netlify/functions/orders.js`。
- 修改持久化 key 时，要考虑旧数据兼容。
- 修改 `server.js` 静态文件逻辑时，要保留目录穿越防护。
- 如果删除 `src/react-shim.js` 或旧的 `src/App.js`，先确认没有遗留引用。
- 继续做 colocation 时，优先从 `src/features/collections/` 扩展，把集合页组件、hook、测试逐步收拢。

## 当前优先级建议

- 继续完善搜索结果页或联想搜索。
- 继续拆集合页 UI 组件，进一步落实业务模块闭环。
- 增强商品详情页信息密度与转化组件。
- 增加订单查看或导出能力。
- 继续补测试，尤其是接口失败、错误边界和关键交互。
