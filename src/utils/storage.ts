import { Draft, WritingGoal, Submission, WritingPrompt } from '../types';
import { INITIAL_PROMPTS } from '../data/mockData';

const STORAGE_KEYS = {
  DRAFTS: 'inkspark_drafts_v1',
  CURRENT_DRAFT_ID: 'inkspark_active_draft_id',
  GOALS: 'inkspark_goals_v1',
  FAVORITE_PROMPTS: 'inkspark_fav_prompts_v1',
  SUBMISSIONS: 'inkspark_submissions_v1',
  DARK_MODE: 'inkspark_theme_dark',
};

export const getTodayKey = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const initialDraft: Draft = {
  id: 'draft-initial',
  title: 'Memories of the Third Mainland Bridge',
  content: `The Atlantic breeze was thick with diesel exhaust and the sharp smell of roasted plantain from the bus terminus.

It was 9:45 PM on a Tuesday, and Carter Bridge looked like an unbroken chain of red and amber fireflies as thousands of yellow commercial buses nudged each other forward in the famous Lagos go-slow.

Adejoke leaned against the rusted railing. In her woven raffia tote lay three things: her grandfather's brass letter opener from the old Post Office in Marina, a notebook half-filled with Yoruba botanical names, and a letter stamped in London thirty-two years ago.

"Sister, enter with your fifty naira change!" the conductor barked, slapping the corrugated metal roof of the Danfo with a copper coin. "Ojuelegba straight! No enter if you get one thousand naira note o!"`,
  genre: 'Lagos Noir / Literary Fiction',
  wordCount: 135,
  createdAt: Date.now() - 3600000 * 2,
  updatedAt: Date.now() - 3600000 * 2,
  targetWordCount: 500,
  status: 'draft',
};

// Drafts
export const loadDrafts = (): Draft[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DRAFTS);
    if (!raw) {
      saveDrafts([initialDraft]);
      return [initialDraft];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [initialDraft];
  } catch {
    return [initialDraft];
  }
};

export const saveDrafts = (drafts: Draft[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
  } catch (e) {
    console.error('Failed to save drafts:', e);
  }
};

export const getActiveDraftId = (): string => {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_DRAFT_ID) || 'draft-initial';
};

export const setActiveDraftId = (id: string) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_DRAFT_ID, id);
};

// Goals & Streaks
const DEFAULT_GOAL: WritingGoal = {
  dailyWordGoal: 500,
  todayWords: 135,
  currentStreak: 4,
  longestStreak: 7,
  totalWordsWritten: 4820,
  sprintMinutes: 25,
  lastActiveDate: getTodayKey(),
};

export const loadGoals = (): WritingGoal => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GOALS);
    if (!raw) {
      saveGoals(DEFAULT_GOAL);
      return DEFAULT_GOAL;
    }
    const parsed: WritingGoal = JSON.parse(raw);
    const today = getTodayKey();

    // Check streak rollover
    if (parsed.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

      if (parsed.lastActiveDate === yesterdayKey) {
        // Continuous streak maintained!
        parsed.todayWords = 0;
      } else {
        // Streak broken if gap was > 1 day
        parsed.currentStreak = 1;
        parsed.todayWords = 0;
      }
      parsed.lastActiveDate = today;
      saveGoals(parsed);
    }
    return parsed;
  } catch {
    return DEFAULT_GOAL;
  }
};

export const saveGoals = (goals: WritingGoal) => {
  try {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  } catch (e) {
    console.error('Failed to save goals:', e);
  }
};

// Favorites
export const loadFavoritePromptIds = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITE_PROMPTS);
    return raw ? JSON.parse(raw) : ['prompt-1', 'prompt-2'];
  } catch {
    return ['prompt-1', 'prompt-2'];
  }
};

export const saveFavoritePromptIds = (ids: string[]) => {
  localStorage.setItem(STORAGE_KEYS.FAVORITE_PROMPTS, JSON.stringify(ids));
};

// Submissions
export const loadSubmissions = (): Submission[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    return raw
      ? JSON.parse(raw)
      : [
          {
            id: 'sub-1',
            contestId: 'contest-1',
            contestTitle: 'The Eko Twilight Speculative Fiction Prize',
            draftId: 'draft-initial',
            storyTitle: 'Memories of the Third Mainland Bridge',
            submittedAt: 'Nov 05, 2026',
            status: 'Under Review',
            feedbackNotes: 'Passed initial editorial screening. Assigned to Round 2 jury review.',
          },
        ];
  } catch {
    return [];
  }
};

export const saveSubmissions = (subs: Submission[]) => {
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(subs));
};
