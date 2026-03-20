# 熊本高専 eスポーツ同好会 公式ホームページ

eスポーツを通じて地域に貢献し、次世代の日本を盛り上げる人材を育成する熊本高専eスポーツ同好会の公式サイトです。

## スタック

- **Next.js 14** (App Router / ISR)
- **TypeScript**
- **Tailwind CSS v3** + **shadcn/ui v4**
- **Notion API** — 活動報告ブログ・イベント管理
- **Vercel** — デプロイ

## ページ構成

| パス | 内容 |
|------|------|
| `/` | トップ（ミッション・活動概要・最新ブログ） |
| `/blog` | 活動報告ブログ一覧 (Notion DB / ISR) |
| `/blog/[slug]` | ブログ記事詳細 |
| `/events` | イベント告知一覧 (Notion DB / ISR) |
| `/media` | 活動記録・資料 (Google Drive 埋め込み) |
| `/contact` | お問い合わせ (Google Forms 埋め込み) |

## ローカル開発

```bash
# 依存関係インストール
npm install

# 環境変数を設定
cp .env.local.example .env.local
# → .env.local を編集して各トークンを設定

# 開発サーバー起動
npm run dev
```

## 環境変数

`.env.local.example` を参照してください。

| 変数名 | 説明 | 必須 |
|--------|------|------|
| `NOTION_TOKEN` | Notion インテグレーション トークン | ○ (Notion連携時) |
| `NOTION_BLOG_DB_ID` | ブログ Notion データベース ID | ○ (Notion連携時) |
| `NOTION_EVENTS_DB_ID` | イベント Notion データベース ID | ○ (Notion連携時) |
| `NEXT_PUBLIC_GOOGLE_FORM_URL` | Google Forms 埋め込み URL | お問い合わせ表示に必要 |
| `NEXT_PUBLIC_DRIVE_FOLDER_URL` | Google Drive フォルダ埋め込み URL | 資料ページに必要 |
| `NEXT_PUBLIC_DRIVE_SLIDE_URL` | Google Drive スライドファイル URL | 任意 |

> 環境変数が未設定の場合はダミーデータで動作します。

## Notion セットアップ

1. [Notion インテグレーション作成](https://www.notion.so/my-integrations) → トークンを取得
2. ブログDB・イベントDBにインテグレーションを接続
3. DB のプロパティ設定（[src/lib/notion.ts](src/lib/notion.ts) のコメント参照）
4. `.env.local` に `NOTION_TOKEN` / `NOTION_BLOG_DB_ID` / `NOTION_EVENTS_DB_ID` を設定

## Vercel デプロイ

```bash
npx vercel
```

Vercel ダッシュボードの **Environment Variables** に `.env.local` の内容を登録してください。

## ディレクトリ構成

```
src/
├── app/
│   ├── page.tsx          # トップページ
│   ├── blog/
│   │   ├── page.tsx      # ブログ一覧
│   │   └── [slug]/page.tsx
│   ├── events/page.tsx   # イベント一覧
│   ├── media/page.tsx    # 資料・記録
│   └── contact/page.tsx  # お問い合わせ
├── components/
│   ├── layout/Header.tsx
│   ├── layout/Footer.tsx
│   ├── ui/               # shadcn/ui コンポーネント
│   └── DriveEmbed.tsx
├── lib/
│   └── notion.ts         # Notion API + ダミーデータ
└── types/index.ts
```
# esports_club_page
