import {
  WritingPrompt,
  FolkloreEntry,
  SlangTerm,
  LiteraryMaster,
  HistoricalEpoch,
  Contest,
  CommunityPost,
} from '../types';

export const INITIAL_PROMPTS: WritingPrompt[] = [
  {
    id: 'prompt-1',
    title: 'The Brasscaster of Igun Street',
    premise:
      'In historic Benin City, a young guild artisan discovers that an antique terracotta mould refuses to cast bronze unless spoken to in archaic Edo court proverbs.',
    culturalAnchor: 'Benin Kingdom brass guild, royal court heritage, guild secrets',
    openingLine:
      'The molten bronze cooled into charcoal whenever Osas spoke in English; the furnace only drank fire when he addressed it in his grandfather’s tongue.',
    genre: 'Historical Literary Fiction',
    themes: ['Benin Heritage', 'Artisanship', 'Ancestral Memory'],
    suggestedLength: 'Short Story (3,000 words)',
  },
  {
    id: 'prompt-2',
    title: 'Yellow Danfo Midnight Run',
    premise:
      'A nocturnal yellow bus conductor navigating the third mainland bridge discovers that tonight’s passengers all hold currency dated June 12, 1993.',
    culturalAnchor: 'Lagos urban folklore, historic memory, Carter Bridge nightscape',
    openingLine:
      'When the headlights cut through the Atlantic mist above the lagoon, the conductor noticed none of the commuters had cast a shadow on the vinyl seats.',
    genre: 'Lagos Noir / Speculative Mystery',
    themes: ['Lagos Nightlife', 'Historical Echoes', 'Urban Commute'],
    suggestedLength: 'Flash Fiction (1,200 words)',
  },
  {
    id: 'prompt-3',
    title: 'Whispers of the Idanre Monoliths',
    premise:
      'A climatologist researching cloud-burst patterns in Ondo State discovers her grandmother’s iron staff responds to incoming lightning before the meteorological satellite does.',
    culturalAnchor: 'Yoruba cosmology, Shango storm lore, Idanre hill sanctuaries',
    openingLine:
      'The six hundred and sixty-seven steps up the mountain were worn smooth by centuries of bare feet, but today the granite trembled with an electrical charge.',
    genre: 'Afro-Surrealism / Climate Fiction',
    themes: ['Indigenous Knowledge', 'Science & Myth', 'Idanre Hills'],
    suggestedLength: 'Novelette (7,500 words)',
  },
  {
    id: 'prompt-4',
    title: 'The Stilt Fisherman of Brass River',
    premise:
      'Deep in the mangrove wetlands of the Niger Delta, an elder reels in an antique telegraph coil transmitting voices from the 1895 Akassa raid.',
    culturalAnchor: 'Niger Delta waterways, palm oil trade history, Nembe kingdom',
    openingLine:
      'The tide brought two things that sunrise: a school of silver bonga fish and a brass spool humming with Queen Victoria’s morse code.',
    genre: 'Magical Realism / Historical Ecology',
    themes: ['Delta Ecology', 'Trade History', 'River Spirits'],
    suggestedLength: 'Short Story (2,500 words)',
  },
  {
    id: 'prompt-5',
    title: 'Harmattan in the Ancient Dye Pits',
    premise:
      'In Kano’s Kofar Mata pits, an indigo master’s apprentice discovers a secret blue pigment formulation that renders dyed fabrics completely fireproof during the dry wind season.',
    culturalAnchor: 'Kano 500-year indigo pits, Hausa trade guilds, trans-Saharan commerce',
    openingLine:
      'The harmattan dust turned the Kano sky to ground chalk, but deep within the clay pits, the indigo fermented with the dark sheen of midnight oil.',
    genre: 'Historical Drama',
    themes: ['Northern Heritage', 'Craft Mastery', 'Trans-Saharan Legacy'],
    suggestedLength: 'Short Story (3,200 words)',
  },
  {
    id: 'prompt-6',
    title: 'The Jollof Treaty of London-Lagos Flight 082',
    premise:
      'Two matriarchs of rival catering empires in Ikeja are stranded side-by-side in Terminal 5 when their luggage—containing secret spice blends—gets swapped.',
    culturalAnchor: 'Contemporary Nigerian family pride, culinary lore, diaspora mobility',
    openingLine:
      'Aunty Bisi could identify counterfeit curry powder from twenty paces, but staring into Mrs. Okon’s open Louis Vuitton tote, she witnessed an unforgivable culinary revelation.',
    genre: 'Satirical Contemporary Fiction',
    themes: ['Culinary Pride', 'Matriarchal Power', 'Diaspora Humor'],
    suggestedLength: 'Flash Fiction (1,500 words)',
  },
];

