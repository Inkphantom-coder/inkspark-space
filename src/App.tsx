import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PromptGenerator } from './components/PromptGenerator';
import { WritingStudio } from './components/WritingStudio';
import { ResearchHub } from './components/ResearchHub';
import { CommunityFeed } from './components/CommunityFeed';
import { WriteToEarn } from './components/WriteToEarn';
import { DailyGoalsModal } from './components/DailyGoalsModal';
import {
  Draft,
  WritingGoal,
  WritingPrompt,
  Submission,
  CommunityPost,
} from './types';
import {
  loadDrafts,
  saveDrafts,
  getActiveDraftId,
  setActiveDraftId,
  loadGoals,
  saveGoals,
  loadFavoritePromptIds,
  saveFavoritePromptIds,
  loadSubmissions,
  saveSubmissions,
} from './utils/storage';
import { INITIAL_PROMPTS, COMMUNITY_POSTS } from './data/mockData';

export default function App() {
  // Navigation & Theme
  const [activeTab, setActiveTab] = useState<'prompts' | 'studio' | 'research' | 'community' | 'contests'>('prompts');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('inkspark_theme_dark') === 'true';
  });
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  // Core Data States
  const [drafts, setDrafts] = useState<Draft[]>(() => loadDrafts());
  const [activeDraftId, setActiveDraftIdState] = useState<string>(() => getActiveDraftId());
  const [goals, setGoals] = useState<WritingGoal>(() => loadGoals());
  const [prompts, setPrompts] = useState<WritingPrompt[]>(() => INITIAL_PROMPTS);
  const [favoritePromptIds, setFavoritePromptIds] = useState<string[]>(() => loadFavoritePromptIds());
  const [submissions, setSubmissions] = useState<Submission[]>(() => loadSubmissions());
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => COMMUNITY_POSTS);

  // Modals & ephemeral state
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);
  const [isGeneratingPrompts, setIsGeneratingPrompts] = useState(false);
  const [selectedContestIdForModal, setSelectedContestIdForModal] = useState<string | null>(null);

  // Sync theme with html.dark
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('inkspark_theme_dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('inkspark_theme_dark', 'false');
    }
  }, [isDarkMode]);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync active draft
  const activeDraft = drafts.find((d) => d.id === activeDraftId) || drafts[0];

  const handleSelectDraft = (id: string) => {
    setActiveDraftIdState(id);
    setActiveDraftId(id);
  };

  const handleCreateDraft = (initialTitle?: string, initialContent?: string, genre?: string) => {
    const newDraft: Draft = {
      id: `draft-${Date.now()}`,
      title: initialTitle || 'Untitled Story',
      content: initialContent || '',
      genre: genre || 'Literary Fiction',
      wordCount: initialContent ? initialContent.trim().split(/\s+/).filter(Boolean).length : 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      targetWordCount: goals.dailyWordGoal || 500,
      status: 'draft',
    };

    const updated = [newDraft, ...drafts];
    setDrafts(updated);
    saveDrafts(updated);
    setActiveDraftIdState(newDraft.id);
    setActiveDraftId(newDraft.id);
    return newDraft;
  };

  const handleUpdateDraft = (id: string, updates: Partial<Draft>) => {
    setDrafts((prev) => {
      const updated = prev.map((d) => (d.id === id ? { ...d, ...updates, updatedAt: Date.now() } : d));
      saveDrafts(updated);
      return updated;
    });
  };

  const handleDeleteDraft = (id: string) => {
    if (drafts.length <= 1) return;
    const filtered = drafts.filter((d) => d.id !== id);
    setDrafts(filtered);
    saveDrafts(filtered);
    if (activeDraftId === id) {
      const nextId = filtered[0].id;
      setActiveDraftIdState(nextId);
      setActiveDraftId(nextId);
    }
  };

  // Goal updates
  const handleUpdateGoalWords = (wordsAdded: number) => {
    setGoals((prev) => {
      const updated = {
        ...prev,
        todayWords: prev.todayWords + wordsAdded,
        totalWordsWritten: prev.totalWordsWritten + wordsAdded,
      };
      saveGoals(updated);
      return updated;
    });
  };

  const handleSaveGoalTarget = (newDailyTarget: number) => {
    setGoals((prev) => {
      const updated = { ...prev, dailyWordGoal: newDailyTarget };
      saveGoals(updated);
      return updated;
    });
  };

  // Prompts favorites
  const handleToggleFavoritePrompt = (id: string) => {
    setFavoritePromptIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id];
      saveFavoritePromptIds(updated);
      return updated;
    });
  };

  // Generate Prompts with API
  const handleGenerateNewPrompts = async (
    keywords: string,
    genre: string,
    tone: string,
    themes: string[]
  ) => {
    setIsGeneratingPrompts(true);
    try {
      const res = await fetch('/api/prompts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords, genre, tone, themes }),
      });
      const data = await res.json();
      if (data.prompts && data.prompts.length > 0) {
        setPrompts((prev) => [...data.prompts, ...prev]);
      }
    } catch (err) {
      console.error('Failed to generate prompts:', err);
    } finally {
      setIsGeneratingPrompts(false);
    }
  };

  // Cross-linking actions
  const handleStartWritingWithPrompt = (prompt: WritingPrompt) => {
    handleCreateDraft(
      prompt.title,
      `${prompt.openingLine}\n\n`,
      prompt.genre
    );
    setActiveTab('studio');
  };

  const handleUseSeedInStudio = (seedTitle: string, seedContent: string) => {
    handleCreateDraft(seedTitle, seedContent);
    setActiveTab('studio');
  };

  const handleOpenContestsWithDraft = (draft: Draft) => {
    setSelectedContestIdForModal('contest-1');
    setActiveTab('contests');
  };

  const handleShareToCommunityWithDraft = (draft: Draft) => {
    setActiveTab('community');
  };

  // Community Interactions
  const handleToggleLike = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextLiked = !p.hasLiked;
          return {
            ...p,
            hasLiked: nextLiked,
            likes: nextLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
          };
        }
        return p;
      })
    );
  };

  const handleClap = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, claps: p.claps + 1 } : p))
    );
  };

  const handleAddComment = (postId: string, text: string, isCritique: boolean) => {
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            author: 'You (Writer)',
            text,
            time: 'Just now',
            isCritique,
          };
          return {
            ...p,
            commentsCount: (p.commentsCount || 0) + 1,
            comments: [...(p.comments || []), newComment],
          };
        }
        return p;
      })
    );
  };

  const handlePublishDraft = (newPostData: Partial<CommunityPost>) => {
    const post: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: newPostData.authorName || 'Anonymous Writer',
      authorRole: newPostData.authorRole || 'Storyteller',
      authorLocation: newPostData.authorLocation || 'Lagos, Nigeria',
      avatarUrl: newPostData.avatarUrl || '/src/assets/images/writer_feyikemi_avatar_1794134391972.jpg',
      title: newPostData.title || 'Untitled Story',
      excerpt: newPostData.excerpt || '',
      fullText: newPostData.fullText || '',
      genre: newPostData.genre || 'Flash Fiction',
      tags: newPostData.tags || ['NigerianStory'],
      likes: 1,
      claps: 5,
      hasLiked: true,
      publishedAt: 'Just now',
      commentsCount: 0,
      comments: [],
    };
    setCommunityPosts([post, ...communityPosts]);
  };

  // Submissions for Contests
  const handleAddSubmission = (submission: Submission) => {
    const updated = [submission, ...submissions];
    setSubmissions(updated);
    saveSubmissions(updated);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 transition-colors dark:bg-[#0D1512] dark:text-[#EDE8E1] flex flex-col justify-between">
      <div>
        {/* Navigation Bar strictly following Top Bar Contract */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          isOffline={isOffline}
          onOpenGoals={() => setIsGoalsModalOpen(true)}
          currentStreak={goals.currentStreak}
        />

        {/* Tab Views */}
        <main className="pb-16">
          {activeTab === 'prompts' && (
            <PromptGenerator
              prompts={prompts}
              favoriteIds={favoritePromptIds}
              toggleFavorite={handleToggleFavoritePrompt}
              onStartWritingWithPrompt={handleStartWritingWithPrompt}
              onGenerateNewPrompts={handleGenerateNewPrompts}
              isGenerating={isGeneratingPrompts}
            />
          )}

          {activeTab === 'studio' && (
            <WritingStudio
              drafts={drafts}
              activeDraft={activeDraft}
              onSelectDraft={handleSelectDraft}
              onCreateDraft={() => handleCreateDraft()}
              onUpdateDraft={handleUpdateDraft}
              onDeleteDraft={handleDeleteDraft}
              goal={goals}
              onUpdateGoalWords={handleUpdateGoalWords}
              onOpenGoalsModal={() => setIsGoalsModalOpen(true)}
              onOpenContestsWithDraft={handleOpenContestsWithDraft}
              onShareToCommunityWithDraft={handleShareToCommunityWithDraft}
              isOffline={isOffline}
            />
          )}

          {activeTab === 'research' && (
            <ResearchHub onUseSeedInStudio={handleUseSeedInStudio} />
          )}

          {activeTab === 'community' && (
            <CommunityFeed
              posts={communityPosts}
              onToggleLike={handleToggleLike}
              onClap={handleClap}
              onAddComment={handleAddComment}
              onPublishDraft={handlePublishDraft}
              userDrafts={drafts}
            />
          )}

          {activeTab === 'contests' && (
            <WriteToEarn
              submissions={submissions}
              onAddSubmission={handleAddSubmission}
              userDrafts={drafts}
              initialSelectedContestId={selectedContestIdForModal}
            />
          )}
        </main>
      </div>

      {/* Footer strictly adhering to Anti-Slop Discipline */}
      <footer className="border-t border-[#E6E1D8] bg-[#FBF9F5] py-8 dark:border-[#222E28] dark:bg-[#0D1512]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-['Playfair_Display'] font-bold text-[#0A4228] dark:text-[#4ade80]">
              InkSpark Studio
            </span>
            <span aria-hidden="true">·</span>
            <span>Dedicated to the living art of Nigerian and African storytelling</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Offline-First Writing Sanctuary</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsGoalsModalOpen(true)}
              className="hover:text-stone-800 dark:hover:text-white"
            >
              Daily Goals: {goals.todayWords}/{goals.dailyWordGoal}w
            </button>
            <span aria-hidden="true">·</span>
            <span>© 2026 InkSpark</span>
          </div>
        </div>
      </footer>

      {/* Daily Goals Modal */}
      <DailyGoalsModal
        isOpen={isGoalsModalOpen}
        onClose={() => setIsGoalsModalOpen(false)}
        goal={goals}
        onSaveGoal={handleSaveGoalTarget}
      />
    </div>
  );
}
