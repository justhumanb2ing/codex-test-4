export interface Book {
  id: string;
  userId: string;
  title: string;
  author: string;
  summary?: string | null;
  publishedAt: string;
  createdAt: string;
}

export interface Emotion {
  id: string;
  userId: string;
  bookId?: string | null;
  label: string;
  intensity: number;
  colorCode?: string | null;
  createdAt: string;
}

export interface Keyword {
  id: string;
  userId: string;
  value: string;
  category?: string | null;
  createdAt: string;
}

export interface BookKeyword {
  bookId: string;
  keywordId: string;
  userId: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  achievedAt: string;
  createdAt: string;
}

export interface AchievementBook {
  achievementId: string;
  bookId: string;
  userId: string;
  createdAt: string;
}
