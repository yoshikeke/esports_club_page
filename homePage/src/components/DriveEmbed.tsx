"use client";

type DriveEmbedProps = {
  /** Google Drive の埋め込み URL
   * ファイル: https://drive.google.com/file/d/FILE_ID/preview
   * フォルダ: https://drive.google.com/embeddedfolderview?id=FOLDER_ID#list
   */
  src: string;
  title: string;
  height?: number;
  className?: string;
};

export function DriveEmbed({
  src,
  title,
  height = 480,
  className,
}: DriveEmbedProps) {
  return (
    <div
      className={`w-full overflow-hidden rounded-lg border border-border bg-muted/30 ${className ?? ""}`}
    >
      <iframe
        src={src}
        title={title}
        width="100%"
        height={height}
        allow="autoplay"
        frameBorder="0"
        className="block"
      />
    </div>
  );
}
