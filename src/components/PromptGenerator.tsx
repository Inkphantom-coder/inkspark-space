import React, { useState } from 'react';
import { Sparkles, Bookmark, PenTool, Copy, Check, Filter, Compass, RefreshCw } from 'lucide-react';
import { WritingPrompt } from '../types';

interface PromptGeneratorProps {
  prompts: WritingPrompt[];
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  onStartWritingWithPrompt: (prompt: WritingPrompt) => void;
  onGenerateNewPrompts: (keywords: string, genre: string, tone: string, themes: string[]) => Promise<void>;
  isGenerating: boolean;
}

const NIGERIAN_PRESET_TAGS = [
  'Lagos Danfo Noir',
  'Yoruba Orisha Lore',
  'Igbo Odinani Cosmology',
  'Benin Bronze Casters',
  'Niger Delta Waters & Oil',
  'Kano Ancient Dye Pits',
  'June 12 Historical Memoir',
  'Campus Hall Week Drama',
  'Contemporary Diaspora',
  'Proverbs & Parables',
];

const GENRES = [
  'Any Genre',
  'Afro-Surrealism',
  'Lagos Noir',
  'Historical Literary Fiction',
  'Folklore Retelling',
  'Speculative African Fiction',
  'Satirical Contemporary',
];

const TONES = ['Evocative & Lyric', 'Gritty & Grounded', 'Mythic & Ancient', 'Witty & Satirical', 'Intimate & Tender'];

