# CLAUDE.md（プロジェクトルートに置く）

## プロジェクト概要
熊本高専 eスポーツ同好会のホームページ

## スタック
- Next.js 14 (App Router)
- Tailwind CSS + shadcn/ui
- Notion API（活動記録・イベント管理）
- Vercel デプロイ

## 機能要件
- 活動報告ブログ（Notionから取得）
- イベント告知一覧
- お問い合わせフォーム（Google Forms埋め込み）

## コーディング規約
- TypeScript使用
- コンポーネントはsrc/components/に配置
- API routeはapp/api/に配置