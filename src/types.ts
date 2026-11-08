export interface WritingPrompt {
  id: string;
  title: string;
  premise: string;
  culturalAnchor: string;
  openingLine: string;
  genre: string;
  themes: string[];
  suggestedLength: string;
  isFavorite?: boolean;
}

export interface Draft {
  id: string;
  title: string;
  content: string;
  genre: string;
  wordCount: number;
  createdAt: number;
  updatedAt: number;
  promptUsed?: string;
  targetWordCount?: number;
  status: 'draft' | 'submitted' | 'published';
}

export interface WritingGoal {
  dailyWordGoal: number;
  todayWords: number;
  currentStreak: number;
  longestStreak: number;
  totalWordsWritten: number;
  sprintMinutes: number;
  lastActiveDate: string; // YYYY-MM-DD
}

export interface FolkloreEntry {
  id: string;
  name: string;
  culture: 'Yoruba' | 'Igbo' | 'Hausa' | 'Efik/Ibibio' | 'Edo/Benin' | 'Pan-Nigerian';
  category: 'Deity / Orisha' | 'Cosmology' | 'Mythical Creature' | 'Legendary Hero' | 'Sacred Geometry';
  summary: string;
  storySeed: string;
  associatedSymbols: string[];
  literaryReference?: string;
}

export interface SlangTerm {
  term: string;
  literalMeaning: string;
  actualUsage: string;
  sampleDialogue: string;
  region: string;
}

export interface LiteraryMaster {
  name: string;
  lifespan: string;
  notableWorks: string[];
  craftAdvice: string;
  quote: string;
  focusGenre: string;
}

export interface HistoricalEpoch {
  id: string;
  title: string;
  period: string;
  location: string;
  narrativeOverview: string;
  writingHook: string;
  keyThemes: string[];
}

export interface Contest {
  id: string;
  title: string;
  prizeNaira: string;
  prizeUSD: string;
  sponsor: string;
  deadline: string;
  daysRemaining: number;
  wordLimit: string;
  themePrompt: string;
  genre: string;
  entryFee: string;
  judges: string[];
  imagePath: string;
  rules: string[];
}

export interface Submission {
  id: string;
  contestId: string;
  contestTitle: string;
  draftId: string;
  storyTitle: string;
  submittedAt: string;
  status: 'Received' | 'Under Review' | 'Shortlisted' | 'Winner';
  feedbackNotes?: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorLocation: string;
  avatarUrl: string;
  title: string;
  excerpt: string;
  fullText: string;
  genre: string;
  tags: string[];
  likes: number;
  hasLiked?: boolean;
  claps: number;
  publishedAt: string;
  commentsCount: number;
  comments?: Array<{
    id: string;
    author: string;
    text: string;
    time: string;
    isCritique?: boolean;
  }>;
}
