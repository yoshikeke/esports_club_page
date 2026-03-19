"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import img1 from "@/app/public/images/121369_0.jpg";
import img2 from "@/app/public/images/121392_0.jpg";
import img3 from "@/app/public/images/121418_0.jpg";

const slides = [img1.src, img2.src, img3.src];

const INTERVAL = 7000;
const FADE = 2000;

export function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden text-white min-h-[520px] flex items-center">
      {/* Background slides */}
      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 hero-kenburns"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === active ? 1 : 0,
            transition: `opacity ${FADE}ms ease-in-out`,
          }}
        />
      ))}

      {/* Gradient overlay – deeper for readability */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,11,0.7) 0%, rgba(9,9,11,0.5) 40%, rgba(9,9,11,0.75) 100%)",
        }}
      />

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

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: i === active ? "24px" : "8px",
              backgroundColor: i === active ? "var(--primary)" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
