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

const INTERVAL = 7000; // 表示時間 (ms)
const FADE = 2000;     // フェード時間 (ms)

export function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden text-white py-24 px-4">
      {/* 背景スライド（全枚数を常にレンダリング） */}
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

      {/* ダークグラデーションオーバーレイ */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.38) 50%, rgba(0,0,0,0.52) 100%)",
        }}
      />

      {/* コンテンツ */}
      <div className="relative z-20 container mx-auto max-w-3xl text-center">
        <div className="mb-4 flex justify-center">
          <Gamepad2
            className="h-16 w-16 text-white opacity-90"
            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))" }}
          />
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
        >
          熊本高専<br />
          <span className="text-sky-300">eスポーツ同好会</span>
        </h1>
        <p
          className="text-white/90 text-lg mb-2"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
        >
          eスポーツを通じて地域に貢献し、次世代の日本を盛り上げる人材を育成する
        </p>
        <p
          className="text-white/60 text-sm mb-8"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
        >
          部員10名 ／ 毎週月曜活動
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "bg-white/10 border-white text-white backdrop-blur-sm",
              "hover:bg-white/25 hover:border-white hover:scale-105 hover:shadow-xl",
              "transition-all duration-200"
            )}
          >
            活動報告を見る
          </Link>
          <Link
            href="/events"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "bg-white/10 border-white text-white backdrop-blur-sm",
              "hover:bg-white/25 hover:border-white hover:scale-105 hover:shadow-xl",
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
