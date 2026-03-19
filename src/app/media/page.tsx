import type { Metadata } from "next";
import { DriveEmbed } from "@/components/DriveEmbed";
import { FolderOpen } from "lucide-react";

export const metadata: Metadata = { title: "活動記録・資料" };

/**
 * Google Drive の埋め込み URL を .env.local で管理
 *
 * フォルダ共有:
 *   NEXT_PUBLIC_DRIVE_FOLDER_URL=https://drive.google.com/embeddedfolderview?id=YOUR_FOLDER_ID#list
 *
 * スライド (発表資料) など個別ファイル:
 *   NEXT_PUBLIC_DRIVE_SLIDE_URL=https://drive.google.com/file/d/YOUR_FILE_ID/preview
 */
const FOLDER_URL = process.env.NEXT_PUBLIC_DRIVE_FOLDER_URL ?? "";
const SLIDE_URL = process.env.NEXT_PUBLIC_DRIVE_SLIDE_URL ?? "";

export default function MediaPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <FolderOpen className="h-7 w-7 text-primary" />
        <h1 className="text-3xl font-bold">活動記録・資料</h1>
      </div>
      <p className="text-muted-foreground mb-10">
        活動スライド・写真・発表資料などを公開しています。
      </p>

      {SLIDE_URL && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">発表スライド</h2>
          <DriveEmbed src={SLIDE_URL} title="発表スライド" height={480} />
        </section>
      )}

      {FOLDER_URL ? (
        <section>
          <h2 className="text-xl font-semibold mb-4">活動記録フォルダ</h2>
          <DriveEmbed
            src={FOLDER_URL}
            title="活動記録フォルダ"
            height={600}
          />
        </section>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
          <FolderOpen className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium mb-2">Google Drive の URL が未設定です</p>
          <p className="text-sm">
            <code className="bg-muted px-1 rounded">.env.local</code> に{" "}
            <code className="bg-muted px-1 rounded">NEXT_PUBLIC_DRIVE_FOLDER_URL</code> を設定してください。
          </p>
        </div>
      )}
    </div>
  );
}
