# Phonics 拼音練習 💡

多感官英文拼音學習 PWA，專為小學生設計。

## 功能

- **Phase 1 (聽與看)** — 逐音節同步發音 + 視覺高亮
- **Phase 2 (開口唸)** — 語音辨識回饋
- **Phase 3 (手寫練習)** — 分框手寫 + Claude Vision AI 辨識驗證
- **自訂字單** — 老師/家長可自行輸入每日單字
- **PWA** — 可安裝到手機主畫面，離線也能用（發音、語音辨識）

## 部署

1. Fork 或 clone 此 repo
2. 到 Settings → Pages → Source 選 `main` branch → Save
3. 等幾分鐘，網站就會在 `https://你的帳號.github.io/repo名稱/` 上線

## 手寫辨識設定

手寫辨識使用 Claude Vision API，在 GitHub Pages 上需要 API Key：

1. 到 [Anthropic Console](https://console.anthropic.com/) 取得 API Key
2. 打開 app → 點右上角 ⚙️ → 貼入 API Key
3. Key 只存在你的裝置上，不會傳到任何第三方伺服器

> 在 claude.ai 的 artifact 中使用則不需要 API Key。

## 字單格式

在設定頁面中，每行一個單字，用 `-` 分音節：

```
ham-bur-ger
milk
wa-ter
hot-dog
ice cream
juice
```

## 技術

- 單檔 HTML + CSS + Vanilla JS（無框架）
- Web Speech API（發音 + 語音辨識）
- Claude Vision API（手寫辨識）
- PWA（Service Worker + Manifest）
