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

export type NewsBlock =
  | { type: "text"; value: string }
  | { type: "image"; src: string; alt: string };

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  sport?: SportSlug;
  coverImage?: string;
  blocks?: NewsBlock[];
  body?: string[];
  sourceUrl?: string;
}

export const site = {
  schoolName: "Lady Slay D123",
  programName: "Women's Athletics",
  tagline: "Compete with purpose. Graduate with pride.",
  
};

export const sports: Sport[] = [
  

];

export const games: Game[] = [
  
  
];

export const players: Player[] = [
  
  
  
];

export const news: NewsArticle[] = [
  {
    id: "4",
    title: "Mizzou Women's Basketball Team Receives Five Promising Players",
    excerpt:
      "As the new school year begins, sports teams across the country receive incoming players, whether they are freshman athletes excited to start their collegiate journey or older students looking for a change of pace.",
    date: "Aug 2, 2026",
    sport: "basketball",
    coverImage: "/images/news/mizzou-wbb-recruits-1.png",
    blocks: [
      {
        type: "image",
        src: "/images/news/mizzou-wbb-recruits-1.png",
        alt: "Mizzou Women's Basketball incoming recruits",
      },
      {
        type: "text",
        value: "(Sourced from the Mizzou Women's Basketball Instagram)",
      },
      {
        type: "text",
        value:
          "The Mizzou Women's basketball team has five incoming students to their team. Natalya Hodges, are eager to start the season. Hodges, who is from Knoxville, Tennessee, will be starting on the Mizzou Women's basketball team as guard. She has a well-built career as a player with a score of over 3,000 points and three appearances at state tournament appearances. Hodges says she chose Mizzou because of how \"the staff came together and how family oriented they is.\" She also appreciated how dedicated the coaches and staff are in \"what they should do and how they should teach us and what we should grow into.\" Feeling at home with a team is what makes a great team both on and off the court.",
      },
      {
        type: "text",
        value:
          "Jada Maples is another incoming player to the Mizzou Women's Basketball team. Maples is another great addition to the team who comes from Earle Arkansas and will be playing guard on the team. She went to Arkansas' state championship earlier this year and was named Class 1A's Most Outstanding Player. This year she also signed a collab deal with Primetime Lab, which is a hub for basketball training based out of West Memphis, Arkansas. Among her numerous offers she chose Mizzou as her home for the next four years because she feels good about \"what's to come on the team\" and she believes that she will be able to help with the progress of the program.",
      },
      {
        type: "text",
        value:
          "Ellie Muller is another incoming freshman to the team. She comes from West Des Moines, Iowa and will be playing forward in the new school year. She's been to the Iowa State championships four times along with being selected for Iowa All-State. She currently has a career record of 300 blocks as well as 1,000 career rebounds and her totals will grow as she joins Mizzou's ranks. Muller chose Mizzou because when she talked to the team's coach and was on campus, she said she could \"see herself here\" in the future.",
      },
      {
        type: "text",
        value:
          "Khloe Ford is a four-time state champion from Hoover, Alabama and another incoming freshman on the Mizzou Women's basketball team. She is a forward player and she has numerous achievements such as the Birmingham Region Player of the Year and Miss Basketball for the state of Alabama. Ford picked Mizzou out of her numerous offers because when she was touring other schools during her senior year she \"just kept thinking about Missouri\" and she knew that \"Missouri was home.\" The final incoming freshman on the Mizzou Women's basketball team is Cecile Brandimore. She is a two-time Tennessee all-state selection and has over 2,000 career points. She chose Mizzou as her place to be for the next four years because Mizzou had more benefits than \"downfalls.\"",
      },
      {
        type: "text",
        value:
          "With this new bunch of players, Mizzou may be shaping up to have a better season than in the past couple of years.",
      },
      {
        type: "image",
        src: "/images/news/mizzou-wbb-recruits-2.png",
        alt: "Mizzou Women's Basketball team photo",
      },
      {
        type: "text",
        value: "(Sourced from the Mizzou Women's Basketball Instagram)",
      },
    ],
    sourceUrl:
      "https://mutigers.com/sports/womens-basketball/news/year/2024?page=6&view=list",
  },
  
  
];

export function getSport(slug: string): Sport | undefined {
  return sports.find((s) => s.slug === slug);
}

export function getNewsArticle(id: string): NewsArticle | undefined {
  return news.find((a) => a.id === id);
}

export function getGamesBySport(slug: SportSlug): Game[] {
  return games.filter((g) => g.sport === slug);
}

export function getPlayersBySport(slug: SportSlug): Player[] {
  return players.filter((p) => p.sport === slug);
}
