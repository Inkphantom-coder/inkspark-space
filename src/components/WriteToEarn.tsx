import React, { useState } from 'react';
import { Award, Clock, DollarSign, CheckCircle2, ChevronRight, PenTool, X, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Contest, Submission, Draft } from '../types';
import { CONTESTS_DATA } from '../data/mockData';

interface WriteToEarnProps {
  submissions: Submission[];
  onAddSubmission: (submission: Submission) => void;
  userDrafts: Draft[];
  initialSelectedContestId?: string | null;
}

export const WriteToEarn: React.FC<WriteToEarnProps> = ({
  submissions,
  onAddSubmission,
  userDrafts,
  initialSelectedContestId,
}) => {
  const [activeTab, setActiveTab] = useState<'contests' | 'submissions'>('contests');
  const [selectedContest, setSelectedContest] = useState<Contest | null>(
    CONTESTS_DATA.find((c) => c.id === initialSelectedContestId) || null
  );
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [contestForModal, setContestForModal] = useState<Contest | null>(null);
  const [selectedDraftId, setSelectedDraftId] = useState<string>(userDrafts[0]?.id || '');

  const openSubmitModal = (contest: Contest) => {
    setContestForModal(contest);
    setShowSubmitModal(true);
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contestForModal) return;
    const draft = userDrafts.find((d) => d.id === selectedDraftId) || userDrafts[0];
    if (!draft) return;

    const newSubmission: Submission = {
      id: `sub-${Date.now()}`,
      contestId: contestForModal.id,
      contestTitle: contestForModal.title,
      draftId: draft.id,
      storyTitle: draft.title || 'Untitled Story',
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Received',
      feedbackNotes: 'Manuscript logged in jury docket. Editorial screening will conclude 14 days before deadline.',
    };

    onAddSubmission(newSubmission);
    setShowSubmitModal(false);
    setActiveTab('submissions');
    confetti({ particleCount: 90, spread: 70 });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-6 dark:border-stone-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#B94700] dark:text-amber-400 mb-1">
            Write-to-Earn Literary Grants & Competitions
          </div>
          <h1 className="font-['Playfair_Display'] text-3xl font-extrabold text-stone-900 dark:text-white">
            Publishing Prizes & Cash Grants
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
            Submit your finished fiction and essays to verified Nigerian literary competitions and partner anthologies with cash prizes in Naira and USD.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 rounded-xl bg-stone-100 p-1 dark:bg-stone-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('contests')}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
              activeTab === 'contests'
                ? 'bg-white text-[#0A4228] shadow-xs dark:bg-stone-900 dark:text-white'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            Active Competitions ({CONTESTS_DATA.length})
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
              activeTab === 'submissions'
                ? 'bg-white text-[#0A4228] shadow-xs dark:bg-stone-900 dark:text-white'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            My Submissions ({submissions.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Active Contests Grid */}
      {activeTab === 'contests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTESTS_DATA.map((contest) => (
            <div
              key={contest.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E6E1D8] bg-white shadow-xs hover:border-[#0A4228]/50 hover:shadow-md transition-all dark:border-[#222E28] dark:bg-[#121B17]"
            >
              <div>
                {/* Visual Header */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={contest.imagePath}
                    alt={contest.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wide">
                        {contest.genre}
                      </div>
                      <div className="font-mono text-lg font-black text-white">
                        {contest.prizeNaira} <span className="text-xs font-normal text-stone-300">({contest.prizeUSD})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] bg-black/40 px-2 py-1 rounded backdrop-blur-xs">
                      <Clock className="h-3 w-3 text-amber-400" />
                      <span>{contest.daysRemaining}d left</span>
                    </div>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5">
                  <h3 className="font-['Playfair_Display'] text-lg font-bold text-stone-900 dark:text-white group-hover:text-[#0A4228] dark:group-hover:text-[#4ade80] transition-colors">
                    {contest.title}
                  </h3>
                  <div className="text-[11px] text-stone-500 mt-1">
                    Sponsor: <span className="font-medium text-stone-700 dark:text-stone-300">{contest.sponsor}</span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                    {contest.themePrompt}
                  </p>

                  <div className="mt-4 space-y-1.5 border-t border-stone-100 pt-3 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Word Limit:</span>
                      <span className="font-semibold text-stone-800 dark:text-stone-200">{contest.wordLimit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Entry:</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{contest.entryFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Deadline:</span>
                      <span>{contest.deadline}</span>
                    </div>
                  </div>

                  {/* Jury */}
                  <div className="mt-3 pt-2 text-[11px] text-stone-400">
                    <span>Jury: </span>
                    <span className="text-stone-600 dark:text-stone-300">{contest.judges.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => openSubmitModal(contest)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A4228] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#07321e] active:scale-[0.98] transition-all dark:bg-[#157347]"
                >
                  <Award className="h-3.5 w-3.5" />
                  <span>Submit Story to Prize</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: My Submissions Tracker */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          {submissions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 p-12 text-center dark:border-stone-700">
              <Award className="mx-auto h-8 w-8 text-stone-400 mb-2" />
              <h3 className="text-base font-semibold text-stone-900 dark:text-white">
                No active contest submissions yet
              </h3>
              <p className="mt-1 text-xs text-stone-500">
                Finish drafting your story in the Studio, then click "Submit Story to Prize" above!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="rounded-2xl border border-[#E6E1D8] bg-white p-6 shadow-xs dark:border-[#222E28] dark:bg-[#121B17] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                      <span>Submitted on {sub.submittedAt}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-[#0A4228] dark:text-[#4ade80]">{sub.contestTitle}</span>
                    </div>
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-stone-900 dark:text-white">
                      {sub.storyTitle}
                    </h3>
                    {sub.feedbackNotes && (
                      <p className="mt-2 text-xs text-stone-600 dark:text-stone-300 italic">
                        "{sub.feedbackNotes}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        sub.status === 'Shortlisted'
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200'
                          : sub.status === 'Under Review'
                          ? 'bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300'
                          : 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-200'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Direct Submission Modal */}
      {showSubmitModal && contestForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-[#121B17] border border-[#E6E1D8] dark:border-[#222E28]">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-stone-900 dark:text-white">
                Submit to {contestForModal.title}
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmSubmit} className="mt-5 space-y-4 text-xs">
              <div className="rounded-xl bg-amber-50/70 p-3.5 border border-amber-200/60 text-amber-950 dark:bg-amber-950/30 dark:border-amber-900/40 dark:text-amber-200">
                <div className="font-bold mb-1">Prize Award: {contestForModal.prizeNaira} ({contestForModal.prizeUSD})</div>
                <div>Word limit requirements: {contestForModal.wordLimit}</div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Select Draft to Submit
                </label>
                <select
                  value={selectedDraftId}
                  onChange={(e) => setSelectedDraftId(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                >
                  {userDrafts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title} ({d.wordCount} words)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 pt-2 text-stone-600 dark:text-stone-300">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 rounded text-[#0A4228] focus:ring-[#0A4228]" />
                  <span>I confirm this is an original unpublished literary work written by me.</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 rounded text-[#0A4228] focus:ring-[#0A4228]" />
                  <span>I agree to the judging criteria and grant InkSpark publishing rights if selected.</span>
                </label>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="rounded-xl px-4 py-2 text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#0A4228] px-5 py-2 font-semibold text-white shadow-sm hover:bg-[#07321e] dark:bg-[#157347]"
                >
                  Submit Manuscript
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
