import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  CalendarDays,
  Newspaper,
  Users,
  Target,
  MapPin,
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
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-6 w-6 text-primary shrink-0" />
            <h2 className="text-2xl font-bold">ミッション</h2>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed">
            eスポーツの活用を通して地域貢献イベントの企画・立案・運営を行うことで、
            <strong className="text-foreground">「次世代の日本を盛り上げられる人材を育成すること」</strong>
            を目的としています。
            企業のサポートを得ながら、企画立案から運営・協賛獲得まで全て学生が主体となって行い、
            実践的な経験を積むことを重視しています。
          </p>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold mb-8">主な活動内容</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CalendarDays className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-base">eスポーツ探求フェス</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <Badge variant="secondary" className="text-xs">2025年3月15日</Badge>
                <p>
                  eスポーツ業界に関心を持つ高校生向けに、企業の方々とのミーティングや業界調査の発表を通じて、将来の進路選択に役立つ情報や経験を提供するイベント。
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-base">世代間eスポーツ大会「GOC」</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <Badge variant="secondary" className="text-xs">2023年度</Badge>
                <p>
                  高専生と高齢者サロンの方々によるペアチームでの対戦。eスポーツを通じて地元熊本の様々な課題解決を目指す活動の第一弾。
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <Newspaper className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-base">eスポーツ業界の研究・学習</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  企業へのインタビューなどを通じて、eスポーツ業界の仕組みやビジネス・キャリアについて深く調査し、イベント等で発信しています。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* Club info */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">クラブ概要</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {[
              { label: "名称", value: "熊本高専 eスポーツ同好会" },
              { label: "代表者", value: "部長 岩元 喜明" },
              { label: "部員数", value: "10名（2025年1月時点）" },
              { label: "活動頻度", value: "毎週月曜日 約1時間" },
              { label: "拠点", value: "熊本高専" },
              { label: "活動目標", value: "地域貢献イベントの企画・運営" },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-3 py-3 border-b border-border">
                <span className="text-muted-foreground w-24 shrink-0">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent posts */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">最新の活動報告</h2>
            <Link
              href="/blog"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              すべて見る
            </Link>
          </div>
          {recentPosts.length === 0 ? (
            <p className="text-muted-foreground text-sm">記事がまだありません。</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex gap-2 flex-wrap mb-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <p className="mb-3 line-clamp-3">{post.excerpt}</p>
                      <p className="text-xs">{formatDate(post.date)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-2xl text-center">
          <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-3">入部・お問い合わせ</h2>
          <p className="text-muted-foreground mb-6">
            入部希望・コラボ提案・取材依頼など、お気軽にご連絡ください。
          </p>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            お問い合わせフォームへ <ArrowRight className="h-4 w-4 ml-1" />
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
