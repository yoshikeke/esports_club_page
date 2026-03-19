import { Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Gamepad2 className="h-4 w-4" />
          <span className="font-semibold">熊本高専 eスポーツ同好会</span>
        </div>
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/blog" className="hover:text-primary transition-colors">活動報告</Link>
          <Link href="/events" className="hover:text-primary transition-colors">イベント</Link>
          <Link href="/media" className="hover:text-primary transition-colors">資料・記録</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">お問い合わせ</Link>
        </div>
        <p>© {new Date().getFullYear()} 熊本高専 eスポーツ同好会</p>
      </div>
    </footer>
  );
}
