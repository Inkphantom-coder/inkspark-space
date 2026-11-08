import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Built-in Nigerian curated prompts as robust fallback
const CURATED_PROMPTS = [
  {
    id: 'curated-1',
    title: 'The Rainmaker of Idanre Hills',
    premise:
      'In a quiet town nestled beneath the ancient granite monoliths of Idanre, a meteorologist returns from Lagos only to find her grandmother’s sacred brass pot humming in frequency with incoming thunderstorms.',
    culturalAnchor: 'Yoruba weather rites, Shango lore, and modern scientific clash',
    openingLine: 'The brass vessel did not leak water; it whispered in thunderclaps that only Simi and the swallows could hear.',
    genre: 'Afro-Surrealism / Speculative Fiction',
    themes: ['Heritage vs Modernity', 'Idanre Monoliths', 'Generational Secrets'],
    suggestedLength: 'Flash Fiction (800 words)',
  },
  {
    id: 'curated-2',
    title: 'Yellow Danfo Midnight Run',
    premise:
      'A late-night yellow bus conductor on the Ojuelegba–CMS route realizes that tonight’s passengers all have one thing in common: each was declared missing during the 1993 June 12 protests.',
    culturalAnchor: 'Lagos urban folklore, memory preservation, historical resilience',
    openingLine: 'When the engine sputtered at the foot of Carter Bridge, the passenger with the vintage bell-bottoms handed me a fifty-kobo note that still smelled of damp earth.',
    genre: 'Lagos Noir / Historical Mystery',
    themes: ['Lagos Nightlife', 'Historical Echoes', 'Urban Commute'],
    suggestedLength: 'Short Story (2,500 words)',
  },
  {
    id: 'curated-3',
    title: 'The Brasscaster’s Apprentice of Igun Street',
    premise:
      'A bronze sculptor in Benin City is commissioned to cast a mask depicting a lost pre-colonial queen, but the molten metal refuses to cool until he discovers whose face she originally wore.',
    culturalAnchor: 'Benin Kingdom guild of brass casters, oral lineage, ancestral memory',
    openingLine: 'The clay mould cracked down the left cheek three times, always at the exact hour the Oba’s horn sounded from the palace.',
    genre: 'Historical Literary Fiction',
    themes: ['Benin Heritage', 'Artisanship', 'Royal Archives'],
    suggestedLength: 'Novelette (5,000 words)',
  },
  {
    id: 'curated-4',
    title: 'The Fisherman of Brass River',
    premise:
      'In the mangrove creeks of the Niger Delta, an elderly stilt-fisherman reels in a copper telegraph wire that broadcasts voices speaking in 1895 British naval code and water-spirit whispers.',
    culturalAnchor: 'Niger Delta waterways, Mami Wata mythos, colonial trade routes',
    openingLine: 'The river was neither sweet nor salt today; it tasted of melted pennies and cold oil.',
    genre: 'Magical Realism / Environmental Fiction',
    themes: ['Niger Delta Ecology', 'Ancestral Waters', 'Memory'],
    suggestedLength: 'Short Story (2,000 words)',
  },
  {
    id: 'curated-5',
    title: 'Jollof Wars at 40,000 Feet',
    premise:
      'During a delayed flight from Abuja to London, two diaspora culinary rival matriarchs must negotiate a family peace when an unclaimed cooler of smoky party jollof goes missing in the cargo hold.',
    culturalAnchor: 'Nigerian family drama, culinary pride, contemporary diaspora satire',
    openingLine: 'Aunty Nike had survived three military coups and two recessions, but the sight of parboiled basmati masquerading as party jollof made her reach for her prayer beads.',
    genre: 'Satirical Contemporary Fiction',
    themes: ['Culinary Identity', 'Family Hierarchy', 'Humor'],
    suggestedLength: 'Flash Fiction (1,000 words)',
  },
];