export const FOLKLORE_DATA: FolkloreEntry[] = [
  {
    id: 'folk-1',
    name: 'Òrúnmìlà & the Ifá Corpus',
    culture: 'Yoruba',
    category: 'Deity / Orisha',
    summary:
      'The deity of wisdom, intellectual discernment, and divine fate (Ibìkejì Èdùmàrè). Witness to creation and custodian of the 256 Odù Ifá poetic-philosophical verses that encode scientific, medicinal, and ethical wisdom.',
    storySeed:
      'A computer science researcher at the University of Ibadan analyzes binary algorithmic matrices and discovers structural similarities to the 16 primary Odù binary markings.',
    associatedSymbols: ['Opon Ifá (Divination Tray)', 'Ikin (Sacred Palm Nuts)', 'Opele Chain'],
    literaryReference: 'Wole Soyinka’s Myth, Literature and the African World',
  },
  {
    id: 'folk-2',
    name: 'Ala (Earth Mother & Moral Axis)',
    culture: 'Igbo',
    category: 'Deity / Orisha',
    summary:
      'The supreme deity of the earth, morality, fertility, and ancestral resting grounds in Igbo Odinani cosmology. The guardian of Omenala (sacred custom); any moral transgression against community is considered "Nso Ala" (desecration of the earth).',
    storySeed:
      'A property developer digging foundation trenches in an ancestral palm grove in Owerri uncovers ancient Mbari clay sculptures that repair themselves overnight.',
    associatedSymbols: ['Mbari Houses', 'Sacred Earth', 'White Chalk (Nzu)', 'Yam Vines'],
    literaryReference: 'Chinua Achebe’s Things Fall Apart and Arrow of God',
  },
  {
    id: 'folk-3',
    name: 'Mami Wata (The Water Maiden)',
    culture: 'Pan-Nigerian',
    category: 'Mythical Creature',
    summary:
      'The revered, hypnotic water deity venerated across coastal West Africa, particularly in the Niger Delta, Calabar, and Lagos lagoons. She embodies seductive wealth, artistic inspiration, water mysteries, and uncompromising devotion.',
    storySeed:
      'A struggling highlife saxophone player in 1970s Port Harcourt is gifted a vintage silver instrument that plays notes no mortal brass can sustain—at an escalating nightly cost.',
    associatedSymbols: ['Serpent Coils', 'Hand Mirror', 'Combs', 'Fresh Water Pearls'],
    literaryReference: 'Flora Nwapa’s Efuru',
  },
  {
    id: 'folk-4',
    name: 'Dodo of the Savanna Caves',
    culture: 'Hausa',
    category: 'Mythical Creature',
    summary:
      'The ancient guardian ogre or mystical wilderness being in Hausa folklore and the classic oral literature anthology "Magana Jari Ce". Dodo often guards subterranean treasures, wells during droughts, or sacred trees.',
    storySeed:
      'During a drought in Zaria, young herders locate a well guarded by a riddling spirit who demands stories of forgotten ancestors rather than cattle as tribute.',
    associatedSymbols: ['Deep Wells', 'Acacia Horns', 'Night Wind (Iska)', 'Baobab Bark'],
    literaryReference: 'Abubakar Imam’s Magana Jari Ce',
  },
  {
    id: 'folk-5',
    name: 'Queen Idia & the Emotan Spirit',
    culture: 'Edo/Benin',
    category: 'Legendary Hero',
    summary:
      'Queen Mother (Iyoba) of the 16th-century Benin Empire, master strategist, military commander, and medicinal savant who protected Oba Esigwe during the Idah war. Represented worldwide by the iconic Benin ivory pendant masks.',
    storySeed:
      'A museum restorer in London begins receiving sensory dreams of 16th-century battlefield strategies while cataloging looted Benin ivory artifacts.',
    associatedSymbols: ['Ivory Mask', 'Coral Beads', 'Bronze Bells', 'Ekasa Dance'],
    literaryReference: 'Benin Royal Chronicle & oral histories',
  },
  {
    id: 'folk-6',
    name: 'Nsibidi (Ancient Ideographic Script)',
    culture: 'Efik/Ibibio',
    category: 'Sacred Geometry',
    summary:
      'A pre-colonial indigenous script and communication system originated in the Cross River basin by the Ejagham, Efik, and Igbo peoples. Used by the secret Ekpe society to record treaties, court cases, poetry, and love letters.',
    storySeed:
      'A calligrapher in modern Calabar inherits a century-old velvet wrapper embroidered with Nsibidi characters that, when read under moonlight, function as a topological map to an unmapped forest clearing.',
    associatedSymbols: ['Ukara Cloth', 'Ekpe Leopard Emblem', 'Sacred Gestures', 'Chalk Inscriptions'],
    literaryReference: 'Nsibidi scripts documented in Nigerian National Archives',
  },
];

