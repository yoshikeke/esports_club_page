import { getBlogPost, getBlogPosts } from "@/lib/notion";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  return { title: post?.title ?? "記事が見つかりません" };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-8 -ml-1 flex items-center gap-1.5 text-muted-foreground hover:text-primary"
        )}
      >
        <ArrowLeft className="h-4 w-4" /> 一覧へ戻る
      </Link>

      <div className="flex gap-2 flex-wrap mb-4">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-secondary/80">
            {tag}
          </Badge>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-3 tracking-tight">{post.title}</h1>
      <p className="text-sm text-muted-foreground/60 mb-10">{formatDate(post.date)}</p>

      <div className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed">
        <p>{post.excerpt}</p>
        <p className="text-muted-foreground/60 text-sm mt-8">
          ※ Notion連携後、ここに本文が表示されます。
        </p>
      </div>
    </div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
