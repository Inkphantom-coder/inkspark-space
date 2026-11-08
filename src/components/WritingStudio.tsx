import React, { useState, useEffect, useRef } from 'react';
import {
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Download,
  Share2,
  Plus,
  Trash2,
  Check,
  Award,
  ChevronDown,
  BookOpen,
  FileText,
  Clock,
  Layers,
  Wand2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Draft, WritingGoal } from '../types';
import { ambientAudio } from '../utils/audio';

interface WritingStudioProps {
  drafts: Draft[];
  activeDraft: Draft;
  onSelectDraft: (id: string) => void;
  onCreateDraft: () => void;
  onUpdateDraft: (id: string, updates: Partial<Draft>) => void;
  onDeleteDraft: (id: string) => void;
  goal: WritingGoal;
  onUpdateGoalWords: (wordsAdded: number) => void;
  onOpenGoalsModal: () => void;
  onOpenContestsWithDraft: (draft: Draft) => void;
  onShareToCommunityWithDraft: (draft: Draft) => void;
  isOffline: boolean;
}

export const WritingStudio: React.FC<WritingStudioProps> = ({
  drafts,
  activeDraft,
  onSelectDraft,
  onCreateDraft,
  onUpdateDraft,
  onDeleteDraft,
  goal,
  onUpdateGoalWords,
  onOpenGoalsModal,
  onOpenContestsWithDraft,
  onShareToCommunityWithDraft,
  isOffline,
}) => {
  // Local state
  const [isZenMode, setIsZenMode] = useState(false);
  const [content, setContent] = useState(activeDraft.content || '');
  const [title, setTitle] = useState(activeDraft.title || 'Untitled Draft');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [showDraftsList, setShowDraftsList] = useState(false);
  const [editorFont, setEditorFont] = useState<'editorial' | 'sans' | 'mono'>('editorial');

  // Ambient Audio state
  const [ambientMode, setAmbientMode] = useState<'none' | 'rain' | 'crickets' | 'rhythm'>('none');
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Sprint Timer state
  const [sprintDuration, setSprintDuration] = useState<number>(25 * 60); // 25 min default
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showTimerMenu, setShowTimerMenu] = useState(false);

  // AI Assistant Drawer state
  const [showAiDrawer, setShowAiDrawer] = useState(false);
  const [aiTab, setAiTab] = useState<'critique' | 'spice'>('critique');
  const [isCritiquing, setIsCritiquing] = useState(false);
  const [critiqueResult, setCritiqueResult] = useState<any>(null);
  const [selectedTextForSpice, setSelectedTextForSpice] = useState('');
  const [spiceStyle, setSpiceStyle] = useState('pidgin-inflected');
  const [isSpicing, setIsSpicing] = useState(false);
  const [spiceResult, setSpiceResult] = useState<any>(null);

  const prevWordCountRef = useRef(activeDraft.wordCount || 0);
  const saveTimeoutRef = useRef<number | null>(null);

  // Sync when activeDraft changes
  useEffect(() => {
    setContent(activeDraft.content || '');
    setTitle(activeDraft.title || 'Untitled Draft');
    prevWordCountRef.current = (activeDraft.content || '').trim().split(/\s+/).filter(Boolean).length;
    setCritiqueResult(null);
  }, [activeDraft.id]);

  // Real-time metrics
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const chars = content.length;
  const readingTime = Math.max(1, Math.ceil(words / 200));
  const targetWords = activeDraft.targetWordCount || goal.dailyWordGoal || 500;
  const goalProgress = Math.min(100, Math.round((words / targetWords) * 100));

  // Word count change & auto-save with debounce
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setSaveStatus('saving');

    const newWordCount = newContent.trim().split(/\s+/).filter(Boolean).length;
    const diff = newWordCount - prevWordCountRef.current;
    if (diff > 0) {
      onUpdateGoalWords(diff);
      prevWordCountRef.current = newWordCount;
      // Confetti celebration if hit target
      if (newWordCount >= targetWords && prevWordCountRef.current < targetWords) {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.8 } });
      }
    }

    if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = window.setTimeout(() => {
      onUpdateDraft(activeDraft.id, {
        content: newContent,
        wordCount: newWordCount,
        updatedAt: Date.now(),
      });
      setSaveStatus('saved');
    }, 700);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onUpdateDraft(activeDraft.id, { title: newTitle, updatedAt: Date.now() });
  };

  // Timer Tick
  useEffect(() => {
    let timer: number;
    if (isTimerRunning && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      confetti({ particleCount: 100, spread: 70 });
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = (minutes: number) => {
    setIsTimerRunning(false);
    setSprintDuration(minutes * 60);
    setTimeLeft(minutes * 60);
    setShowTimerMenu(false);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Ambient sound handler
  const handleAmbientChange = (mode: 'none' | 'rain' | 'crickets' | 'rhythm') => {
    setAmbientMode(mode);
    if (mode === 'none') {
      ambientAudio.stop();
    } else if (mode === 'rain') {
      ambientAudio.playLagosRain();
    } else if (mode === 'crickets') {
      ambientAudio.playSavannahCrickets();
    } else if (mode === 'rhythm') {
      ambientAudio.playFlowRhythm();
    }
  };

  const handleToggleMute = () => {
    const muted = ambientAudio.toggleMute();
    setIsAudioMuted(muted);
  };

  // AI Critique Call
  const handleRunCritique = async () => {
    if (!content.trim()) return;
    setIsCritiquing(true);
    setCritiqueResult(null);

    try {
      const res = await fetch('/api/editor/critique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          text: content,
          focusArea: 'overall',
        }),
      });
      const data = await res.json();
      if (data.critique) {
        setCritiqueResult(data.critique);
      }
    } catch (err) {
      console.error('Critique failed:', err);
    } finally {
      setIsCritiquing(false);
    }
  };

  // AI Spice Dialogue Call
  const handleRunSpice = async () => {
    const textToSpice = selectedTextForSpice || content.slice(0, 300);
    if (!textToSpice.trim()) return;

    setIsSpicing(true);
    setSpiceResult(null);

    try {
      const res = await fetch('/api/editor/spice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSpice,
          style: spiceStyle,
        }),
      });
      const data = await res.json();
      if (data.result) {
        setSpiceResult(data.result);
      }
    } catch (err) {
      console.error('Spice failed:', err);
    } finally {
      setIsSpicing(false);
    }
  };

  // Export functions
  const handleExport = (format: 'markdown' | 'txt' | 'doc') => {
    const filename = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'inkspark_story'}.${format === 'markdown' ? 'md' : format === 'txt' ? 'txt' : 'doc'}`;
    const fileContent = `# ${title}\n\n${content}`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 transition-all ${
        isZenMode ? 'fixed inset-0 z-50 max-w-none bg-[#FBF9F5] p-6 sm:p-12 overflow-y-auto dark:bg-[#0D1512]' : ''
      }`}
    >
      {/* Studio Toolbar Strip */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E6E1D8] bg-white p-3.5 shadow-xs dark:border-[#222E28] dark:bg-[#121B17]">
        {/* Left: Draft Switcher & Creation */}
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setShowDraftsList(!showDraftsList)}
            className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-800 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
          >
            <BookOpen className="h-3.5 w-3.5 text-[#0A4228] dark:text-[#4ade80]" />
            <span className="max-w-[130px] sm:max-w-[180px] truncate">{title}</span>
            <ChevronDown className="h-3 w-3 text-stone-400" />
          </button>

          <button
            onClick={onCreateDraft}
            title="Create fresh draft"
            className="flex items-center gap-1 rounded-xl bg-stone-100 p-2 text-stone-700 hover:bg-[#0A4228] hover:text-white transition-colors dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-[#157347]"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>

          {/* Drafts Dropdown */}
          {showDraftsList && (
            <div className="absolute left-0 top-11 z-50 w-72 rounded-2xl border border-stone-200 bg-white p-2 shadow-xl dark:border-stone-800 dark:bg-stone-900">
              <div className="px-2 py-1 text-[11px] font-semibold uppercase text-stone-400">
                Your Manuscripts ({drafts.length})
              </div>
              <div className="mt-1 max-h-60 overflow-y-auto space-y-1">
                {drafts.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onSelectDraft(d.id);
                      setShowDraftsList(false);
                    }}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs cursor-pointer transition-colors ${
                      d.id === activeDraft.id
                        ? 'bg-[#0A4228] text-white'
                        : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="font-semibold truncate">{d.title}</div>
                      <div className="text-[10px] opacity-75">{d.wordCount} words · {d.genre || 'Story'}</div>
                    </div>
                    {drafts.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteDraft(d.id);
                        }}
                        className="p-1 hover:text-red-400"
                        title="Delete draft"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Status */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-stone-400">
            {saveStatus === 'saved' ? (
              <>
                <Check className="h-3 w-3 text-emerald-600" />
                <span>Saved {isOffline ? 'locally' : 'to cloud'}</span>
              </>
            ) : (
              <span className="text-amber-600">Auto-saving...</span>
            )}
          </div>
        </div>

        {/* Center: Nigerian Ambient Soundscapes & Sprint Timer */}
        <div className="flex items-center gap-2">
          {/* Ambient Audio Pill */}
          <div className="flex items-center gap-1 rounded-xl border border-stone-200 bg-stone-50 p-1 dark:border-stone-700 dark:bg-stone-800">
            <button
              onClick={() => handleAmbientChange(ambientMode === 'rain' ? 'none' : 'rain')}
              title="Lagos Rain on Zinc Roof (Monsoon Focus)"
              className={`rounded-lg px-2 py-1 text-xs font-medium transition-colors ${
                ambientMode === 'rain'
                  ? 'bg-[#0A4228] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-300'
              }`}
            >
              🌧️ Zinc Rain
            </button>
            <button
              onClick={() => handleAmbientChange(ambientMode === 'crickets' ? 'none' : 'crickets')}
              title="Savannah Evening Crickets (Ibadan Dusk)"
              className={`rounded-lg px-2 py-1 text-xs font-medium transition-colors ${
                ambientMode === 'crickets'
                  ? 'bg-[#0A4228] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-300'
              }`}
            >
              🦗 Savannah
            </button>
            <button
              onClick={() => handleAmbientChange(ambientMode === 'rhythm' ? 'none' : 'rhythm')}
              title="Talking Drum Flow Pulse (60 BPM)"
              className={`rounded-lg px-2 py-1 text-xs font-medium transition-colors ${
                ambientMode === 'rhythm'
                  ? 'bg-[#0A4228] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-300'
              }`}
            >
              🥁 Flow Pulse
            </button>

            {ambientMode !== 'none' && (
              <button
                onClick={handleToggleMute}
                title={isAudioMuted ? 'Unmute' : 'Mute'}
                className="p-1 text-stone-500 hover:text-stone-800 dark:text-stone-400"
              >
                {isAudioMuted ? <VolumeX className="h-3.5 w-3.5 text-red-500" /> : <Volume2 className="h-3.5 w-3.5" />}
              </button>
            )}
          </div>

          {/* Focus Sprint Timer */}
          <div className="relative">
            <div className="flex items-center gap-1 rounded-xl border border-amber-200 bg-amber-50/70 p-1 dark:border-amber-900/50 dark:bg-amber-950/30">
              <button
                onClick={toggleTimer}
                title={isTimerRunning ? 'Pause Sprint' : 'Start Focus Sprint'}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-[#B94700] hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/40"
              >
                {isTimerRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                <span className="font-mono">{formatTimer(timeLeft)}</span>
              </button>
              <button
                onClick={() => setShowTimerMenu(!showTimerMenu)}
                className="p-1 text-amber-700 hover:text-amber-900 dark:text-amber-400"
                title="Sprint Settings"
              >
                <Clock className="h-3.5 w-3.5" />
              </button>
            </div>

            {showTimerMenu && (
              <div className="absolute right-0 top-11 z-50 w-44 rounded-xl border border-stone-200 bg-white p-2 shadow-lg dark:border-stone-800 dark:bg-stone-900 text-xs">
                <div className="px-2 py-1 text-[10px] font-semibold uppercase text-stone-400">
                  Sprint Durations
                </div>
                <button
                  onClick={() => resetTimer(15)}
                  className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  ⚡ 15m Lagos Rush
                </button>
                <button
                  onClick={() => resetTimer(25)}
                  className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  🍅 25m Pomodoro
                </button>
                <button
                  onClick={() => resetTimer(45)}
                  className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  📖 45m Deep Chapter
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Tools, Typography & Zen Mode */}
        <div className="flex items-center gap-2">
          {/* AI Craft Assistant trigger */}
          <button
            onClick={() => setShowAiDrawer(!showAiDrawer)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              showAiDrawer
                ? 'bg-[#B94700] text-white shadow-xs'
                : 'border border-amber-300/80 bg-amber-50 text-[#B94700] hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Naija AI Craft</span>
          </button>

          {/* Export options */}
          <div className="relative group">
            <button
              title="Export manuscript"
              className="flex items-center gap-1 rounded-xl border border-stone-200 bg-stone-50 p-2 text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
            <div className="absolute right-0 top-11 hidden group-hover:block z-50 w-36 rounded-xl border border-stone-200 bg-white p-1.5 shadow-lg dark:border-stone-800 dark:bg-stone-900 text-xs">
              <button
                onClick={() => handleExport('markdown')}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                Markdown (.md)
              </button>
              <button
                onClick={() => handleExport('txt')}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                Plain Text (.txt)
              </button>
              <button
                onClick={() => handleExport('doc')}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                Word Doc (.doc)
              </button>
            </div>
          </div>

          {/* Submit / Share buttons */}
          <button
            onClick={() => onOpenContestsWithDraft(activeDraft)}
            title="Submit to Write-to-Earn Contest"
            className="flex items-center gap-1.5 rounded-xl border border-[#0A4228] px-3 py-1.5 text-xs font-semibold text-[#0A4228] hover:bg-[#0A4228] hover:text-white transition-all dark:border-[#4ade80] dark:text-[#4ade80] dark:hover:bg-[#157347] dark:hover:text-white"
          >
            <Award className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Enter Contest</span>
          </button>

          <button
            onClick={() => onShareToCommunityWithDraft(activeDraft)}
            title="Share to Writer Community"
            className="flex items-center gap-1.5 rounded-xl bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800 transition-all dark:bg-stone-800 dark:hover:bg-stone-700"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Publish</span>
          </button>

          {/* Zen Mode toggle */}
          <button
            onClick={() => setIsZenMode(!isZenMode)}
            title={isZenMode ? 'Exit Zen Mode' : 'Fullscreen Zen Mode'}
            className="rounded-xl p-2 text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            {isZenMode ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Manuscript Canvas + AI Craft Panel (if open) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Editor Main Canvas */}
        <div
          className={`${
            showAiDrawer ? 'lg:col-span-8' : 'lg:col-span-12'
          } rounded-2xl border border-[#E6E1D8] bg-white p-6 sm:p-12 shadow-sm transition-all dark:border-[#222E28] dark:bg-[#121B17]`}
        >
          {/* Manuscript Title Input */}
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title of your story..."
            className="w-full border-b border-transparent bg-transparent pb-3 font-['Playfair_Display'] text-2xl font-bold tracking-tight text-stone-900 focus:border-stone-300 focus:outline-none dark:text-white dark:focus:border-stone-700 sm:text-3xl"
          />

          {/* Target Word Count Progress Bar */}
          <div className="mt-3 flex items-center justify-between gap-4 border-b border-stone-100 pb-4 text-xs text-stone-500 dark:border-stone-800/80 dark:text-stone-400">
            <div className="flex items-center gap-3">
              <span className="font-mono tabular-nums font-semibold text-stone-800 dark:text-stone-200">
                {words} words
              </span>
              <span aria-hidden="true">·</span>
              <span>{chars} characters</span>
              <span aria-hidden="true">·</span>
              <span>{readingTime} min read</span>
            </div>

            <button
              onClick={onOpenGoalsModal}
              title="Click to edit daily goals"
              className="flex items-center gap-2 hover:text-[#0A4228] dark:hover:text-[#4ade80] transition-colors"
            >
              <span>Goal: {words}/{targetWords}w</span>
              <div className="h-2 w-24 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                <div
                  className="h-full bg-[#0A4228] transition-all duration-300 dark:bg-[#157347]"
                  style={{ width: `${goalProgress}%` }}
                />
              </div>
            </button>
          </div>

          {/* The Pure Writing Textarea */}
          <div className="mt-6">
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="Begin your story here... Let the rhythm of the city and memory take over."
              rows={22}
              className={`w-full resize-none border-none bg-transparent text-base sm:text-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-0 dark:text-stone-100 leading-relaxed ${
                editorFont === 'editorial'
                  ? "font-['Newsreader'] tracking-normal text-[19px] leading-[1.85]"
                  : editorFont === 'sans'
                  ? "font-['Plus_Jakarta_Sans'] leading-[1.75]"
                  : "font-mono text-sm leading-[1.7]"
              }`}
            />
          </div>
        </div>

        {/* AI Nigerian Craft Assistant Panel */}
        {showAiDrawer && (
          <div className="lg:col-span-4 rounded-2xl border border-[#E6E1D8] bg-white p-5 shadow-sm dark:border-[#222E28] dark:bg-[#121B17]">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#B94700]" />
                <h3 className="font-['Playfair_Display'] text-base font-bold text-stone-900 dark:text-white">
                  Nigerian Craft Studio
                </h3>
              </div>
              <button
                onClick={() => setShowAiDrawer(false)}
                className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                ✕ Close
              </button>
            </div>

            {/* Assistant Sub-Tabs */}
            <div className="mt-4 flex gap-1 rounded-xl bg-stone-100 p-1 dark:bg-stone-800">
              <button
                onClick={() => setAiTab('critique')}
                className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-colors ${
                  aiTab === 'critique'
                    ? 'bg-white text-[#0A4228] shadow-xs dark:bg-stone-900 dark:text-white'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                Spark Critique
              </button>
              <button
                onClick={() => setAiTab('spice')}
                className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-colors ${
                  aiTab === 'spice'
                    ? 'bg-white text-[#0A4228] shadow-xs dark:bg-stone-900 dark:text-white'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                Naija Cadence & Slang
              </button>
            </div>

            {/* Tab 1: Spark Critique */}
            {aiTab === 'critique' && (
              <div className="mt-4 space-y-4">
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  Receive literary editorial feedback on pacing, cultural authenticity, dialogue, and sensory stakes.
                </p>

                <button
                  onClick={handleRunCritique}
                  disabled={isCritiquing || words < 10}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A4228] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#07321e] disabled:opacity-50 transition-all dark:bg-[#157347]"
                >
                  <Wand2 className={`h-3.5 w-3.5 ${isCritiquing ? 'animate-spin' : ''}`} />
                  <span>{isCritiquing ? 'Analyzing Manuscript...' : 'Review My Draft Excerpt'}</span>
                </button>

                {critiqueResult && (
                  <div className="space-y-3 pt-2 text-xs">
                    {/* Spark Score */}
                    {critiqueResult.sparkScore && (
                      <div className="flex items-center justify-between rounded-xl bg-amber-50 p-3 text-amber-950 dark:bg-amber-950/40 dark:text-amber-200">
                        <span className="font-semibold">Literary Spark Score</span>
                        <span className="font-mono text-base font-bold text-[#B94700] dark:text-amber-400">
                          {critiqueResult.sparkScore}/100
                        </span>
                      </div>
                    )}

                    {/* Cultural Insight */}
                    {critiqueResult.culturalInsight && (
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 text-emerald-950 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200">
                        <div className="font-bold mb-1">Cultural Nuance & Setting</div>
                        <p className="leading-relaxed">{critiqueResult.culturalInsight}</p>
                      </div>
                    )}

                    {/* Strengths */}
                    {critiqueResult.strengths && (
                      <div>
                        <div className="font-bold text-stone-900 dark:text-white mb-1">Strengths</div>
                        <ul className="space-y-1 text-stone-600 dark:text-stone-300">
                          {critiqueResult.strengths.map((s: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-600">✓</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Opportunities */}
                    {critiqueResult.opportunities && (
                      <div>
                        <div className="font-bold text-stone-900 dark:text-white mb-1">Areas to Deepen</div>
                        <ul className="space-y-1 text-stone-600 dark:text-stone-300">
                          {critiqueResult.opportunities.map((o: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-amber-600">•</span>
                              <span>{o}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Naija Cadence & Dialogue Spice */}
            {aiTab === 'spice' && (
              <div className="mt-4 space-y-4">
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  Infuse authentic Nigerian dialogue cadence (Pidgin nuances, Lagos street wit, or Achebe-style proverbs).
                </p>

                <div>
                  <label className="block text-[11px] font-medium text-stone-500 mb-1">
                    Dialogue Style
                  </label>
                  <select
                    value={spiceStyle}
                    onChange={(e) => setSpiceStyle(e.target.value)}
                    className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  >
                    <option value="pidgin-inflected">Urban Nigerian Pidgin (Lagos / Warri)</option>
                    <option value="formal-eloquent">Classical Dignified English (Achebe / Soyinka)</option>
                    <option value="lagos-street">Lagos Street Banter (Danfo & Market)</option>
                    <option value="elderly-wisdom">Proverbial Elder Cadence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-500 mb-1">
                    Sentence or Dialogue to Transform
                  </label>
                  <textarea
                    value={selectedTextForSpice}
                    onChange={(e) => setSelectedTextForSpice(e.target.value)}
                    placeholder="e.g. 'Why are you telling me this now? It is too late to change the plan.'"
                    rows={3}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs text-stone-900 focus:outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>

                <button
                  onClick={handleRunSpice}
                  disabled={isSpicing}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A4228] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#07321e] disabled:opacity-50 transition-all dark:bg-[#157347]"
                >
                  <Sparkles className={`h-3.5 w-3.5 ${isSpicing ? 'animate-spin' : ''}`} />
                  <span>{isSpicing ? 'Polishing Cadence...' : 'Spice Dialogue'}</span>
                </button>

                {spiceResult && (
                  <div className="space-y-3 pt-2 text-xs">
                    <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-800/60">
                      <div className="font-semibold text-[#0A4228] dark:text-[#4ade80] mb-1">
                        Variation 1 (Natural Cadence)
                      </div>
                      <p className="font-['Newsreader'] italic text-sm text-stone-800 dark:text-stone-200">
                        "{spiceResult.variation1}"
                      </p>
                    </div>

                    <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-800/60">
                      <div className="font-semibold text-[#B94700] dark:text-amber-400 mb-1">
                        Variation 2 (Expressive Subtlety)
                      </div>
                      <p className="font-['Newsreader'] italic text-sm text-stone-800 dark:text-stone-200">
                        "{spiceResult.variation2}"
                      </p>
                    </div>

                    {spiceResult.glossary && spiceResult.glossary.length > 0 && (
                      <div className="rounded-lg bg-stone-100 p-2.5 text-[11px] dark:bg-stone-800">
                        <div className="font-bold text-stone-700 dark:text-stone-300 mb-1">Cultural Lexicon Used</div>
                        {spiceResult.glossary.map((g: any, i: number) => (
                          <div key={i} className="text-stone-600 dark:text-stone-400">
                            <strong>{g.term}:</strong> {g.meaning}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
