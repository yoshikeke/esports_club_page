import type { Metadata } from "next";

export const metadata: Metadata = { title: "お問い合わせ" };

const FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL ?? "";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-2 tracking-tight">お問い合わせ</h1>
      <p className="text-muted-foreground mb-10">
        入部希望・コラボ提案・取材依頼など、お気軽にご連絡ください。
      </p>

      {FORM_URL ? (
        <div className="rounded-xl overflow-hidden border border-border/50 bg-card/30">
          <iframe
            src={FORM_URL}
            width="100%"
            height="900"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="お問い合わせフォーム"
            className="block"
          >
            読み込んでいます…
          </iframe>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border/50 p-14 text-center text-muted-foreground bg-card/20">
          <p className="font-medium mb-2">Google Forms の URL が未設定です</p>
          <p className="text-sm">
            <code className="bg-secondary/80 px-1.5 py-0.5 rounded text-xs">.env.local</code> に{" "}
            <code className="bg-secondary/80 px-1.5 py-0.5 rounded text-xs">NEXT_PUBLIC_GOOGLE_FORM_URL</code> を設定してください。
          </p>
          <p className="text-xs mt-4 text-muted-foreground/60">
            例: NEXT_PUBLIC_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/XXXX/viewform?embedded=true
          </p>
        </div>
      )}
    </div>
  );
}
