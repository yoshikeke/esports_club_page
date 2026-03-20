import { Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <Gamepad2 className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="font-semibold text-sm text-foreground">
              熊本高専 eスポーツ同好会
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">活動報告</Link>
            <Link href="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">イベント</Link>
            <Link href="/media" className="text-sm text-muted-foreground hover:text-primary transition-colors">資料・記録</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">お問い合わせ</Link>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 text-center">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} 熊本高専 eスポーツ同好会
          </p>
        </div>
      </div>
    </footer>
  );
}