export const NIGERIAN_LEXICON: SlangTerm[] = [
  {
    term: 'Ajebutter / Ajepako',
    literalMeaning: 'Butter child vs Wooden spoon child',
    actualUsage: 'Ajebutter refers to someone raised in pampered upper-class luxury; Ajepako is someone raised street-hardened and resourceful.',
    sampleDialogue: '"See this ajebutter boy holding umbrella inside light drizzle, while ajepako kids are playing football in the gutter rain!"',
    region: 'Lagos & Nationwide',
  },
  {
    term: 'Abeg / Biko / Dan Allah',
    literalMeaning: 'I beg (English) / Please (Igbo) / For God\'s sake (Hausa)',
    actualUsage: 'The universal Nigerian pleader, conversational exclamation of disbelief, or polite request.',
    sampleDialogue: '"Abeg leave that matter! How can one small bowl of pepper soup cost five thousand naira?"',
    region: 'Nationwide Pan-Nigerian',
  },
  {
    term: 'E Choke / E Rest',
    literalMeaning: 'It is choking / It has rested',
    actualUsage: 'A modern exclamation denoting an overwhelming, jaw-dropping display of success, luxury, or intensity.',
    sampleDialogue: '"Did you see her entrance at the wedding in that George fabric? My sister, e choke!"',
    region: 'Lagos / Gen-Z & Urban',
  },
  {
    term: 'Fall Hand',
    literalMeaning: 'To let down one\'s hand',
    actualUsage: 'To disappoint someone or fail to meet expectations.',
    sampleDialogue: '"I trusted the printer to deliver the literary magazine copies by Thursday, but the man fall my hand completely."',
    region: 'Nationwide Pidgin',
  },
  {
    term: 'Gbege',
    literalMeaning: 'Trouble or intense commotion',
    actualUsage: 'A sudden, serious problem, dispute, or scandal requiring urgent de-escalation.',
    sampleDialogue: '"Big gbege happened at the motor park when two conductors started claiming the same passenger’s luggage."',
    region: 'South-West / Lagos',
  },
  {
    term: 'Jara',
    literalMeaning: 'Extra / Bonus added on top',
    actualUsage: 'The beloved West African market practice where the seller throws in an extra piece of fruit, meat, or benefit as goodwill.',
    sampleDialogue: '"Mama Nkechi, add jara for me now! I bought five tubers of yam from you, don’t be stingy."',
    region: 'Nationwide Market Culture',
  },
  {
    term: 'K-leg',
    literalMeaning: 'Knock-knees',
    actualUsage: 'An unforeseen complication, hitch, or flaw in an otherwise straightforward plan.',
    sampleDialogue: '"The contract was ready for signing until the legal officer discovered a serious K-leg in the land title."',
    region: 'Nationwide',
  },
  {
    term: 'Kolo / Dey craze',
    literalMeaning: 'Go crazy / Lost one\'s mind',
    actualUsage: 'Acting eccentric, absurdly daring, or totally out of line.',
    sampleDialogue: '"Driving against one-way traffic on Ikorodu road? This man has kolo finish!"',
    region: 'Lagos & Urban Centers',
  },
  {
    term: 'Shine Eye',
    literalMeaning: 'Keep your eyes bright',
    actualUsage: 'Be vigilant, street-smart, and mentally alert so you don\'t get outsmarted or conned.',
    sampleDialogue: '"This is Oshodi market, not your university campus. Shine your eyes and hold your backpack tight."',
    region: 'Lagos Urban',
  },
  {
    term: 'Vawulence',
    literalMeaning: 'Playful Nigerian pronunciation of violence',
    actualUsage: 'Witty, unsparing internet roast, sharp-tongued debate, or theatrical family drama.',
    sampleDialogue: '"Writers Twitter woke up and chose pure vawulence today over that Booker prize longlist review."',
    region: 'Social Media / Youth',
  },
  {
    term: 'Wetin Dey?',
    literalMeaning: 'What is happening?',
    actualUsage: 'The warmest, most ubiquitous Nigerian greeting: what\'s up, how are things?',
    sampleDialogue: '"Chairman! Wetin dey? Long time no see for the writers circle."',
    region: 'Pan-Nigerian Pidgin',
  },
  {
    term: 'Yab / Yabbies',
    literalMeaning: 'To tease or roast playfully',
    actualUsage: 'A sharp verbal jibe or good-natured roast among close comrades, popularized by Fela Kuti.',
    sampleDialogue: '"Don’t take him serious, he was just yabbing you because of your new spectacles."',
    region: 'Nationwide',
  },
];

