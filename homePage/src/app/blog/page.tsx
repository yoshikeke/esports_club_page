import { getBlogPosts } from "@/lib/notion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "活動報告ブログ" };

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-2 tracking-tight">活動報告ブログ</h1>
      <p className="text-muted-foreground mb-10">部の活動内容を随時お知らせします。</p>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <a key={post.id} href={post.notionUrl} target="_blank" rel="noopener noreferrer" className="group">
            <Card className="bg-card/50 border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex gap-2 flex-wrap mb-1">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-secondary/80">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-4">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2 leading-relaxed">{post.excerpt}</p>
                <p className="text-xs text-muted-foreground/60">{formatDate(post.date)}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
