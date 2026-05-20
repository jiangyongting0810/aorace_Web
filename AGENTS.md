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
`Remove-Item "C:\path\to\file.txt"`

如果需要批量删除文件，应停止操作，并向用户请求，让用户手动删除。

---

# FishWeb 项目说明

这个文件是给以后跨对话继续开发时看的。新对话里先读这个文件，可以快速理解当前项目结构、运行方式、页面能力和改动注意事项。

## 项目概览

FishWeb 是一个鱼具独立站前端项目，品牌名目前是 TideForge。它已经从早期的单文件原型重构为标准化的 React 工程，当前使用 Vite 作为开发和构建工具，页面包含首页、鱼竿分类页、商品详情页、文章详情页、购物车抽屉、结账弹窗、搜索浮层、页脚和多语言内容。

项目目前仍然偏轻量，但已经具备完整的前端工程结构、基础测试、路由、持久化状态和双环境接口接入方式：

- 本地开发时，前端通过 Vite 运行。
- 本地 API 通过 `server.js` 提供。
- 部署到 Netlify 时，订单接口走 `netlify/functions/orders.js`。

## 当前技术栈

- `Vite 8`
- `React 19`
- `ReactDOM 19`
- `React Router DOM 7`
- `Vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `jsdom`
- `Node.js` 原生 `http` 服务
- `Netlify Functions`

说明：

- 当前组件写法已经是 `JSX`，不再是 `React.createElement` 方案。
- `src/react-shim.js` 仍然在仓库里，但当前主入口已经切到 `src/main.jsx`。
- 项目使用 `localStorage` 持久化语言、购物车和 Cookie 选择。

## 运行方式

在项目根目录可用这些命令：

```powershell
npm run dev
```

- 启动 Vite 前端开发服务。
- 默认地址是 `http://127.0.0.1:5173`。
- Vite 会把 `/api` 代理到本地 API 服务 `http://127.0.0.1:4173`。

```powershell
npm run api
```

- 启动本地订单接口服务。
- 默认地址是 `http://127.0.0.1:4173`。
- `PORT` 环境变量可以覆盖端口。

```powershell
npm run build
```

- 打包前端产物到 `dist/`。

```powershell
npm run preview
```

- 预览打包后的 Vite 产物。

```powershell
npm run test
```

- 运行 Vitest 测试。

如果只想预览静态构建结果，也可以直接运行：

```powershell
node server.js
```

这时 `server.js` 会优先服务 `dist/`；如果 `dist/index.html` 不存在，则回退到项目根目录静态文件。

## 文件结构

- `package.json`
  - 项目依赖、脚本和模块类型配置。
  - 当前是 `type: "module"`。

- `vite.config.js`
  - Vite 配置文件。
  - 启用 React 插件。
  - 本地开发端口为 `5173`。
  - 配置 `/api` 到 `127.0.0.1:4173` 的代理。
  - 同时包含 Vitest 配置。

- `index.html`
  - Vite 入口 HTML。
  - 页面根节点是给 React 挂载用的 `#root`。

- `src/main.jsx`
  - 当前前端真正入口。
  - 挂载 `App`，并引入全局样式。

- `src/App.jsx`
  - 应用总装配文件。
  - 负责路由、全局状态、购物车逻辑、搜索浮层、结账弹窗、Cookie 面板等。

- `src/router.jsx`
  - 路由容器封装。
  - 根据运行时配置决定使用 `BrowserRouter` 或 `HashRouter`。

- `src/config/runtime.js`
  - 运行时配置。
  - 负责拼接 API 地址。
  - 支持通过环境变量切换路由模式和 API 基地址。

- `src/pages/`
  - 页面级组件。
  - 当前包括：
    - `HomePage.jsx`
    - `FishingRodsPage.jsx`
    - `ProductDetailPage.jsx`
    - `StoryDetailPage.jsx`

- `src/components/`
  - 通用界面组件。
  - 当前包括：
    - `Header.jsx`
    - `Footer.jsx`
    - `CartDrawer.jsx`
    - `CheckoutModal.jsx`
    - `SearchOverlay.jsx`
    - `CookiePanel.jsx`