export const LITERARY_MASTERS: LiteraryMaster[] = [
  {
    name: 'Chinua Achebe',
    lifespan: '1930 – 2013',
    notableWorks: ['Things Fall Apart', 'No Longer at Ease', 'Arrow of God', 'Anthills of the Savannah'],
    craftAdvice:
      'Proverbs are the palm-oil with which words are eaten. Never write merely to entertain a distant gaze; write to restore dignity to people whose stories have been silenced.',
    quote: 'If you do not like someone else’s story, write your own.',
    focusGenre: 'Post-Colonial Tragedy & Cultural Realism',
  },
  {
    name: 'Flora Nwapa',
    lifespan: '1931 – 1993',
    notableWorks: ['Efuru', 'Idu', 'One is Enough', 'Never Again'],
    craftAdvice:
      'Give African women their true agency on the page. In our traditional societies, women were traders, priestesses, and decision-makers—render them complex, not mere domestic shadows.',
    quote: 'I write because I have a message for the world, especially for African women.',
    focusGenre: 'Feminist Pioneer & River Realism',
  },
  {
    name: 'Wole Soyinka',
    lifespan: '1934 – Present (Nobel Laureate 1986)',
    notableWorks: ['Death and the King’s Horseman', 'The Interpreters', 'Aké: The Years of Childhood'],
    craftAdvice:
      'The tiger does not proclaim his tigritude; he pounces. Let the rhythm of your language embody the mythic weight of your cosmos—Ogun, the god of metal and creativity, creates through iron and fire.',
    quote: 'The greatest threat to freedom is the absence of criticism.',
    focusGenre: 'Dramatic Mythos & Intellectual Resistance',
  },
  {
    name: 'Buchi Emecheta',
    lifespan: '1944 – 2017',
    notableWorks: ['The Joys of Motherhood', 'Second Class Citizen', 'The Bride Price'],
    craftAdvice:
      'Write from the raw truth of survival. Document the kitchen, the immigrant room, the cost of maternity, and the quiet heroism of ordinary women navigating rigid traditions.',
    quote: 'I believe in the African woman’s quiet resilience that outlasts empires.',
    focusGenre: 'Social Realism & Diaspora Survival',
  },
  {
    name: 'Chimamanda Ngozi Adichie',
    lifespan: '1977 – Present',
    notableWorks: ['Purple Hibiscus', 'Half of a Yellow Sun', 'Americanah'],
    craftAdvice:
      'The single story creates stereotypes, and the problem with stereotypes is not that they are untrue, but that they are incomplete. Focus on microscopic specificity: the texture of pounded yam, the sound of rain on glass, the precise silence between lovers.',
    quote: 'Stories matter. Many stories matter. Stories have been used to dispossess and to malign, but stories can also be used to empower and to humanize.',
    focusGenre: 'Contemporary Epic & Psychological Realism',
  },
  {
    name: 'Ben Okri',
    lifespan: '1959 – Present (Booker Prize 1991)',
    notableWorks: ['The Famished Road', 'Songs of Enchantment', 'Astonishing the Gods'],
    craftAdvice:
      'Our world is not flat; the ancestors and the unborn walk beside us in the market. In Nigerian reality, the spirit realm and the physical realm interlock like fingers. Write the magical as natural fact.',
    quote: 'We are music makers, and we are the dreamers of dreams.',
    focusGenre: 'Afro-Surrealism & Abiku Lore',
  },
];

