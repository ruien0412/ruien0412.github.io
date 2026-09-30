# zre.tw

張睿恩 (Rui-En Zhang) 的個人網站，部署於 <https://zre.tw>。

以 [Astro](https://astro.build) 建置，搭配 React、Tailwind CSS 與 Framer Motion；推送到 `main` 後由 GitHub Actions 自動建置並部署到 GitHub Pages。

## 專案結構

```text
/
├── public/                 # 靜態檔案（字型、圖片、robots.txt、favicon）
├── scripts/
│   └── generate-build-info.cjs  # 建置前產生 commit / 建置時間資訊（src/build-info.ts）
├── src/
│   ├── components/         # Astro 與 React 元件
│   ├── content/blog/       # 部落格文章（Markdown / MDX）
│   ├── layouts/            # 頁面版型
│   ├── pages/              # 路由頁面，含 rss.xml
│   └── styles/             # 全域樣式與字型
└── astro.config.mjs
```

## 指令

需要 Node.js 22.12 以上。

| 指令              | 說明                                   |
| :---------------- | :------------------------------------- |
| `npm install`     | 安裝相依套件                           |
| `npm run dev`     | 在 `localhost:4321` 啟動開發伺服器     |
| `npm run build`   | 建置正式版網站到 `./dist/`             |
| `npm run preview` | 在本機預覽建置結果                     |

## 撰寫文章

在 `src/content/blog/` 新增 `.md` 或 `.mdx` 檔案，frontmatter 欄位定義於 `src/content.config.ts`：

```yaml
---
title: "文章標題"
description: "文章摘要"
pubDate: "2026-01-01"
heroImage: "/blog-placeholder-1.jpg" # 選填，同時作為社群分享預覽圖
---
```
