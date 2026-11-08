import React from 'react';
import { Feather, BookOpen, PenTool, Award, Users, Sun, Moon, Wifi, WifiOff } from 'lucide-react';

interface NavbarProps {
  activeTab: 'prompts' | 'studio' | 'research' | 'community' | 'contests';
  setActiveTab: (tab: 'prompts' | 'studio' | 'research' | 'community' | 'contests') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isOffline: boolean;
  onOpenGoals: () => void;
  currentStreak: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  toggleDarkMode,
  isOffline,
  onOpenGoals,
  currentStreak,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E6E1D8] bg-[#FBF9F5]/90 backdrop-blur-md dark:border-[#222E28] dark:bg-[#0D1512]/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (Single line, characterful Nigerian typography) */}
        <button
          onClick={() => setActiveTab('prompts')}
          className="flex items-center gap-2.5 text-left text-xl font-bold tracking-tight text-[#0A4228] transition-opacity hover:opacity-90 dark:text-[#E8F5EE]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A4228] text-white shadow-sm dark:bg-[#157347]">
            <Feather className="h-4 w-4" />
          </div>
          <span className="font-['Playfair_Display'] text-xl font-black tracking-tight">
            InkSpark
          </span>
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden items-center gap-7 md:flex text-sm font-medium">
          <button
            onClick={() => setActiveTab('prompts')}
            className={`whitespace-nowrap transition-colors hover:text-[#0A4228] dark:hover:text-[#4ade80] ${
              activeTab === 'prompts'
                ? 'font-semibold text-[#0A4228] underline decoration-[#C05621] decoration-2 underline-offset-8 dark:text-[#4ade80]'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            Writing Prompts
          </button>
          <button
            onClick={() => setActiveTab('studio')}
            className={`whitespace-nowrap transition-colors hover:text-[#0A4228] dark:hover:text-[#4ade80] ${
              activeTab === 'studio'
                ? 'font-semibold text-[#0A4228] underline decoration-[#C05621] decoration-2 underline-offset-8 dark:text-[#4ade80]'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            Writing Studio
          </button>
          <button
            onClick={() => setActiveTab('research')}
            className={`whitespace-nowrap transition-colors hover:text-[#0A4228] dark:hover:text-[#4ade80] ${
              activeTab === 'research'
                ? 'font-semibold text-[#0A4228] underline decoration-[#C05621] decoration-2 underline-offset-8 dark:text-[#4ade80]'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            Research Archives
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`whitespace-nowrap transition-colors hover:text-[#0A4228] dark:hover:text-[#4ade80] ${
              activeTab === 'community'
                ? 'font-semibold text-[#0A4228] underline decoration-[#C05621] decoration-2 underline-offset-8 dark:text-[#4ade80]'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            Writer Community
          </button>
          <button
            onClick={() => setActiveTab('contests')}
            className={`whitespace-nowrap transition-colors hover:text-[#0A4228] dark:hover:text-[#4ade80] ${
              activeTab === 'contests'
                ? 'font-semibold text-[#0A4228] underline decoration-[#C05621] decoration-2 underline-offset-8 dark:text-[#4ade80]'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            Write-to-Earn
          </button>
        </nav>

        {/* Zone 3: Primary Action & Status Affordances */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Offline status indicator */}
          <div
            title={isOffline ? 'Offline Mode Active - Auto-saving to local storage' : 'Connected to InkSpark Cloud'}
            className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 px-2 py-1 rounded-md bg-stone-100 dark:bg-stone-800"
          >
            {isOffline ? (
              <>
                <WifiOff className="h-3.5 w-3.5 text-amber-600" />
                <span className="hidden sm:inline">Offline</span>
              </>
            ) : (
              <>
                <Wifi className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">Online</span>
              </>
            )}
          </div>

          {/* Daily Streak Trigger */}
          <button
            onClick={onOpenGoals}
            title="View Daily Goals & Writing Streaks"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#B94700] hover:text-[#913700] dark:text-amber-400 px-2.5 py-1.5 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/30 transition-colors"
          >
            <span role="img" aria-label="fire">🔥</span>
            <span>{currentStreak}d Streak</span>
          </button>

          {/* Dark Mode Switch */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle visual theme"
            className="rounded-lg p-2 text-stone-600 hover:bg-stone-200/60 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => setActiveTab('studio')}
            className="rounded-lg bg-[#0A4228] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#07321e] active:scale-[0.98] transition-all dark:bg-[#126b42] dark:hover:bg-[#167d4e] whitespace-nowrap"
          >
            Enter Studio
          </button>
        </div>
      </div>

      {/* Mobile Bar below header */}
      <div className="flex md:hidden border-t border-[#E6E1D8] dark:border-[#222E28] overflow-x-auto py-2 px-3 gap-2 bg-[#FBF9F5] dark:bg-[#0D1512] text-xs">
        <button
          onClick={() => setActiveTab('prompts')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'prompts' ? 'bg-[#0A4228] text-white' : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          Prompts
        </button>
        <button
          onClick={() => setActiveTab('studio')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'studio' ? 'bg-[#0A4228] text-white' : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          Studio
        </button>
        <button
          onClick={() => setActiveTab('research')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'research' ? 'bg-[#0A4228] text-white' : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          Archives
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'community' ? 'bg-[#0A4228] text-white' : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          Community
        </button>
        <button
          onClick={() => setActiveTab('contests')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'contests' ? 'bg-[#0A4228] text-white' : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          Contests
        </button>
      </div>
    </header>
  );
};
