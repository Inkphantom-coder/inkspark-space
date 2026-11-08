import React, { useState } from 'react';
import { Target, Flame, Trophy, Award, X, Check, Calendar, Clock } from 'lucide-react';
import { WritingGoal } from '../types';

interface DailyGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: WritingGoal;
  onSaveGoal: (newDailyTarget: number) => void;
}

export const DailyGoalsModal: React.FC<DailyGoalsModalProps> = ({
  isOpen,
  onClose,
  goal,
  onSaveGoal,
}) => {
  const [target, setTarget] = useState<number>(goal.dailyWordGoal || 500);

  if (!isOpen) return null;

  const progressPercent = Math.min(100, Math.round((goal.todayWords / target) * 100));

  const badges = [
    {
      name: 'First Spark',
      desc: 'Wrote your first manuscript draft',
      unlocked: true,
      icon: '✨',
    },
    {
      name: 'Lagos Sprinter',
      desc: 'Completed a 15-minute high-focus writing sprint',
      unlocked: true,
      icon: '⚡',
    },
    {
      name: 'Naija Word Warrior',
      desc: 'Reached 500 words written in a single day',
      unlocked: goal.todayWords >= 500 || goal.totalWordsWritten > 1000,
      icon: '🔥',
    },
    {
      name: 'Folklore Custodian',
      desc: 'Explored cultural archives and incorporated heritage lore',
      unlocked: true,
      icon: '📜',
    },
    {
      name: 'Prize Contender',
      desc: 'Submitted an original story to Write-to-Earn',
      unlocked: true,
      icon: '🏆',
    },
  ];

  const handleSave = () => {
    onSaveGoal(target);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-[#121B17] border border-[#E6E1D8] dark:border-[#222E28] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-[#0A4228] dark:text-[#4ade80]" />
            <h3 className="font-['Playfair_Display'] text-xl font-bold text-stone-900 dark:text-white">
              Daily Writing Target & Streaks
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Streak & Today Metrics */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl border border-amber-200/60 bg-amber-50/60 p-3 dark:border-amber-900/40 dark:bg-amber-950/20">
            <div className="text-xl font-black text-[#B94700] dark:text-amber-400 font-mono">
              {goal.currentStreak} Days
            </div>
            <div className="text-[11px] font-medium text-stone-500 mt-1">Current Streak 🔥</div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-900/50">
            <div className="text-xl font-black text-stone-900 dark:text-white font-mono">
              {goal.todayWords}
            </div>
            <div className="text-[11px] font-medium text-stone-500 mt-1">Words Today</div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-900/50">
            <div className="text-xl font-black text-stone-900 dark:text-white font-mono">
              {goal.totalWordsWritten}
            </div>
            <div className="text-[11px] font-medium text-stone-500 mt-1">Lifetime Words</div>
          </div>
        </div>

        {/* Today's Goal Progress */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              Today's Word Goal Progress: {progressPercent}%
            </span>
            <span className="font-mono text-stone-500">
              {goal.todayWords} / {target} words
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
            <div
              className="h-full bg-[#0A4228] transition-all duration-300 dark:bg-[#157347]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Set Target Selector */}
        <div className="mt-6">
          <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
            Choose Your Daily Target
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[250, 500, 750, 1000].map((count) => (
              <button
                key={count}
                onClick={() => setTarget(count)}
                className={`rounded-xl py-2 text-xs font-semibold transition-colors ${
                  target === count
                    ? 'bg-[#0A4228] text-white shadow-xs dark:bg-[#157347]'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                }`}
              >
                {count} words
              </button>
            ))}
          </div>
        </div>

        {/* Unlockable Badges */}
        <div className="mt-8 border-t border-stone-100 pt-6 dark:border-stone-800">
          <div className="text-xs font-bold text-stone-800 dark:text-stone-200 mb-3 flex items-center gap-1.5">
            <Trophy className="h-4 w-4 text-[#B94700] dark:text-amber-400" />
            <span>Writer Milestone Badges</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {badges.map((b) => (
              <div
                key={b.name}
                className={`flex items-start gap-2.5 rounded-xl p-2.5 text-xs border ${
                  b.unlocked
                    ? 'border-emerald-200/80 bg-emerald-50/50 dark:border-emerald-950/60 dark:bg-emerald-950/20'
                    : 'border-stone-200 opacity-50 dark:border-stone-800'
                }`}
              >
                <span className="text-xl">{b.icon}</span>
                <div>
                  <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1">
                    <span>{b.name}</span>
                    {b.unlocked && <Check className="h-3 w-3 text-emerald-600" />}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-xl bg-[#0A4228] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#07321e] dark:bg-[#157347]"
          >
            Save Target
          </button>
        </div>
      </div>
    </div>
  );
};