export const HISTORICAL_EPOCHS: HistoricalEpoch[] = [
  {
    id: 'epoch-1',
    title: 'The Nok Civilization & Terracotta Masters',
    period: '500 BC – 200 AD',
    location: 'Central Plateau & Kaduna River Basin',
    narrativeOverview:
      'Sub-Saharan Africa’s earliest known iron-smelting and terracotta sculpting culture. Sculptures characterized by piercing triangular eyes, elaborate hairstyles, and dignified ceremonial expressions.',
    writingHook:
      'A young sculptor discovers that iron-smelting kilns can trap echoes of spoken conversations inside the porous clay.',
    keyThemes: ['Ancient Metallurgical Prowess', 'Terracotta Secrets', 'Archaeological Mystery'],
  },
  {
    id: 'epoch-2',
    title: 'The Golden Kingdom of Benin & The Oba’s Court',
    period: '1180 – 1897',
    location: 'Edo State, Ancient City of Benin',
    narrativeOverview:
      'One of the world’s most sophisticated urban planning feats, protected by the Great Benin Walls (longer than the Great Wall of China). Renowned for its master guild of royal bronze casters and ivory sculptors.',
    writingHook:
      'A court musician during the 15th-century reign of Oba Ewuare uncovers a plot hidden inside bronze casting orders.',
    keyThemes: ['Urban Mastery', 'Royal Lineages', 'Guild Dynasties', '1897 Punitive Expedition'],
  },
  {
    id: 'epoch-3',
    title: 'FESTAC ’77: The World Black Arts Festival',
    period: 'January – February 1977',
    location: 'National Theatre, Lagos & Durbar in Kaduna',
    narrativeOverview:
      'The monumental Second World Black and African Festival of Arts and Culture. 16,000 artists, writers, and thinkers from 56 nations gathered in Lagos at the peak of Nigeria’s oil boom.',
    writingHook:
      'Two visiting poets from Harlem and Kingston meet an apprentice printer in Festac Town who is secretly publishing banned political pamphlets beneath festival brochures.',
    keyThemes: ['Pan-African Solidarity', 'Cultural Renaissance', '70s Highlife & Afrobeat'],
  },
  {
    id: 'epoch-4',
    title: 'June 12, 1993: The Democracy Crossroads',
    period: '1993 – 1998',
    location: 'Nationwide (Lagos, Abuja, Abeokuta)',
    narrativeOverview:
      'Nigeria’s freest and fairest democratic election, won by MKO Abiola, annulled by the military regime, sparking a decade of civic resistance, underground pirate radio (Radio Kudirat), and courage.',
    writingHook:
      'A female broadcast sound engineer secretly records and broadcasts pro-democracy resistance messages from a moving bread van in Surulere.',
    keyThemes: ['Civic Courage', 'Pirate Radio', 'Political Resilience', 'Lagos Under Curfew'],
  },
];

