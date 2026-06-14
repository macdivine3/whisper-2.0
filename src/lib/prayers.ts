// src/lib/prayers.ts
// Prayer data layer. In L1, prayer TEXT is canned per theme; in L2, Claude
// generates it from the conversation. Either way the PrayerCard component and
// these save/load helpers stay the same.

import { supabase } from './supabase';

export interface Prayer {
  id?: string;
  title: string;
  body: string;
  verse?: string;
  reference?: string;
  theme: string;
}

// Canned prayers keyed by theme/mood. Mirrors the inspo card designs.
const PRAYERS: Record<string, Prayer> = {
  overwhelmed: {
    theme: 'overwhelmed',
    title: 'A Prayer for Your Overwhelm',
    body: "Heavenly Father,\n\nYou see the weight I'm carrying. You know the thoughts I can't quiet and the fears I can't shake.\n\nThank You that I don't have to carry this alone.\n\nBe my peace in the middle of this. Guide my steps, calm my heart, and remind me that You are near. Help me trust You — today and always.\n\nAmen.",
    verse: 'Cast all your anxiety on Him because He cares for you.',
    reference: '1 Peter 5:7',
  },
  anxious: {
    theme: 'anxious',
    title: 'A Prayer for Your Heart',
    body: "Lord,\n\nQuiet the racing in my chest. Where fear is loud, let Your peace be louder.\n\nYou are not far from me in this. Steady me, hold me, and remind me I am safe in Your hands.\n\nAmen.",
    verse: 'When anxiety was great within me, Your consolation brought me joy.',
    reference: 'Psalm 94:19',
  },
  drained: {
    theme: 'drained',
    title: 'A Prayer for Rest',
    body: "Lord, I release today into Your hands.\n\nI'm tired, and I don't have much left to give. Thank You for walking with me, holding me, and never letting me go.\n\nRenew what's empty in me. I will rest in Your unfailing love.\n\nAmen.",
    verse: 'Come to me, all you who are weary and burdened, and I will give you rest.',
    reference: 'Matthew 11:28',
  },
  peaceful: {
    theme: 'peaceful',
    title: 'A Prayer for Peace Tonight',
    body: "Father, quiet my mind and calm my heart.\n\nThank You for being my safe place to rest. Let Your peace guard my night and fill me with assurance.\n\nAmen.",
    verse: 'In peace I will lie down and sleep, for You alone, Lord, make me dwell in safety.',
    reference: 'Psalm 4:8',
  },
  hopeful: {
    theme: 'hopeful',
    title: 'A Prayer of Hope',
    body: "Lord, thank You for the light breaking through.\n\nHold onto the hope You've placed in me, even when the road is unclear. Help me trust that You are writing a good story.\n\nAmen.",
    verse: 'May the God of hope fill you with all joy and peace as you trust in Him.',
    reference: 'Romans 15:13',
  },
  grateful: {
    theme: 'grateful',
    title: 'A Prayer of Gratitude',
    body: "Father, my heart is full.\n\nThank You for the gifts I see and the ones I miss. Thank You for being near in the small moments. Let gratitude shape the way I live today.\n\nAmen.",
    verse: 'Give thanks to the Lord, for He is good; His love endures forever.',
    reference: 'Psalm 107:1',
  },
};

const DEFAULT_PRAYER: Prayer = {
  theme: 'default',
  title: 'A Prayer for This Moment',
  body: "Heavenly Father,\n\nYou know exactly where I am right now. Meet me here.\n\nThank You that I don't have to have the words. Hold what I can't say, and remind me that You are near.\n\nAmen.",
  verse: 'The Lord is close to the brokenhearted.',
  reference: 'Psalm 34:18',
};

/** Get a canned prayer for a theme/mood (L1). Falls back to a gentle default. */
export function getPrayer(theme?: string | null): Prayer {
  return (theme && PRAYERS[theme]) || DEFAULT_PRAYER;
}

/** Save a prayer to the user's collection (cloud). */
export async function savePrayer(prayer: Prayer): Promise<boolean> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase.from('saved_prayers').insert({
      user_id: user.id,
      title: prayer.title,
      body: prayer.body,
      verse: prayer.verse ?? null,
      reference: prayer.reference ?? null,
      theme: prayer.theme,
    });
    return !error;
  } catch {
    return false;
  }
}

/** Load the user's saved prayers, newest first. */
export async function getSavedPrayers(): Promise<Prayer[]> {
  try {
    const { data, error } = await supabase
      .from('saved_prayers')
      .select('id, title, body, verse, reference, theme, created_at')
      .order('created_at', { ascending: false });
    if (error || !data) return [];
    return data as Prayer[];
  } catch {
    return [];
  }
}
