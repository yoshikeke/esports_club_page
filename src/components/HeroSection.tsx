import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden text-white min-h-[520px] flex items-center">
      {/* Content */}
      <div className="relative z-20 container mx-auto max-w-3xl text-center px-4 py-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-primary tracking-wide">
            熊本高専 eスポーツ同好会
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight tracking-tight">
          eスポーツで
          <br />
          <span className="text-primary">地域を動かす</span>
        </h1>

        <p className="text-white/70 text-lg md:text-xl mb-4 max-w-xl mx-auto leading-relaxed">
          次世代の日本を盛り上げる人材を育成する。
          <br className="hidden md:block" />
          企画から運営まで、すべて学生が主体。
        </p>

        <p className="text-white/40 text-sm mb-10">
          部員10名 ／ 毎週月曜活動
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/blog"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-primary text-primary-foreground font-semibold",
              "hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20",
              "transition-all duration-200"
            )}
          >
            活動報告を見る
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Link>
          <Link
            href="/events"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/20 text-white backdrop-blur-sm bg-white/5",
              "hover:bg-white/10 hover:border-white/30",
              "transition-all duration-200"
            )}
          >
            イベント情報
          </Link>
        </div>
      </div>

    </section>
  );
}
