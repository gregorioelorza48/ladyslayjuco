export type SportSlug = "volleyball" | "basketball" | "soccer" | "softball";

export interface Sport {
  slug: SportSlug;
  name: string;
  season: string;
  record: string;
  nextGame?: string;
  description: string;
}

export interface Game {
  id: string;
  sport: SportSlug;
  date: string;
  time: string;
  opponent: string;
  location: "Home" | "Away";
  result?: string;
}

export interface Player {
  id: string;
  sport: SportSlug;
  number: number;
  name: string;
  position: string;
  year: string;
  hometown: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  sport?: SportSlug;
}

export const site = {
  schoolName: "Lady Slay JUCO",
  programName: "Women's Athletics",
  tagline: "Compete with purpose. Graduate with pride.",
  njcaa: "NJCAA Region XIV",
};

export const sports: Sport[] = [
  {
    slug: "volleyball",
    name: "Volleyball",
    season: "Fall 2025",
    record: "18–6",
    nextGame: "vs. Tyler JC — Sat, Oct 12, 2:00 PM",
    description:
      "Our nationally competitive program builds leaders on and off the court.",
  },
  {
    slug: "basketball",
    name: "Basketball",
    season: "Winter 2025–26",
    record: "12–4",
    nextGame: "at Blinn College — Thu, Jan 9, 5:30 PM",
    description:
      "Fast-paced, team-first basketball in the heart of Texas junior college athletics.",
  },
  {
    slug: "soccer",
    name: "Soccer",
    season: "Fall 2025",
    record: "14–3–2",
    nextGame: "vs. Angelina College — Fri, Oct 18, 4:00 PM",
    description:
      "Technical skill and relentless effort define our women's soccer program.",
  },
  {
    slug: "softball",
    name: "Softball",
    season: "Spring 2026",
    record: "Season opens Feb",
    description:
      "Championship culture, strong pitching, and a family atmosphere in the dugout.",
  },
];

export const games: Game[] = [
  {
    id: "1",
    sport: "volleyball",
    date: "Oct 5, 2025",
    time: "2:00 PM",
    opponent: "Kilgore College",
    location: "Home",
    result: "W 3–1",
  },
  {
    id: "2",
    sport: "volleyball",
    date: "Oct 12, 2025",
    time: "2:00 PM",
    opponent: "Tyler Junior College",
    location: "Home",
  },
  {
    id: "3",
    sport: "basketball",
    date: "Jan 4, 2026",
    time: "5:30 PM",
    opponent: "Coastal Bend College",
    location: "Home",
  },
  {
    id: "4",
    sport: "basketball",
    date: "Jan 9, 2026",
    time: "5:30 PM",
    opponent: "Blinn College",
    location: "Away",
  },
  {
    id: "5",
    sport: "soccer",
    date: "Oct 18, 2025",
    time: "4:00 PM",
    opponent: "Angelina College",
    location: "Home",
  },
  {
    id: "6",
    sport: "soccer",
    date: "Oct 22, 2025",
    time: "1:00 PM",
    opponent: "McLennan College",
    location: "Away",
    result: "W 2–0",
  },
];

export const players: Player[] = [
  {
    id: "1",
    sport: "volleyball",
    number: 7,
    name: "Jordan Martinez",
    position: "Outside Hitter",
    year: "Sophomore",
    hometown: "Houston, TX",
  },
  {
    id: "2",
    sport: "volleyball",
    number: 12,
    name: "Avery Chen",
    position: "Setter",
    year: "Freshman",
    hometown: "San Antonio, TX",
  },
  {
    id: "3",
    sport: "volleyball",
    number: 3,
    name: "Taylor Brooks",
    position: "Libero",
    year: "Sophomore",
    hometown: "Dallas, TX",
  },
  {
    id: "4",
    sport: "basketball",
    number: 23,
    name: "Mia Johnson",
    position: "Guard",
    year: "Sophomore",
    hometown: "Austin, TX",
  },
  {
    id: "5",
    sport: "basketball",
    number: 11,
    name: "Destiny Williams",
    position: "Forward",
    year: "Freshman",
    hometown: "Beaumont, TX",
  },
  {
    id: "6",
    sport: "soccer",
    number: 9,
    name: "Sofia Ramirez",
    position: "Forward",
    year: "Sophomore",
    hometown: "Corpus Christi, TX",
  },
  {
    id: "7",
    sport: "soccer",
    number: 1,
    name: "Emma Davis",
    position: "Goalkeeper",
    year: "Freshman",
    hometown: "Lubbock, TX",
  },
];

export const news: NewsArticle[] = [
  {
    id: "1",
    title: "Volleyball earns top seed in region tournament",
    excerpt:
      "The Lady Bears clinch the No. 1 seed after a dominant weekend at home.",
    date: "Oct 1, 2025",
    sport: "volleyball",
  },
  {
    id: "2",
    title: "Basketball opens conference play in January",
    excerpt:
      "Coach Patterson previews the 2025–26 schedule and returning starters.",
    date: "Dec 15, 2025",
    sport: "basketball",
  },
  {
    id: "3",
    title: "Soccer signs three All-Region honorees",
    excerpt:
      "Program recognition highlights another historic fall on the pitch.",
    date: "Nov 20, 2025",
    sport: "soccer",
  },
];

export function getSport(slug: string): Sport | undefined {
  return sports.find((s) => s.slug === slug);
}

export function getGamesBySport(slug: SportSlug): Game[] {
  return games.filter((g) => g.sport === slug);
}

export function getPlayersBySport(slug: SportSlug): Player[] {
  return players.filter((p) => p.sport === slug);
}