export const PromptGenerator: React.FC<PromptGeneratorProps> = ({
  prompts,
  favoriteIds,
  toggleFavorite,
  onStartWritingWithPrompt,
  onGenerateNewPrompts,
  isGenerating,
}) => {
  const [keywordInput, setKeywordInput] = useState('');
  const [selectedThemes, setSelectedThemes] = useState<string[]>(['Lagos Danfo Noir', 'Yoruba Orisha Lore']);
  const [selectedGenre, setSelectedGenre] = useState('Any Genre');
  const [selectedTone, setSelectedTone] = useState('Evocative & Lyric');
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleTheme = (tag: string) => {
    setSelectedThemes((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateNewPrompts(keywordInput, selectedGenre, selectedTone, selectedThemes);
  };

  const handleCopyOpening = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const displayedPrompts =
    activeTab === 'saved'
      ? prompts.filter((p) => favoriteIds.includes(p.id))
      : prompts;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section: Split Column with Image */}
      <section className="mb-12 overflow-hidden rounded-2xl border border-[#E6E1D8] bg-white shadow-sm dark:border-[#222E28] dark:bg-[#121B17]">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Typographic Narrative */}
          <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-7">
            <div>
              <div className="mb-3 text-xs font-semibold tracking-wider text-[#B94700] uppercase dark:text-amber-400">
                Nigerian Literary Muse & Folklore Vault
              </div>
              <h1 className="font-['Playfair_Display'] text-3xl font-extrabold tracking-tight text-[#0A4228] sm:text-4xl lg:text-5xl dark:text-[#E8F5EE] [text-wrap:balance]">
                Unearth stories steeped in ancestral memory & Lagos pulse.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-300">
                Ignite your writing with culturally grounded story seeds, from ancient bronze-caster guilds in Benin to the humming wires of nocturnal Carter Bridge and trans-Saharan trade lore.
              </p>
            </div>

            {/* Quick Keyword & Spark Generator Form */}
            <form onSubmit={handleGenerate} className="mt-8 space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                  Your Cultural Keywords or Story Sparks
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="e.g. Lagos rain, third mainland bridge, grandmother, brass mask, Danfo, petrol queue"
                    className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#0A4228] focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0A4228] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#07321e] active:scale-[0.98] transition-all disabled:opacity-50 dark:bg-[#157347] dark:hover:bg-[#1a8553] whitespace-nowrap"
                  >
                    <Sparkles className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span>{isGenerating ? 'Sparking...' : 'Spark Prompts'}</span>
                  </button>
                </div>
              </div>

              {/* Theme chips */}
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span>Nigerian Themes & Micro-Settings:</span>
                  <span className="text-[11px]">{selectedThemes.length} selected</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {NIGERIAN_PRESET_TAGS.map((tag) => {
                    const isSelected = selectedThemes.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => toggleTheme(tag)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                          isSelected
                            ? 'bg-[#0A4228] text-white dark:bg-[#157347]'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Genre and Tone selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-medium text-stone-500 mb-1">
                    Genre Focus
                  </label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs text-stone-900 focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-white"
                  >
                    {GENRES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-500 mb-1">
                    Narrative Tone
                  </label>
                  <select
                    value={selectedTone}
                    onChange={(e) => setSelectedTone(e.target.value)}
                    className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs text-stone-900 focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-white"
                  >
                    {TONES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="relative min-h-[280px] lg:col-span-5 lg:min-h-full">
            <img
              src="/src/assets/images/hero_nigerian_writer_1794134392139.jpg"
              alt="Nigerian writer at desk in Lagos study surrounded by literature books"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#121B17]/40 lg:to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-xs text-white/90 font-medium">
              "Proverbs are the palm-oil with which words are eaten." — Chinua Achebe
            </div>
          </div>
        </div>
      </section>

      {/* Prompts Deck Header & Segmented Controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-['Playfair_Display'] text-2xl font-bold text-stone-900 dark:text-white">
            Curated & Generated Writing Prompts
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Pick a story premise to develop in the studio or generate fresh cultural hooks.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-1 rounded-xl border border-stone-200 bg-stone-100 p-1 dark:border-stone-800 dark:bg-stone-900">
          <button
            onClick={() => setActiveTab('all')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-white text-[#0A4228] shadow-xs dark:bg-stone-800 dark:text-white'
                : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white'
            }`}
          >
            All Prompts ({prompts.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'saved'
                ? 'bg-white text-[#0A4228] shadow-xs dark:bg-stone-800 dark:text-white'
                : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white'
            }`}
          >
            Saved Favorites ({favoriteIds.length})
          </button>
        </div>
      </div>

      {/* Prompts Cards Grid */}
      {displayedPrompts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 p-12 text-center dark:border-stone-700">
          <Bookmark className="mx-auto h-8 w-8 text-stone-400 mb-3" />
          <h3 className="text-base font-semibold text-stone-900 dark:text-white">
            {activeTab === 'saved' ? 'No saved prompts yet' : 'No prompts found'}
          </h3>
          <p className="mt-1 text-xs text-stone-500">
            {activeTab === 'saved'
              ? 'Click the bookmark icon on any prompt to save it to your personal writing bank.'
              : 'Try entering keywords above and hit "Spark Prompts".'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedPrompts.map((p) => {
            const isFav = favoriteIds.includes(p.id);
            const isCopied = copiedId === p.id;

            return (
              <div
                key={p.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#E6E1D8] bg-white p-6 shadow-xs transition-all hover:border-[#0A4228]/40 hover:shadow-md dark:border-[#222E28] dark:bg-[#121B17] dark:hover:border-[#157347]/50"
              >
                <div>
                  {/* Top metadata with typographic separator */}
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-medium text-[#0A4228] dark:text-[#4ade80]">{p.genre}</span>
                      <span aria-hidden="true">·</span>
                      <span>{p.suggestedLength}</span>
                    </div>
                    <button
                      onClick={() => toggleFavorite(p.id)}
                      title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                      className={`rounded-md p-1 transition-colors ${
                        isFav
                          ? 'text-[#B94700] hover:text-[#913700] dark:text-amber-400'
                          : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-200'
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Playfair_Display'] text-xl font-bold tracking-tight text-stone-900 group-hover:text-[#0A4228] dark:text-white dark:group-hover:text-[#4ade80] transition-colors">
                    {p.title}
                  </h3>

                  {/* Cultural Anchor Note */}
                  <div className="mt-1 text-xs text-[#B94700] font-medium dark:text-amber-400">
                    Anchor: {p.culturalAnchor}
                  </div>

                  {/* Premise */}
                  <p className="mt-3 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                    {p.premise}
                  </p>

                  {/* Opening Sentence Box */}
                  <div className="mt-4 rounded-xl border border-stone-100 bg-[#FBF9F5] p-3 text-xs italic text-stone-700 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-300 relative group/quote">
                    <p className="font-['Newsreader'] text-sm leading-relaxed text-stone-800 dark:text-stone-200">
                      "{p.openingLine}"
                    </p>
                    <button
                      onClick={() => handleCopyOpening(p.id, p.openingLine)}
                      title="Copy opening line"
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                    >
                      {isCopied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                      <span>{isCopied ? 'Copied' : 'Copy line'}</span>
                    </button>
                  </div>

                  {/* Themes unboxed text */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                    {p.themes.map((t, idx) => (
                      <React.Fragment key={t}>
                        <span>{t}</span>
                        {idx < p.themes.length - 1 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80">
                  <button
                    onClick={() => onStartWritingWithPrompt(p)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0A4228] active:scale-[0.99] transition-all dark:bg-stone-800 dark:hover:bg-[#157347]"
                  >
                    <PenTool className="h-3.5 w-3.5" />
                    <span>Start Writing in Studio</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
