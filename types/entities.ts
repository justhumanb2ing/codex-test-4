export interface Book {
  id: string;
  title: string;
  author: string;
  publishedAt: string;
  summary?: string;
  keywords: string[];
}

export interface Emotion {
  id: string;
  label: string;
  intensity: number;
  colorCode?: string;
}

export interface Keyword {
  id: string;
  value: string;
  category?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  achievedAt: string;
  relatedBookIds?: string[];
}