export const CONTESTS_DATA: Contest[] = [
  {
    id: 'contest-1',
    title: 'The Eko Twilight Speculative Fiction Prize',
    prizeNaira: '₦250,000',
    prizeUSD: '$350',
    sponsor: 'InkSpark Literary Foundation & Lagos Cultural Trust',
    deadline: 'December 15, 2026',
    daysRemaining: 37,
    wordLimit: '2,000 – 4,500 words',
    themePrompt:
      'Lagos in 2080 or the Reimagining of Ancient Yoruba/Igbo/Hausa Folklore in a Modern African Megacity.',
    genre: 'Speculative Fiction / Afro-Futurism',
    entryFee: 'Free Entry',
    judges: ['Dr. Jumoke Verissimo', 'Tade Thompson', 'Kola Tubosun'],
    imagePath: '/src/assets/images/contest_eko_prize_1794134392028.jpg',
    rules: [
      'Original, unpublished work written in English or Nigerian Pidgin.',
      'Must incorporate a tangible Nigerian cultural anchor or setting.',
      'Winner receives ₦250,000 cash, publication in the annual InkSpark Anthology, and author mentorship.',
      'Two runners-up receive ₦50,000 each and editorial book bundles.',
    ],
  },
  {
    id: 'contest-2',
    title: 'Folklore Reimagined Anthology Grant',
    prizeNaira: '₦150,000',
    prizeUSD: '$200',
    sponsor: 'African Heritage Writers Guild',
    deadline: 'January 10, 2027',
    daysRemaining: 63,
    wordLimit: '1,000 – 2,500 words',
    themePrompt:
      'Re-tell an authentic oral folktale (Anansi, Tortoise/Ijapa, Mami Wata, Queen Idia, Bayajidda) from the perspective of an overlooked character.',
    genre: 'Folklore Retelling / Magical Realism',
    entryFee: 'Free Entry',
    judges: ['Chigozie Obioma', 'Ayobami Adebayo'],
    imagePath: '/src/assets/images/folklore_mythology_art_1794134391197.jpg',
    rules: [
      'Must name the original oral source culture.',
      'Exploration of moral nuance beyond simple good vs. evil.',
      'Selected stories compiled into the print anthology "Echoes of the Baobab".',
    ],
  },
  {
    id: 'contest-3',
    title: 'Naija Campus Micro-Memoir Challenge',
    prizeNaira: '₦75,000',
    prizeUSD: '$100',
    sponsor: 'Zik & Awo Literary Society',
    deadline: 'November 30, 2026',
    daysRemaining: 22,
    wordLimit: '500 – 1,000 words',
    themePrompt:
      'True or semi-fictionalized accounts of university life in Nigeria: hall week fever, semester exams, mama-put friendships, or the legendary strikes.',
    genre: 'Creative Non-Fiction / Campus Memoir',
    entryFee: 'Free Entry',
    judges: ['Dami Ajayi', 'Molara Wood'],
    imagePath: '/src/assets/images/hero_nigerian_writer_1794134392139.jpg',
    rules: [
      'Vivid, humorous, or poignant true-to-life voice.',
      'Open to current students and recent graduates under 30.',
      'Cash prize disbursed via bank transfer within 7 days of winner announcement.',
    ],
  },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Feyikemi Adesina',
    authorRole: 'Novelist & Lagos Fellow',
    authorLocation: 'Yaba, Lagos',
    avatarUrl: '/src/assets/images/writer_feyikemi_avatar_1794134391972.jpg',
    title: 'The Salt Vendors of Badagry Marina',
    genre: 'Historical Literary Fiction',
    excerpt:
      'Before dawn broke over the lagoon, the salt women would rinse their calabashes in brackish water, their voices trading maritime chants that had survived the slave voyages of the 18th century...',
    fullText: `Before dawn broke over the lagoon, the salt women would rinse their calabashes in brackish water, their voices trading maritime chants that had survived the slave voyages of the 18th century.

Mama Senami was eighty-two, her hands permanently crusted with white brine like frosted coral. She claimed that salt was the only substance that kept sorrow from decaying into bitterness.

"If you weep into the lagoon," she told me, tapping my notebook with a finger yellowed by palm oil, "the water forgets. But when you boil the salt out of the water, the tears remain as solid stone. That is what you write with, young woman. Solid stone."

I sat on the wooden pier of the Badagry Marina while the outboard engines of the wooden market boats began their rhythmic chug toward Porto-Novo. A boy in a yellow Arsenal jersey hurled a woven net into the shallows; when he drew it in, silver minnows fluttered like tossed coins against the morning sun.`,
    tags: ['Badagry', 'Salt Heritage', 'Atlantic Memory', 'Historical'],
    likes: 47,
    hasLiked: false,
    claps: 128,
    publishedAt: '2 hours ago',
    commentsCount: 3,
    comments: [
      {
        id: 'c-1',
        author: 'Emeka Eze',
        text: '"When you boil the salt out of the water, the tears remain as solid stone"—this line gave me absolute goosebumps. Such profound Nigerian lyricism!',
        time: '1h ago',
        isCritique: false,
      },
      {
        id: 'c-2',
        author: 'Fatima Garba',
        text: 'The pacing in the second paragraph is pristine. Consider describing what the lagoon smells like in that early morning hour—mangrove mud and diesel smoke.',
        time: '35m ago',
        isCritique: true,
      },
    ],
  },
  {
    id: 'post-2',
    authorName: 'Tunde Bakare',
    authorRole: 'Speculative Author',
    authorLocation: 'Ibadan, Oyo State',
    avatarUrl: '/src/assets/images/hero_nigerian_writer_1794134392139.jpg',
    title: 'Rusty Roofs & Cybernetic Hawks',
    genre: 'Afro-Surrealism',
    excerpt:
      'From the summit of Bower’s Tower in 2075, Ibadan’s brown corrugated iron roofs still stretched like an ocean of sun-baked cinnamon, but now optical data fibers hummed beneath every zinc gutter...',
    fullText: `From the summit of Bower’s Tower in 2075, Ibadan’s brown corrugated iron roofs still stretched like an ocean of sun-baked cinnamon, but now optical data fibers hummed beneath every zinc gutter.

The hawks that circled over Mapo Hall were no longer mere birds; they carried solar-charged telemetry rings crafted by apprentices at the Dugbe Hardware Guild. 

Kazeem adjusted his holographic spectacles. Down on the asphalt of Iwo Road, an autonomous electric Danfo bus painted in classic yellow with twin black stripes was negotiating a roundabout with three stubborn cows.

"Some things never change," Kazeem muttered, smiling as the bus AI politely sounded a synthetic horn that sounded suspiciously like a frustrated fuji drummer.`,
    tags: ['Ibadan', 'Afrofuturism', 'Bower Tower', 'Speculative'],
    likes: 38,
    hasLiked: true,
    claps: 92,
    publishedAt: 'Yesterday',
    commentsCount: 2,
    comments: [
      {
        id: 'c-3',
        author: 'Ngozi Okoli',
        text: 'The autonomous Danfo honking like a frustrated fuji drummer is pure comedic genius! Authentic Nigerian tech humor.',
        time: '18h ago',
        isCritique: false,
      },
    ],
  },
  {
    id: 'post-3',
    authorName: 'Halima Sani',
    authorRole: 'Poet & Essayist',
    authorLocation: 'Zaria, Kaduna',
    avatarUrl: '/src/assets/images/folklore_mythology_art_1794134391197.jpg',
    title: 'The Indigo Weaver’s Silent Vow',
    genre: 'Historical Literary Fiction',
    excerpt:
      'Her grandmother told her that the blue of the Kofar Mata pits was not made of dye, but of caught shadows pressed into cotton before the noon sun could burn them away...',
    fullText: `Her grandmother told her that the blue of the Kofar Mata pits was not made of dye, but of caught shadows pressed into cotton before the noon sun could burn them away.

In Zaria, the dry wind blew from the Sahara, carrying red dust that settled on the eyelashes of the market women like powdered ochre. Amina submerged her forearms into the fermented vat. The pungent scent of ash water and indigo leaves was older than the brick walls of the Emir’s palace.

To be a woman who dyes cloth is to be a woman who controls how the world perceives color. When she lifted the fabric into the hot air, it transformed from sickly green to deep imperial indigo right before her eyes—a chemistry of air and ancestry.`,
    tags: ['Zaria', 'Kano Dye Pits', 'Northern Voice', 'Textile Lore'],
    likes: 52,
    hasLiked: false,
    claps: 144,
    publishedAt: '3 days ago',
    commentsCount: 1,
    comments: [
      {
        id: 'c-4',
        author: 'Kelechi Nwosu',
        text: 'Sensory storytelling at its best. The transition of color from green to indigo under the Sahara wind is mesmerizing.',
        time: '2d ago',
        isCritique: false,
      },
    ],
  },
];