- `src/hooks/useLocalStorageState.js`
  - 封装带本地持久化的状态。

- `src/services/orders.js`
  - 前端订单提交服务。
  - 统一请求 `/api/orders`。

- `src/data/content.js`
  - 页面文案与数据源。
  - 中英文文案、导航、商品、分类、文章、评价等通常集中在这里。

- `src/utils/format.js`
  - 展示层格式化工具。

- `src/test/setup.js`
  - Vitest 测试初始化。
  - 补齐 `scrollTo`、`requestAnimationFrame` 等测试环境能力。

- `src/App.test.jsx`
  - 当前基础测试。
  - 覆盖首页渲染、语言持久化、购物车持久化、详情页路由、分类页排序弹层等。

- `src/assets/`
  - 项目图片和图标资源。

- `public/_redirects`
  - 部署时的静态路由回退配置。

- `server.js`
  - 本地 Node.js HTTP 服务。
  - 同时负责静态资源预览与 `POST /api/orders`。

- `shared/orders.js`
  - 订单共享逻辑。
  - 提供 `validateOrder()` 和 `createSavedOrder()`。
  - 供本地 Node 服务和 Netlify Functions 共用。

- `netlify/functions/orders.js`
  - Netlify 订单函数入口。
  - 与本地 API 共享订单校验和订单生成逻辑。

- `netlify.toml`
  - Netlify 构建与函数目录配置。

- `dist/`
  - Vite 打包产物目录。

## 当前页面和功能理解

当前项目已经不是单页静态原型，而是一个有路由的前端应用。主要能力如下。

1. 顶部公告栏
   - 显示免运费文案。
   - 文案随语言切换。

2. 顶部导航
   - 有桌面导航、语言切换、搜索入口、购物车入口、移动端菜单状态。
   - 鱼竿分类带有 mega menu。
   - 页面滚动时会根据首屏区块切换固定头部样式。

3. 首页
   - 由 `HomePage.jsx` 负责。
   - 包含 Hero、分类、热卖、品牌故事、文章、评价、服务承诺等内容。
   - `#best-sellers` 当前首页仅展示前 4 个商品卡片，维持单行四列，不直接渲染全部商品数据。

4. 鱼竿分类页
   - 由 `FishingRodsPage.jsx` 负责。
   - 已有独立路由，不再只是锚点跳转。
   - 包含排序交互。

5. 商品详情页
   - 由 `ProductDetailPage.jsx` 负责。
   - 路由形式为 `/products/:productId`。

6. 文章详情页
   - 由 `StoryDetailPage.jsx` 负责。
   - 路由形式为 `/stories/:slug`。

7. 购物车抽屉
   - 支持打开、关闭、数量修改、移除商品、显示小计。
   - 商品加入购物车后会保存在 `localStorage`。

8. 结账弹窗
   - 从购物车进入。
   - 前端通过 `src/services/orders.js` 提交订单。
   - 成功后清空购物车并展示订单结果。

9. 搜索浮层
   - 作为独立组件存在。
   - 当前仍以展示和入口交互为主。

10. Cookie 面板
    - 同意或拒绝结果会写入 `localStorage`。

11. 多语言切换
    - 当前语言状态会写入 `localStorage`。

12. 前端路由
    - 使用 React Router。
    - 未命中的路由会重定向回首页。

## 关键代码位置

- 应用入口：
  - `src/main.jsx`

- 应用装配与全局状态：
  - `src/App.jsx`

- 路由模式切换：
  - `src/router.jsx`
  - `src/config/runtime.js`

- 页面文案和数据：
  - `src/data/content.js`

- 顶部导航、页脚、浮层：
  - `src/components/Header.jsx`
  - `src/components/Footer.jsx`
  - `src/components/SearchOverlay.jsx`
  - `src/components/CookiePanel.jsx`

- 购物车逻辑：
  - `src/App.jsx` 中的 `cartItems`
  - `addToCart`
  - `updateQuantity`
  - `removeItem`
  - `src/components/CartDrawer.jsx`

