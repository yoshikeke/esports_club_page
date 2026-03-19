/**
 * Notion API ユーティリティ
 *
 * 【セットアップ手順】
 * 1. https://www.notion.so/my-integrations でインテグレーションを作成
 * 2. ブログDBとイベントDBにインテグレーションを接続
 * 3. .env.local に以下を設定:
 *    NOTION_TOKEN=secret_xxxx
 *    NOTION_BLOG_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 *    NOTION_EVENTS_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 *
 * 【Notion DB のプロパティ設定】
 * ブログDB:
 *   - Title (title): 記事タイトル
 *   - Excerpt (rich_text): 概要文
 *   - Date (date): 公開日
 *   - Tags (multi_select): タグ
 *   - Slug (rich_text): URLスラッグ (例: valorant-tournament-1)
 *   - Published (checkbox): 公開フラグ
 *
 * イベントDB:
 *   - Title (title): イベント名
 *   - Date (date): 開催日
 *   - Location (rich_text): 場所
 *   - Description (rich_text): 概要
 *   - Status (select): upcoming / ongoing / past
 */

import type { BlogPost, Event } from "@/types";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const BLOG_DB_ID = process.env.NOTION_BLOG_DB_ID;
const EVENTS_DB_ID = process.env.NOTION_EVENTS_DB_ID;

function isNotionConfigured() {
  return !!(NOTION_TOKEN && BLOG_DB_ID && EVENTS_DB_ID);
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isNotionConfigured()) return DUMMY_BLOG_POSTS;

  const { Client } = await import("@notionhq/client");
  const notion = new Client({ auth: NOTION_TOKEN });

  const db = await notion.databases.query({
    database_id: BLOG_DB_ID!,
    filter: { property: "Published", checkbox: { equals: true } },
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return db.results
    .filter((p): p is typeof p & { properties: Record<string, unknown> } =>
      "properties" in p
    )
    .map((page) => {
      const props = page.properties as Record<string, NotionProperty>;
      return {
        id: page.id,
        title: getTitle(props["Title"]),
        excerpt: getRichText(props["Excerpt"]),
        date: getDate(props["Date"]) ?? "",
        tags: getMultiSelect(props["Tags"]),
        slug: getRichText(props["Slug"]) || page.id,
      };
    });
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export async function getEvents(): Promise<Event[]> {
  if (!isNotionConfigured()) return DUMMY_EVENTS;

  const { Client } = await import("@notionhq/client");
  const notion = new Client({ auth: NOTION_TOKEN });

  const db = await notion.databases.query({
    database_id: EVENTS_DB_ID!,
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return db.results
    .filter((p): p is typeof p & { properties: Record<string, unknown> } =>
      "properties" in p
    )
    .map((page) => {
      const props = page.properties as Record<string, NotionProperty>;
      const status = getSelect(props["Status"]);
      return {
        id: page.id,
        title: getTitle(props["Title"]),
        date: getDate(props["Date"]) ?? "",
        location: getRichText(props["Location"]),
        description: getRichText(props["Description"]),
        status: (["upcoming", "ongoing", "past"].includes(status)
          ? status
          : "past") as Event["status"],
      };
    });
}

// ---------------------------------------------------------------------------
// Notion property helpers
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NotionProperty = any;

function getTitle(prop?: NotionProperty): string {
  return prop?.title?.[0]?.plain_text ?? "";
}

function getRichText(prop?: NotionProperty): string {
  return prop?.rich_text?.[0]?.plain_text ?? "";
}

function getDate(prop?: NotionProperty): string | null {
  return prop?.date?.start ?? null;
}

function getMultiSelect(prop?: NotionProperty): string[] {
  return (prop?.multi_select ?? []).map((s: { name: string }) => s.name);
}

function getSelect(prop?: NotionProperty): string {
  return prop?.select?.name ?? "";
}

// ---------------------------------------------------------------------------
// Dummy data (NOTION_TOKEN 未設定時に使用)
// ---------------------------------------------------------------------------

const DUMMY_BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "esports-fes-2025",
    title: "eスポーツ探求フェス 開催報告",
    excerpt:
      "2025年3月15日に「eスポーツ探求フェス〜業界を知り、キャリアと未来を探る〜」を開催しました。高校生を対象に、企業の方々とのミーティングや業界調査の発表を行いました。",
    date: "2025-03-15",
    tags: ["イベント", "地域貢献", "高校生"],
  },
  {
    id: "2",
    slug: "goc-2023",
    title: "世代間eスポーツ大会「GOC」開催報告",
    excerpt:
      "高専生と高齢者サロンの方々がペアを組んで対戦する「GOC」を開催。eスポーツで地域の世代間交流を実現しました。",
    date: "2023-11-10",
    tags: ["大会", "地域貢献", "世代間交流"],
  },
  {
    id: "3",
    slug: "industry-research",
    title: "eスポーツ企業インタビュー実施",
    excerpt:
      "業界研究の一環として、eスポーツ関連企業へのインタビューを実施。業界のビジネスモデルやキャリアパスについて深く学びました。",
    date: "2024-06-20",
    tags: ["業界研究", "インタビュー"],
  },
];

const DUMMY_EVENTS: Event[] = [
  {
    id: "1",
    title: "eスポーツ探求フェス 2026",
    date: "2026-03-15",
    location: "熊本高専",
    description:
      "eスポーツ業界に関心を持つ高校生向けの探求フェス。企業の方々とのミーティングや業界調査の発表を行います。",
    status: "upcoming",
  },
  {
    id: "2",
    title: "体験入部デー（春）",
    date: "2026-04-08",
    location: "熊本高専 部室棟",
    description: "新入生歓迎・体験入部。どんなゲームでも大歓迎です！",
    status: "upcoming",
  },
  {
    id: "3",
    title: "eスポーツ探求フェス〜業界を知り、キャリアと未来を探る〜",
    date: "2025-03-15",
    location: "熊本高専",
    description:
      "eスポーツ業界に関心を持つ高校生向けに、企業の方々とのミーティングや業界調査の発表を通じて、将来の進路選択に役立つ情報を提供しました。",
    status: "past",
  },
  {
    id: "4",
    title: "世代間eスポーツ大会「GOC」",
    date: "2023-11-10",
    location: "熊本市内 高齢者サロン",
    description:
      "高専生と高齢者サロンの方々によるペアチームでの対戦。eスポーツを通じて地元熊本の課題解決を目指す第一弾イベント。",
    status: "past",
  },
];
