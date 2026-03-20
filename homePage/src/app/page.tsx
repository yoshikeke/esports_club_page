import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CalendarDays,
  Newspaper,
  Users,
  Target,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getBlogPosts } from "@/lib/notion";
import { HeroSection } from "@/components/HeroSection";

export const revalidate = 3600;

export default async function HomePage() {
  const allPosts = await getBlogPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="flex flex-col gap-0">
      {/* Hero */}
      <HeroSection />

      {/* Mission */}
      <section className="py-20 px-4 bg-grid">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">ミッション</h2>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed">
            eスポーツの活用を通して地域貢献イベントの企画・立案・運営を行うことで、
            <strong className="text-foreground font-semibold">「次世代の日本を盛り上げられる人材を育成すること」</strong>
            を目的としています。
            企業のサポートを得ながら、企画立案から運営・協賛獲得まで全て学生が主体となって行い、
            実践的な経験を積むことを重視しています。
          </p>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold mb-10 tracking-tight">主な活動内容</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: CalendarDays,
                title: "eスポーツ探求フェス",
                badge: "2025年3月15日",
                desc: "eスポーツ業界に関心を持つ高校生向けに、企業の方々とのミーティングや業界調査の発表を通じて、将来の進路選択に役立つ情報や経験を提供するイベント。",
              },
              {
                icon: Users,
                title: "世代間eスポーツ大会「GOC」",
                badge: "2023年度",
                desc: "高専生と高齢者サロンの方々によるペアチームでの対戦。eスポーツを通じて地元熊本の様々な課題解決を目指す活動の第一弾。",
              },
              {
                icon: Newspaper,
                title: "eスポーツ業界の研究・学習",
                badge: null,
                desc: "企業へのインタビューなどを通じて、eスポーツ業界の仕組みやビジネス・キャリアについて深く調査し、イベント等で発信しています。",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="bg-card/50 border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 mb-3 group-hover:bg-primary/15 transition-colors">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-3">
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs bg-secondary/80">
                      {item.badge}
                    </Badge>
                  )}
                  <p className="leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Club info */}
      <section className="py-20 px-4 bg-grid">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 tracking-tight">クラブ概要</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 overflow-hidden">
            {[
              { label: "名称", value: "熊本高専 eスポーツ同好会" },
              { label: "代表者", value: "部長 岩元 喜明" },
              { label: "部員数", value: "10名（2025年1月時点）" },
              { label: "活動頻度", value: "毎週月曜日 約1時間" },
              { label: "拠点", value: "熊本高専" },
              { label: "活動目標", value: "地域貢献イベントの企画・運営" },
            ].map(({ label, value }, i, arr) => (
              <div
                key={label}
                className={cn(
                  "flex gap-4 px-6 py-4 text-sm",
                  i < arr.length - 1 && "border-b border-border/40"
                )}
              >
                <span className="text-muted-foreground w-24 shrink-0 font-medium">
                  {label}
                </span>
                <span className="text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent posts */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold tracking-tight">最新の活動報告</h2>
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "border-border/50 hover:border-primary/30 hover:text-primary transition-colors"
              )}
            >
              すべて見る
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </div>
          {recentPosts.length === 0 ? (
            <p className="text-muted-foreground text-sm">記事がまだありません。</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentPosts.map((post) => (
                <a key={post.id} href={post.notionUrl} target="_blank" rel="noopener noreferrer" className="group">
                  <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                    <CardHeader>
                      <div className="flex gap-2 flex-wrap mb-2">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-secondary/80"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <p className="mb-3 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <p className="text-xs text-muted-foreground/60">
                        {formatDate(post.date)}
                      </p>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-grid">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mx-auto mb-5">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-3 tracking-tight">入部・お問い合わせ</h2>
          <p className="text-muted-foreground mb-8">
            入部希望・コラボ提案・取材依頼など、お気軽にご連絡ください。
          </p>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-primary text-primary-foreground font-semibold",
              "hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20",
              "transition-all duration-200"
            )}
          >
            お問い合わせフォームへ
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