- 结账逻辑：
  - `src/components/CheckoutModal.jsx`
  - `src/services/orders.js`
  - `shared/orders.js`
  - `server.js`
  - `netlify/functions/orders.js`

- 本地持久化：
  - `src/hooks/useLocalStorageState.js`

- 测试：
  - `src/App.test.jsx`
  - `src/test/setup.js`

## 当前主要状态

`src/App.jsx` 里维护的核心状态包括：

- `lang`：当前语言，`en` 或 `zh`
- `cartItems`：购物车商品列表
- `cookieConsent`：Cookie 选择结果
- `cartOpen`：购物车抽屉是否打开
- `checkoutOpen`：结账弹窗是否打开
- `searchOpen`：搜索浮层是否打开
- `mobileNavOpen`：移动端菜单是否打开
- `orderResult`：订单提交成功后的返回结果

其中以下状态会持久化到 `localStorage`：

- `tideforge-lang`
- `tideforge-cart`
- `tideforge-cookie-consent`

购物车商品的唯一标识仍然是商品 ID 和规格拼接后的 key：

```js
`${product.id}-${option}`
```

## 订单保存方式

当前有两套订单接入方式：

### 本地开发

- 接口地址：`POST /api/orders`
- 由 `server.js` 处理
- 成功提交的订单会追加保存到项目根目录的 `orders.json`

### Netlify 部署

- 接口地址同样是 `POST /api/orders`
- 由 `netlify/functions/orders.js` 处理
- 当前函数返回订单号和状态
- 共享校验与订单生成逻辑在 `shared/orders.js`

当前共享校验规则较基础：

- `order` 必须是对象
- 必须有 `customer.email`
- 必须有 `customer.name`
- `items` 必须是非空数组

订单号仍然采用：

```text
TF-时间戳
```

订单状态为：

```text
paid_pending_fulfillment
```

## 当前仍偏占位或待完善的部分

下面这些点里，有些已经有页面壳子，但业务能力仍不完整：

- 搜索仍偏展示型，没有完整检索结果能力
- 账户相关功能未接入
- 真实支付未接入
- 邮箱订阅未接入真实保存或发送逻辑
- 订单后台、订单列表、导出能力还没有
- 商品筛选、分页、集合页能力还可以继续扩展
- 内容管理仍以本地数据文件为主，没有 CMS
- 图片资源和商品数据目前仍偏静态

## 样式和布局说明

- 全局样式主要在 `src/styles.css`
- 设计风格仍然是黑白灰为主，配合绿色强调色和红色促销价
- 资源图片放在 `src/assets/`
- 当前已经不是单一首页布局，而是首页加详情页加集合页的结构
- 首页热卖区当前按桌面端单行 4 卡控制，若后续改成轮播或多行展示，要同步更新 `HomePage.jsx` 与相关测试
- 页头滚动吸顶效果依赖 `.hero` 或 `.rods-hero` 区块高度计算

## 以后改动建议

- 新增可见文案时，优先同步维护中英文版本
- 新增路由时，同时检查：
  - `src/App.jsx` 的 `<Routes>`
  - `public/_redirects`
  - `src/config/runtime.js` 的路由模式兼容
- 修改订单字段时，同时更新：
  - `src/components/CheckoutModal.jsx`
  - `src/services/orders.js`
  - `shared/orders.js`
  - `server.js`
  - `netlify/functions/orders.js`
- 修改本地持久化键名时，要考虑旧数据兼容
- 修改 `server.js` 静态文件逻辑时，要保留目录穿越防护
- 如果删掉 `src/react-shim.js` 或 `src/App.js`，先确认没有遗留引用后再处理

## 值得优先补的功能

- 做真实搜索结果页或联想搜索
- 补商品筛选、排序、分页和集合页体验
- 增强商品详情页信息密度与转化组件
- 做订单查看或导出功能，方便检查 `orders.json`
- 继续补测试，至少覆盖结账提交流程和关键路由
- 评估是否要把静态内容迁移到更清晰的数据层或 CMS
