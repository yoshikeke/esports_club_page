export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  slug: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  status: "upcoming" | "ongoing" | "past";
};
