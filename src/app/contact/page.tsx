import type { Metadata } from "next";

export const metadata: Metadata = { title: "お問い合わせ" };

/**
 * Google Forms の埋め込み URL を環境変数で管理。
 * .env.local に NEXT_PUBLIC_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/XXXX/viewform?embedded=true
 * を設定してください。未設定の場合はプレースホルダーを表示します。
 */
const FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL ?? "";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">お問い合わせ</h1>
      <p className="text-muted-foreground mb-8">
        入部希望・コラボ提案・取材依頼など、お気軽にご連絡ください。
      </p>

      {FORM_URL ? (
        <div className="rounded-lg overflow-hidden border border-border">
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
        <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
          <p className="font-medium mb-2">Google Forms の URL が未設定です</p>
          <p className="text-sm">
            <code className="bg-muted px-1 rounded">.env.local</code> に{" "}
            <code className="bg-muted px-1 rounded">NEXT_PUBLIC_GOOGLE_FORM_URL</code> を設定してください。
          </p>
          <p className="text-xs mt-4">
            例: NEXT_PUBLIC_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/XXXX/viewform?embedded=true
          </p>
        </div>
      )}
    </div>
  );
}
