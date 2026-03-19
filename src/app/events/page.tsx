import { getEvents } from "@/lib/notion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";
import type { Metadata } from "next";
import type { Event } from "@/types";

export const metadata: Metadata = { title: "イベント告知" };

export const revalidate = 3600;

export default async function EventsPage() {
  const events = await getEvents();

  const upcoming = events.filter((e) => e.status !== "past");
  const past = events.filter((e) => e.status === "past");

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-2 tracking-tight">イベント告知</h1>
      <p className="text-muted-foreground mb-10">
        部内大会・体験会・外部大会参加のお知らせです。
      </p>

      {upcoming.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-5 tracking-tight">開催予定</h2>
          <div className="flex flex-col gap-4">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-5 text-muted-foreground tracking-tight">
            過去のイベント
          </h2>
          <div className="flex flex-col gap-4">
            {past.map((event) => (
              <EventCard key={event.id} event={event} dimmed />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function EventCard({ event, dimmed }: { event: Event; dimmed?: boolean }) {
  const statusLabel =
    event.status === "upcoming"
      ? "開催予定"
      : event.status === "ongoing"
      ? "開催中"
      : "終了";

  const statusVariant =
    event.status === "upcoming"
      ? "default"
      : event.status === "ongoing"
      ? "secondary"
      : "outline";

  return (
    <Card
      className={`bg-card/50 border-border/50 transition-all duration-300 ${
        dimmed
          ? "opacity-60"
          : "hover:border-primary/30 hover:bg-card/80"
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg">{event.title}</CardTitle>
          <Badge variant={statusVariant} className="text-xs">
            {statusLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-1.5">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 shrink-0 text-primary/60" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-primary/60" />
          <span>{event.location}</span>
        </div>
        <p className="pt-1.5 leading-relaxed">{event.description}</p>
      </CardContent>
    </Card>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
