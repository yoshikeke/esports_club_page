"use client";

import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import img1 from "@/app/public/images/121369_0.jpg";
import img2 from "@/app/public/images/121392_0.jpg";
import img3 from "@/app/public/images/121418_0.jpg";

const slides = [img1.src, img2.src, img3.src];

const INTERVAL = 6000; // 表示時間 (ms)
const FADE = 1500;     // フェード時間 (ms)

export function HeroSection() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (active + 1) % slides.length;
      setPrev(active);
      setTransitioning(true);

      setTimeout(() => {
        setActive(next);
        setTransitioning(false);
        setPrev(null);
      }, FADE);
    }, INTERVAL);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <section className="relative overflow-hidden text-white py-24 px-4">
      {/* 背景スライド */}
      {slides.map((src, i) => {
        const isActive = i === active;
        const isPrev = i === prev;
        if (!isActive && !isPrev) return null;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: isActive ? (transitioning ? 0 : 1) : transitioning ? 1 : 0,
              transition: `opacity ${FADE}ms cubic-bezier(0.4,0,0.2,1)`,
              zIndex: isActive ? 1 : 0,
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center hero-kenburns"
              style={{ backgroundImage: `url(${src})` }}
            />
          </div>
        );
      })}

      {/* ダークグラデーションオーバーレイ */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(9,9,11,0.82) 0%, rgba(24,24,27,0.68) 50%, rgba(9,9,11,0.82) 100%)",
        }}
      />

      {/* コンテンツ */}
      <div className="relative z-20 container mx-auto max-w-3xl text-center">
        <div className="mb-4 flex justify-center">
          <Gamepad2 className="h-16 w-16 text-primary opacity-90" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          熊本高専<br />
          <span className="text-primary">eスポーツ同好会</span>
        </h1>
        <p className="text-zinc-300 text-lg mb-2">
          eスポーツを通じて地域に貢献し、次世代の日本を盛り上げる人材を育成する
        </p>
        <p className="text-zinc-500 text-sm mb-8">部員10名 ／ 毎週月曜活動</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/blog" className={cn(buttonVariants({ size: "lg" }))}>
            活動報告を見る
          </Link>
          <Link
            href="/events"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/30 text-white hover:bg-white/10"
            )}
          >
            イベント情報
          </Link>
        </div>
      </div>
    </section>
  );
}