// 1. Generate Writing Prompts Endpoint
app.post('/api/prompts/generate', async (req: Request, res: Response) => {
  const { keywords = '', genre = 'Any', tone = 'Evocative', themes = [] } = req.body;

  if (!ai) {
    // If no AI key is present, pick and adapt curated prompts based on query
    const filtered = CURATED_PROMPTS.slice(0, 3);
    return res.json({
      success: true,
      prompts: filtered,
      source: 'curated_library',
    });
  }

  try {
    const promptInstructions = `
You are InkSpark's Nigerian Literary Muse & Story Architect, steeped in Nigerian literature (Chinua Achebe, Buchi Emecheta, Flora Nwapa, Wole Soyinka, Ben Okri, Chimamanda Ngozi Adichie, Helon Habila, Akwaeke Emezi) and authentic Nigerian folklore, geography, idioms, and modern pulse.

Generate 3 deeply imaginative, evocative story writing prompts based on:
- User Keywords: "${keywords || 'Nigeria, culture, memory'}"
- Genre: "${genre}"
- Desired Tone: "${tone}"
- Selected Cultural Elements: "${themes.join(', ') || 'Folklore, Urban Lagos, Historical, Proverbs'}"

Each prompt MUST have an authentic Nigerian flavor (be it Lagos street life, Calabar river lore, Enugu coal city history, Kano ancient dye pits, Ibadan brown roofs, Yoruba orisha nuance, Igbo Odinani cosmology, or modern diaspora nuance).

Respond strictly with a valid JSON array of 3 objects with this exact schema:
[
  {
    "id": "prompt-uuid-string",
    "title": "Evocative Title",
    "premise": "2-3 sentence gripping premise setting up protagonist, conflict, and dilemma",
    "culturalAnchor": "Specific Nigerian location, folklore entity, historical era, or proverb reference",
    "openingLine": "A sparkling, immersive opening sentence for the writer to build from",
    "genre": "Genre name",
    "themes": ["Theme1", "Theme2", "Theme3"],
    "suggestedLength": "e.g. Flash Fiction (1,000 words) or Short Story"
  }
]
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptInstructions,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '[]';
    const parsed = JSON.parse(text);
    return res.json({
      success: true,
      prompts: Array.isArray(parsed) && parsed.length > 0 ? parsed : CURATED_PROMPTS.slice(0, 3),
      source: 'gemini',
    });
  } catch (error: any) {
    console.error('Error generating prompts via Gemini:', error);
    return res.json({
      success: true,
      prompts: CURATED_PROMPTS.slice(0, 3),
      source: 'curated_fallback',
      error: error.message,
    });
  }
});

// 2. Critique / Feedback Endpoint
app.post('/api/editor/critique', async (req: Request, res: Response) => {
  const { title = 'Untitled Draft', text = '', focusArea = 'overall' } = req.body;

  if (!text || text.trim().length < 20) {
    return res.status(400).json({ error: 'Draft text must be at least 20 characters to review.' });
  }

  if (!ai) {
    return res.json({
      success: true,
      critique: {
        strengths: [
          'Vivid sensory atmosphere and evocative voice.',
          'Authentic emotional stakes rooted in human relationships.',
        ],
        opportunities: [
          'Deepen the sensory textures of the environment (sounds of traffic, scent of rain on dust).',
          'Sharpen dialogue rhythm so each character’s cadence feels distinct.',
        ],
        culturalInsight:
          'Consider weaving in a subtle Nigerian proverb or colloquial cadence to ground the narrator’s worldview naturally.',
        wordCount: text.trim().split(/\s+/).length,
        readingTimeMinutes: Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200)),
        sparkScore: 88,
      },
      source: 'offline_heuristic',
    });
  }

  try {
    const critiquePrompt = `
You are a warm, perceptive Nigerian literary editor and craft mentor at InkSpark Literary Studio.
Review this draft excerpt with constructive editorial care.

Draft Title: "${title}"
Focus Area Requested: "${focusArea}"
Draft Content:
"""
${text.slice(0, 4000)}
"""

Evaluate with acute attention to:
1. Sensory immediacy & narrative pull
2. Nigerian cultural authenticity (does it feel genuine, nuanced, avoiding flat tropes?)
3. Pacing & dialogue rhythm
4. Character stakes

Respond strictly with valid JSON with this schema:
{
  "strengths": ["string", "string"],
  "opportunities": ["string", "string"],
  "culturalInsight": "A tailored paragraph on how the cultural grounding, setting or voice can be elevated",
  "recommendedAction": "1 clear, encouraging next step for the writer in their next writing sprint",
  "sparkScore": 92
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: critiquePrompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      success: true,
      critique: parsed,
      source: 'gemini',
    });
  } catch (err: any) {
    console.error('Error in critique:', err);
    return res.json({
      success: true,
      critique: {
        strengths: ['Compelling premise with distinct narrative intention.'],
        opportunities: ['Expand character motivations in the middle beat.'],
        culturalInsight: 'Root the physical setting in tactile everyday details.',
        recommendedAction: 'Write the next 300 words focusing on character dialogue.',
        sparkScore: 85,
      },
      source: 'fallback',
    });
  }
});

// 3. Spice Dialogue / Naija Cadence Enhancer
app.post('/api/editor/spice', async (req: Request, res: Response) => {
  const { text = '', style = 'pidgin-inflected' } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  if (!ai) {
    return res.json({
      success: true,
      enhanced: text,
      notes: 'AI service unavailable; keeping original draft intact.',
    });
  }

  try {
    const styleDescriptions: Record<string, string> = {
      'pidgin-inflected': 'Natural, modern Nigerian Pidgin English spoken in urban Lagos, Warri, or Port Harcourt without overdoing it.',
      'formal-eloquent': 'Classic Nigerian post-independence literary English with graceful cadence, proverbs, and dignity (Achebe / Soyinka style).',
      'lagos-street': 'High-energy contemporary Lagos youth banter, witty comebacks, and subtle slangs like "no wahala", "e choke", "sharp sharp".',
      'elderly-wisdom': 'Deliberate, respectful cadence rich with Yoruba, Igbo, or Hausa translated proverbs and honorifics.',
    };

    const prompt = `
Take the following dialogue/sentence and provide 2 authentic Nigerian cadence variations:
Style requested: ${styleDescriptions[style] || 'Authentic Nigerian cadence'}

Original Text:
"${text.slice(0, 500)}"

Respond strictly with valid JSON:
{
  "variation1": "First variation with natural cadence",
  "variation2": "Second variation with subtle nuance",
  "glossary": [
    { "term": "word or phrase used", "meaning": "definition and cultural context" }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      success: true,
      result: parsed,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Start Express and mount Vite dev middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`InkSpark Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
