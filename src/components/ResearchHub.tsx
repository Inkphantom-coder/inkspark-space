import React, { useState } from 'react';
import { Search, BookMarked, Sparkles, Compass, History, ExternalLink, Copy, Check, PenTool } from 'lucide-react';
import { FOLKLORE_DATA, NIGERIAN_LEXICON, LITERARY_MASTERS, HISTORICAL_EPOCHS } from '../data/mockData';
import { FolkloreEntry, SlangTerm, LiteraryMaster, HistoricalEpoch } from '../types';

interface ResearchHubProps {
  onUseSeedInStudio: (title: string, text: string) => void;
}

export const ResearchHub: React.FC<ResearchHubProps> = ({ onUseSeedInStudio }) => {
  const [activeTab, setActiveTab] = useState<'folklore' | 'lexicon' | 'masters' | 'history' | 'archives'>('folklore');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);
  const [selectedCultureFilter, setSelectedCultureFilter] = useState<string>('All');

  const handleCopyDialogue = (term: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTerm(term);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  // Filter folklore
  const filteredFolklore = FOLKLORE_DATA.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.culture.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCulture = selectedCultureFilter === 'All' || item.culture === selectedCultureFilter;
    return matchesSearch && matchesCulture;
  });

  // Filter slang
  const filteredSlang = NIGERIAN_LEXICON.filter((s) => {
    return (
      s.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.actualUsage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sampleDialogue.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Filter masters
  const filteredMasters = LITERARY_MASTERS.filter((m) => {
    return (
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.craftAdvice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.notableWorks.some((w) => w.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Filter history
  const filteredHistory = HISTORICAL_EPOCHS.filter((h) => {
    return (
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.narrativeOverview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.writingHook.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Banner with Folklore Art */}
      <div className="mb-10 overflow-hidden rounded-2xl border border-[#E6E1D8] bg-white shadow-sm dark:border-[#222E28] dark:bg-[#121B17]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="p-6 sm:p-10 lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold tracking-wider text-[#B94700] uppercase dark:text-amber-400 mb-2">
                Open Cultural & Academic Archives
              </div>
              <h1 className="font-['Playfair_Display'] text-3xl font-extrabold tracking-tight text-[#0A4228] sm:text-4xl dark:text-[#E8F5EE]">
                The Nigerian Literary & Cultural Research Vault
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                Ground your fiction and non-fiction in authentic folklore cosmology, regional dialect cadences, oral histories, and mastercraft essays from Nigeria’s literary pantheon.
              </p>
            </div>

            {/* Global Search Bar */}
            <div className="mt-6 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search folklore, Pidgin terms, masters, or historical events..."
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:border-[#0A4228] focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="relative min-h-[200px] lg:col-span-4 lg:min-h-full">
            <img
              src="/src/assets/images/folklore_mythology_art_1794134391197.jpg"
              alt="Nigerian folklore and mythos painting"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r lg:from-[#121B17]/40 lg:to-transparent" />
          </div>
        </div>
      </div>

      {/* Segmented Category Navigation */}
      <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4 dark:border-stone-800">
        <button
          onClick={() => setActiveTab('folklore')}
          className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
            activeTab === 'folklore'
              ? 'bg-[#0A4228] text-white shadow-xs dark:bg-[#157347]'
              : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
          }`}
        >
          Folklore & Cosmology ({filteredFolklore.length})
        </button>
        <button
          onClick={() => setActiveTab('lexicon')}
          className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
            activeTab === 'lexicon'
              ? 'bg-[#0A4228] text-white shadow-xs dark:bg-[#157347]'
              : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
          }`}
        >
          Naija Lexicon & Slang ({filteredSlang.length})
        </button>
        <button
          onClick={() => setActiveTab('masters')}
          className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
            activeTab === 'masters'
              ? 'bg-[#0A4228] text-white shadow-xs dark:bg-[#157347]'
              : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
          }`}
        >
          Literary Masters Masterclass ({filteredMasters.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
            activeTab === 'history'
              ? 'bg-[#0A4228] text-white shadow-xs dark:bg-[#157347]'
              : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
          }`}
        >
          Historical Epochs & Hooks ({filteredHistory.length})
        </button>
        <button
          onClick={() => setActiveTab('archives')}
          className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
            activeTab === 'archives'
              ? 'bg-[#0A4228] text-white shadow-xs dark:bg-[#157347]'
              : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
          }`}
        >
          Open-Access Library Directory
        </button>
      </div>

      {/* Tab 1: Folklore & Cosmology */}
      {activeTab === 'folklore' && (
        <div>
          {/* Culture filter sub-chips */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-stone-500 font-medium">Tradition:</span>
            {['All', 'Yoruba', 'Igbo', 'Hausa', 'Edo/Benin', 'Efik/Ibibio', 'Pan-Nigerian'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCultureFilter(c)}
                className={`rounded-lg px-2.5 py-1 font-medium transition-colors ${
                  selectedCultureFilter === c
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFolklore.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-[#E6E1D8] bg-white p-6 shadow-xs hover:border-[#0A4228]/40 dark:border-[#222E28] dark:bg-[#121B17] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-[#0A4228] dark:text-[#4ade80]">{item.culture}</span>
                    <span>{item.category}</span>
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-stone-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                    {item.summary}
                  </p>

                  {/* Story Seed */}
                  <div className="mt-4 rounded-xl border border-amber-200/60 bg-amber-50/60 p-3 text-xs text-amber-950 dark:border-amber-950/40 dark:bg-amber-950/20 dark:text-amber-200">
                    <div className="font-bold mb-1 flex items-center gap-1.5 text-[#B94700] dark:text-amber-400">
                      <Sparkles className="h-3 w-3" />
                      <span>Fiction Story Seed</span>
                    </div>
                    <p className="leading-relaxed">{item.storySeed}</p>
                  </div>

                  {/* Associated symbols */}
                  <div className="mt-4 flex flex-wrap items-center gap-1 text-[11px] text-stone-400">
                    {item.associatedSymbols.map((s, idx) => (
                      <React.Fragment key={s}>
                        <span>{s}</span>
                        {idx < item.associatedSymbols.length - 1 && <span>·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    onClick={() =>
                      onUseSeedInStudio(
                        `Story Seed: ${item.name}`,
                        `[Context: ${item.culture} Folklore - ${item.name}]\n\nStory Premise:\n${item.storySeed}\n\n`
                      )
                    }
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-800 hover:bg-[#0A4228] hover:text-white hover:border-[#0A4228] transition-all dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-[#157347]"
                  >
                    <PenTool className="h-3 w-3" />
                    <span>Use as Story Seed in Studio</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Naija Lexicon & Slang */}
      {activeTab === 'lexicon' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSlang.map((s) => {
            const isCopied = copiedTerm === s.term;
            return (
              <div
                key={s.term}
                className="flex flex-col justify-between rounded-2xl border border-[#E6E1D8] bg-white p-6 shadow-xs dark:border-[#222E28] dark:bg-[#121B17]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-[#B94700] dark:text-amber-400">{s.region}</span>
                    <span className="text-[11px]">Literal: {s.literalMeaning}</span>
                  </div>
                  <h3 className="font-['Playfair_Display'] text-lg font-bold text-stone-900 dark:text-white">
                    {s.term}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                    {s.actualUsage}
                  </p>

                  <div className="mt-4 rounded-xl border border-stone-100 bg-[#FBF9F5] p-3 text-xs italic text-stone-800 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-200">
                    <p className="font-['Newsreader'] text-sm leading-relaxed">
                      {s.sampleDialogue}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => handleCopyDialogue(s.term, s.sampleDialogue)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                  >
                    {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{isCopied ? 'Copied Dialogue' : 'Copy Sample Dialogue'}</span>
                  </button>
                  <button
                    onClick={() =>
                      onUseSeedInStudio(
                        `Naija Dialogue: ${s.term}`,
                        `// Dialogue snippet using "${s.term}" (${s.actualUsage})\n\n${s.sampleDialogue}\n\n`
                      )
                    }
                    className="text-xs text-[#0A4228] font-semibold hover:underline dark:text-[#4ade80]"
                  >
                    Insert to Draft
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Literary Masters */}
      {activeTab === 'masters' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMasters.map((m) => (
            <div
              key={m.name}
              className="flex flex-col justify-between rounded-2xl border border-[#E6E1D8] bg-white p-7 shadow-xs dark:border-[#222E28] dark:bg-[#121B17]"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className="font-semibold text-[#0A4228] dark:text-[#4ade80]">{m.focusGenre}</span>
                  <span className="font-mono text-[11px]">{m.lifespan}</span>
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-stone-900 dark:text-white">
                  {m.name}
                </h3>

                {/* Famous quote */}
                <blockquote className="mt-4 rounded-xl border-l-2 border-[#0A4228] bg-stone-50 p-3.5 text-xs italic text-stone-700 dark:border-[#157347] dark:bg-stone-900/60 dark:text-stone-300">
                  <p className="font-['Newsreader'] text-sm leading-relaxed">
                    "{m.quote}"
                  </p>
                </blockquote>

                {/* Craft advice */}
                <div className="mt-4">
                  <div className="text-xs font-bold text-[#B94700] uppercase tracking-wider dark:text-amber-400 mb-1">
                    Master Craft Directive
                  </div>
                  <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                    {m.craftAdvice}
                  </p>
                </div>

                {/* Notable works */}
                <div className="mt-4 flex flex-wrap items-center gap-1 text-[11px] text-stone-400">
                  <span className="font-medium text-stone-500">Key Works:</span>
                  {m.notableWorks.map((work, idx) => (
                    <React.Fragment key={work}>
                      <span className="italic">{work}</span>
                      {idx < m.notableWorks.length - 1 && <span>·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800">
                <button
                  onClick={() =>
                    onUseSeedInStudio(
                      `Craft Exercise in the Style of ${m.name}`,
                      `/* Master Craft Directive from ${m.name} */\n"${m.craftAdvice}"\n\nBegin writing scene:\n`
                    )
                  }
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0A4228] transition-all dark:bg-stone-800 dark:hover:bg-[#157347]"
                >
                  <PenTool className="h-3 w-3" />
                  <span>Start Craft Exercise in Studio</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Historical Epochs */}
      {activeTab === 'history' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHistory.map((h) => (
            <div
              key={h.id}
              className="flex flex-col justify-between rounded-2xl border border-[#E6E1D8] bg-white p-7 shadow-xs dark:border-[#222E28] dark:bg-[#121B17]"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className="font-semibold text-[#B94700] dark:text-amber-400">{h.location}</span>
                  <span className="font-mono text-[11px]">{h.period}</span>
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-stone-900 dark:text-white">
                  {h.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                  {h.narrativeOverview}
                </p>

                {/* Writing hook */}
                <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 p-3.5 text-xs dark:border-stone-800 dark:bg-stone-900/60">
                  <div className="font-bold text-[#0A4228] dark:text-[#4ade80] mb-1">
                    Historical Fiction Hook:
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 italic font-['Newsreader'] text-sm">
                    "{h.writingHook}"
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-stone-400">
                  {h.keyThemes.map((t, idx) => (
                    <React.Fragment key={t}>
                      <span>{t}</span>
                      {idx < h.keyThemes.length - 1 && <span>·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800">
                <button
                  onClick={() =>
                    onUseSeedInStudio(
                      `Historical Draft: ${h.title}`,
                      `[Setting: ${h.location} (${h.period})]\n\nOpening Hook:\n"${h.writingHook}"\n\n`
                    )
                  }
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0A4228] transition-all dark:bg-stone-800 dark:hover:bg-[#157347]"
                >
                  <PenTool className="h-3 w-3" />
                  <span>Draft This Era in Studio</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 5: Open-Access Library Directory */}
      {activeTab === 'archives' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#E6E1D8] bg-white p-6 shadow-xs dark:border-[#222E28] dark:bg-[#121B17]">
            <h3 className="font-['Playfair_Display'] text-xl font-bold text-stone-900 dark:text-white mb-2">
              Curated Open-Access Nigerian Scholarly & Literary Partnerships
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 mb-6">
              Exclusive and public open-access institutional repositories to verify historical dates, treaty transcripts, archaeological finds, and literary journals for your research.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Kenneth Dike Library African Collection',
                  institution: 'University of Ibadan, Ibadan',
                  desc: 'West Africa’s premier archive of pre-colonial manuscripts, Yoruba historical documentation, and post-war Nigerian government gazettes.',
                  tags: ['Manuscripts', 'Historical Newspapers', 'Colonial Treaties'],
                  linkText: 'Explore Open Digital Catalog',
                },
                {
                  title: 'Arewa House Archives & Northern Historical Documentation',
                  institution: 'Ahmadu Bello University, Kaduna',
                  desc: 'Exhaustive trans-Saharan trade records, Sultanate of Sokoto Arabic manuscripts, and northern oral history transcriptions.',
                  tags: ['Sokoto Caliphate', 'Hausa Literature', 'Savanna History'],
                  linkText: 'Access Arewa Research Portal',
                },
                {
                  title: 'National Archives of Nigeria (Enugu, Ibadan, Kaduna)',
                  institution: 'Federal Ministry of Information & Culture',
                  desc: 'Public domain registry of district officer diaries, customary court proceedings, and 1929 Aba Women’s War official inquiry records.',
                  tags: ['Legal Archives', 'Aba Women’s War', 'Provincial Logs'],
                  linkText: 'National Archival Registry',
                },
                {
                  title: 'Ife Art & Archaeology Open Repository',
                  institution: 'Obafemi Awolowo University, Ile-Ife',
                  desc: 'Scientific cataloging of 12th-century copper and terracotta heads, sacred groves, and glass bead manufacturing sites.',
                  tags: ['Ancient Metallurgy', 'Terracotta Art', 'Yoruba Antiquity'],
                  linkText: 'View OAU Archaeology Database',
                },
              ].map((res, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-stone-200 bg-stone-50 p-5 dark:border-stone-800 dark:bg-stone-900/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[11px] font-semibold text-[#0A4228] dark:text-[#4ade80] mb-1">
                      {res.institution}
                    </div>
                    <h4 className="font-semibold text-stone-900 dark:text-white text-sm">
                      {res.title}
                    </h4>
                    <p className="mt-2 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {res.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1 text-[10px] text-stone-500">
                      {res.tags.map((t, idx) => (
                        <span key={idx} className="rounded bg-stone-200/60 dark:bg-stone-800 px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#B94700] hover:underline cursor-pointer flex items-center gap-1 dark:text-amber-400">
                      {res.linkText} <ExternalLink className="h-3 w-3" />
                    </span>
                    <button
                      onClick={() =>
                        onUseSeedInStudio(
                          `Research Note: ${res.title}`,
                          `/* Source Reference: ${res.title} (${res.institution}) */\nResearch topic details:\n${res.desc}\n\n`
                        )
                      }
                      className="text-xs text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white font-medium"
                    >
                      Cite in Studio
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
