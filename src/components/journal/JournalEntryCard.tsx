import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Radius, Shadows, Spacing } from '../../constants/theme';

const MOOD_ICONS = {
  grateful: require('../../../svjs/grateful-removebg-preview.png'),
  peaceful: require('../../../svjs/peaceful-removebg-preview.png'),
  anxious: require('../../../svjs/anxious-removebg-preview.png'),
  drained: require('../../../svjs/drained-removebg-preview.png'),
  overwhelmed: require('../../../svjs/overwhelmed-removebg-preview.png'),
  unsure: require('../../../svjs/unsure-removebg-preview.png'),
  hopeful: require('../../../svjs/grateful-removebg-preview.png'), // Fallback
};

interface JournalEntry {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  mood: string;
  color: string;
  isFavorite?: boolean;
}

interface Props {
  entry: JournalEntry;
}

export default function JournalEntryCard({ entry }: Props) {
  return (
    <TouchableOpacity style={styles.entryCard} activeOpacity={0.85}>
      <View style={[styles.moodIconBg, { backgroundColor: entry.color + '15' }]}>
        <Image
          source={MOOD_ICONS[entry.mood as keyof typeof MOOD_ICONS] || MOOD_ICONS.peaceful}
          style={styles.moodIconImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.entryMain}>
        <Text style={styles.entryTitle} numberOfLines={1}>
          {entry.title}
        </Text>
        <Text style={styles.entryExcerpt} numberOfLines={2}>
          {entry.excerpt}
        </Text>
      </View>

      <View style={styles.entryRight}>
        <View style={styles.entryRightTop}>
          <Text style={styles.entryDate}>{entry.date}</Text>
          <Ionicons
            name={entry.isFavorite ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color={entry.isFavorite ? Colors.green.primary : Colors.text.muted}
            style={{ marginLeft: 6 }}
          />
        </View>
        <View style={[styles.emotionTag, { backgroundColor: entry.color + '20' }]}>
          <Text style={[styles.emotionTagText, { color: entry.color }]}>{entry.mood}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  entryCard: {
    flexDirection: 'row',
    backgroundColor: Colors.bg.primary,
    padding: 16,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    alignItems: 'center',
    ...Shadows.sm,
  },
  moodIconBg: {
    width: 54,
    height: 54,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  moodIconImage: {
    width: '100%',
    height: '100%',
  },
  entryMain: {
    flex: 1,
    paddingRight: 8,
  },
  entryTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  entryExcerpt: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  entryRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 54,
  },
  entryRightTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryDate: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: Colors.text.muted,
  },
  emotionTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  emotionTagText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    textTransform: 'lowercase',
  },
});
export type { JournalEntry };
