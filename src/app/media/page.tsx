import type { Metadata } from "next";
import { DriveEmbed } from "@/components/DriveEmbed";
import { FolderOpen } from "lucide-react";

export const metadata: Metadata = { title: "活動記録・資料" };

const FOLDER_URL = process.env.NEXT_PUBLIC_DRIVE_FOLDER_URL ?? "";
const SLIDE_URL = process.env.NEXT_PUBLIC_DRIVE_SLIDE_URL ?? "";

export default function MediaPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <FolderOpen className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">活動記録・資料</h1>
      </div>
      <p className="text-muted-foreground mb-12">
        活動スライド・写真・発表資料などを公開しています。
      </p>

      {SLIDE_URL && (
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-5 tracking-tight">発表スライド</h2>
          <DriveEmbed src={SLIDE_URL} title="発表スライド" height={480} />
        </section>
      )}

      {FOLDER_URL ? (
        <section>
          <h2 className="text-xl font-semibold mb-5 tracking-tight">活動記録フォルダ</h2>
          <DriveEmbed src={FOLDER_URL} title="活動記録フォルダ" height={600} />
        </section>
      ) : (
        <div className="rounded-xl border border-dashed border-border/50 p-14 text-center text-muted-foreground bg-card/20">
          <FolderOpen className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium mb-2">Google Drive の URL が未設定です</p>
          <p className="text-sm">
            <code className="bg-secondary/80 px-1.5 py-0.5 rounded text-xs">.env.local</code> に{" "}
            <code className="bg-secondary/80 px-1.5 py-0.5 rounded text-xs">NEXT_PUBLIC_DRIVE_FOLDER_URL</code> を設定してください。
          </p>
        </div>
      )}
    </div>
  );
}
