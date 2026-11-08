import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Sparkles, Send, PenTool, X, Check, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CommunityPost, Draft } from '../types';

interface CommunityFeedProps {
  posts: CommunityPost[];
  onToggleLike: (postId: string) => void;
  onClap: (postId: string) => void;
  onAddComment: (postId: string, text: string, isCritique: boolean) => void;
  onPublishDraft: (newPost: Partial<CommunityPost>) => void;
  userDrafts: Draft[];
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  posts,
  onToggleLike,
  onClap,
  onAddComment,
  onPublishDraft,
  userDrafts,
}) => {
  const [selectedGenreFilter, setSelectedGenreFilter] = useState('All');
  const [readingPost, setReadingPost] = useState<CommunityPost | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [isCritiqueFeedback, setIsCritiqueFeedback] = useState(false);

  // Publish Modal state
  const [selectedDraftId, setSelectedDraftId] = useState(userDrafts[0]?.id || '');
  const [penName, setPenName] = useState('Feyikemi Alex');
  const [authorRole, setAuthorRole] = useState('Emerging Writer · Lagos');
  const [publishGenre, setPublishGenre] = useState('Flash Fiction');
  const [publishTags, setPublishTags] = useState('Lagos, Nightlife, Memory');

  const filteredPosts = posts.filter((p) => {
    if (selectedGenreFilter === 'All') return true;
    return p.genre.toLowerCase().includes(selectedGenreFilter.toLowerCase());
  });

  const handleClapWithConfetti = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    onClap(postId);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    confetti({
      particleCount: 20,
      spread: 45,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    });
  };

  const handleCommentSubmit = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(postId, commentInput.trim(), isCritiqueFeedback);
    setCommentInput('');
    setIsCritiqueFeedback(false);
  };

  const handleConfirmPublish = (e: React.FormEvent) => {
    e.preventDefault();
    const draft = userDrafts.find((d) => d.id === selectedDraftId) || userDrafts[0];
    if (!draft) return;

    onPublishDraft({
      title: draft.title || 'Untitled Story',
      excerpt: draft.content.slice(0, 180) + '...',
      fullText: draft.content,
      authorName: penName || 'Anonymous Writer',
      authorRole: authorRole || 'Storyteller',
      authorLocation: 'Lagos, Nigeria',
      genre: publishGenre,
      tags: publishTags.split(',').map((t) => t.trim()).filter(Boolean),
      avatarUrl: '/src/assets/images/writer_feyikemi_avatar_1794134391972.jpg',
    });

    setShowPublishModal(false);
    confetti({ particleCount: 80, spread: 60 });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Community Header & Action */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-6 dark:border-stone-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#B94700] dark:text-amber-400 mb-1">
            InkSpark Literary Salon & Writer Parlor
          </div>
          <h1 className="font-['Playfair_Display'] text-3xl font-extrabold text-stone-900 dark:text-white">
            Writers Community & Peer Critique
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
            Share excerpts, celebrate creative breakthroughs, and exchange thoughtful literary critique with fellow African storytellers.
          </p>
        </div>

        <button
          onClick={() => setShowPublishModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0A4228] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#07321e] transition-all dark:bg-[#157347] dark:hover:bg-[#198a54] self-start sm:self-auto shrink-0"
        >
          <PenTool className="h-3.5 w-3.5" />
          <span>Publish Draft to Community</span>
        </button>
      </div>

      {/* Genre Filter Tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {['All', 'Historical Literary Fiction', 'Afro-Surrealism', 'Lagos Noir', 'Flash Fiction'].map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGenreFilter(g)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-colors ${
              selectedGenreFilter === g
                ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Posts Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Feed Stream */}
        <div className="lg:col-span-8 space-y-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl border border-[#E6E1D8] bg-white p-6 sm:p-7 shadow-xs hover:border-stone-300 dark:border-[#222E28] dark:bg-[#121B17] transition-all"
            >
              {/* Author Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.avatarUrl}
                    alt={post.authorName}
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full object-cover border border-amber-200 dark:border-amber-900"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                      {post.authorName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                      <span>{post.authorRole}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.authorLocation}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.publishedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs font-medium text-[#0A4228] dark:text-[#4ade80]">
                  {post.genre}
                </div>
              </div>

              {/* Story Title & Excerpt */}
              <h2
                onClick={() => setReadingPost(post)}
                className="font-['Playfair_Display'] text-xl font-bold text-stone-900 dark:text-white hover:text-[#0A4228] dark:hover:text-[#4ade80] cursor-pointer transition-colors"
              >
                {post.title}
              </h2>

              <p className="mt-2.5 font-['Newsreader'] text-base leading-relaxed text-stone-700 dark:text-stone-300">
                "{post.excerpt}"
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-stone-400">
                {post.tags.map((t, idx) => (
                  <React.Fragment key={t}>
                    <span>#{t}</span>
                    {idx < post.tags.length - 1 && <span>·</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  {/* Claps */}
                  <button
                    onClick={(e) => handleClapWithConfetti(e, post.id)}
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-amber-700 hover:bg-amber-50 active:scale-95 transition-all dark:text-amber-400 dark:hover:bg-amber-950/40"
                    title="Give literary claps"
                  >
                    <span role="img" aria-label="clap">👏</span>
                    <span className="font-mono font-semibold">{post.claps}</span>
                  </button>

                  {/* Likes */}
                  <button
                    onClick={() => onToggleLike(post.id)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-colors ${
                      post.hasLiked
                        ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400'
                        : 'text-stone-500 hover:text-rose-600'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${post.hasLiked ? 'fill-current' : ''}`} />
                    <span className="font-mono">{post.likes}</span>
                  </button>

                  {/* Comments count / toggle */}
                  <button
                    onClick={() =>
                      setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)
                    }
                    className="flex items-center gap-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-300"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments?.length || 0} Comments</span>
                  </button>
                </div>

                <button
                  onClick={() => setReadingPost(post)}
                  className="font-semibold text-[#0A4228] hover:underline dark:text-[#4ade80]"
                >
                  Read Full Story →
                </button>
              </div>

              {/* Comments Section Drawer */}
              {activeCommentPostId === post.id && (
                <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-4">
                  <div className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    Community Feedback & Spark Critiques
                  </div>

                  {/* Comments List */}
                  {post.comments && post.comments.length > 0 ? (
                    <div className="space-y-2.5">
                      {post.comments.map((c) => (
                        <div
                          key={c.id}
                          className={`rounded-xl p-3 text-xs ${
                            c.isCritique
                              ? 'border border-amber-200/80 bg-amber-50/60 dark:border-amber-900/40 dark:bg-amber-950/20'
                              : 'bg-stone-50 dark:bg-stone-800/60'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-stone-900 dark:text-white">
                              {c.author}
                            </span>
                            <div className="flex items-center gap-2">
                              {c.isCritique && (
                                <span className="rounded bg-amber-200/70 dark:bg-amber-900 px-1.5 py-0.5 text-[10px] font-bold text-amber-900 dark:text-amber-200">
                                  Editorial Critique
                                </span>
                              )}
                              <span className="text-[10px] text-stone-400">{c.time}</span>
                            </div>
                          </div>
                          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-stone-400 italic">No feedback yet. Be the first to spark a comment!</p>
                  )}

                  {/* Add Comment Input */}
                  <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="space-y-2 pt-1">
                    <div className="flex items-center gap-2 text-[11px] text-stone-600 dark:text-stone-300">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isCritiqueFeedback}
                          onChange={(e) => setIsCritiqueFeedback(e.target.checked)}
                          className="rounded text-[#0A4228] focus:ring-[#0A4228]"
                        />
                        <span>Flag as constructive "Spark Critique"</span>
                      </label>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Write constructive encouragement or feedback..."
                        className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs text-stone-900 focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-white"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-[#0A4228] transition-colors dark:bg-stone-800 dark:hover:bg-[#157347]"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Right Column: Literary Salon Spotlights & Tips */}
        <div className="lg:col-span-4 space-y-6">
          {/* Spotlight Card */}
          <div className="rounded-2xl border border-[#E6E1D8] bg-white p-6 shadow-xs dark:border-[#222E28] dark:bg-[#121B17]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#B94700] dark:text-amber-400 mb-2">
              Featured Writer of the Week
            </div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/src/assets/images/writer_feyikemi_avatar_1794134391972.jpg"
                alt="Feyikemi Adesina"
                referrerPolicy="no-referrer"
                className="h-12 w-12 rounded-full object-cover border border-[#0A4228]"
              />
              <div>
                <h4 className="font-bold text-stone-900 dark:text-white text-sm">
                  Feyikemi Adesina
                </h4>
                <div className="text-xs text-stone-500">Lagos Fellow & Novelist</div>
              </div>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
              "InkSpark’s prompt on the Badagry salt vendors opened a portal to my grandmother’s stories. The peer feedback here helped me shave 400 words of filler."
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 flex items-center justify-between">
              <span>Published: 4 stories</span>
              <span className="font-semibold text-[#0A4228] dark:text-[#4ade80]">520 Claps received</span>
            </div>
          </div>

          {/* Spark Critique Guidelines */}
          <div className="rounded-2xl border border-stone-200 bg-[#FBF9F5] p-5 dark:border-stone-800 dark:bg-stone-900/50">
            <h4 className="font-bold text-stone-900 dark:text-white text-xs mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#B94700]" />
              <span>The InkSpark Peer Critique Code</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
              <li className="flex items-start gap-1.5">
                <span className="text-[#0A4228] font-bold">1.</span>
                <span>Honor cultural voice and regional idioms with respect.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#0A4228] font-bold">2.</span>
                <span>Highlight at least 1 vivid image or line that resonated.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#0A4228] font-bold">3.</span>
                <span>Offer specific, actionable suggestions for narrative rhythm.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Full Story Lightbox Modal */}
      {readingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-10 shadow-2xl dark:bg-[#121B17] border border-[#E6E1D8] dark:border-[#222E28]">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
              <div className="text-xs text-stone-500">
                By <strong className="text-stone-800 dark:text-stone-200">{readingPost.authorName}</strong> · {readingPost.authorLocation}
              </div>
              <button
                onClick={() => setReadingPost(null)}
                className="rounded-lg p-1 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6">
              <div className="text-xs font-semibold text-[#0A4228] dark:text-[#4ade80] uppercase tracking-wider mb-1">
                {readingPost.genre}
              </div>
              <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
                {readingPost.title}
              </h2>

              <div className="mt-6 font-['Newsreader'] text-base sm:text-lg leading-[1.85] text-stone-800 dark:text-stone-200 whitespace-pre-line">
                {readingPost.fullText}
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleClapWithConfetti(e, readingPost.id)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 bg-amber-50 text-amber-800 text-xs font-bold dark:bg-amber-950/40 dark:text-amber-200"
                  >
                    <span>👏 Clap</span>
                    <span className="font-mono">{readingPost.claps}</span>
                  </button>
                </div>
                <button
                  onClick={() => setReadingPost(null)}
                  className="rounded-xl bg-stone-900 px-4 py-2 text-xs font-semibold text-white dark:bg-stone-800"
                >
                  Close Story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-[#121B17] border border-[#E6E1D8] dark:border-[#222E28]">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-stone-900 dark:text-white">
                Publish Draft to Community
              </h3>
              <button
                onClick={() => setShowPublishModal(false)}
                className="text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmPublish} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Select Draft from Your Studio
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Your Author / Pen Name
                  </label>
                  <input
                    type="text"
                    value={penName}
                    onChange={(e) => setPenName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Genre
                  </label>
                  <select
                    value={publishGenre}
                    onChange={(e) => setPublishGenre(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  >
                    <option value="Flash Fiction">Flash Fiction</option>
                    <option value="Historical Literary Fiction">Historical Literary Fiction</option>
                    <option value="Afro-Surrealism">Afro-Surrealism</option>
                    <option value="Lagos Noir">Lagos Noir</option>
                    <option value="Poetry / Prose Poem">Poetry / Prose Poem</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={publishTags}
                  onChange={(e) => setPublishTags(e.target.value)}
                  placeholder="e.g. Lagos, Third Mainland, Midnight, Danfo"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                />
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPublishModal(false)}
                  className="rounded-xl px-4 py-2 text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#0A4228] px-5 py-2 font-semibold text-white shadow-sm hover:bg-[#07321e] dark:bg-[#157347]"
                >
                  Confirm & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
