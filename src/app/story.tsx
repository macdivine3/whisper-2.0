import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius, Shadows, Spacing } from '../constants/theme';
import { dailyStories } from '../data/dailyContent';

export default function StoryReaderScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const story = dailyStories.find((s) => s.id === id) ?? dailyStories[0];

  // Split the body into paragraphs so we get comfortable spacing between them.
  const paragraphs = story.content.split('\n\n').filter((p) => p.trim().length > 0);

  const handleShare = () =>
    router.push({ pathname: '/story-card', params: { id: story.id } });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn} activeOpacity={0.6}>
          <Ionicons name="chevron-back" size={24} color={Colors.text.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTag}>today's story</Text>
        <TouchableOpacity onPress={handleShare} style={styles.headerBtn} activeOpacity={0.6}>
          <Ionicons name="share-social-outline" size={22} color={Colors.text.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{story.title}</Text>

        {/* Full story body */}
        {paragraphs.map((p, i) => (
          <Text key={i} style={styles.paragraph}>
            {p}
          </Text>
        ))}

        {/* Deep comment — the punchline */}
        <View style={styles.deepCommentBox}>
          <Ionicons name="leaf" size={16} color={Colors.green.primary} />
          <Text style={styles.deepComment}>{story.deepComment}</Text>
        </View>

        {/* Verse */}
        <Text style={styles.verse}>{story.verse}</Text>

        {/* Share CTA */}
        <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.85}>
          <Ionicons name="share-social-outline" size={16} color={Colors.white} />
          <Text style={styles.shareText}>share this story</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.default,
  },
  headerBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTag: {
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: Colors.green.primary,
  },
  scroll: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  title: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 28,
    color: Colors.text.primary,
    lineHeight: 36,
    marginBottom: Spacing.lg,
  },
  paragraph: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 26,
    marginBottom: Spacing.md,
  },
  deepCommentBox: {
    backgroundColor: Colors.green.faint,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.green.primary,
    gap: 8,
  },
  deepComment: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 16,
    color: Colors.text.primary,
    lineHeight: 24,
  },
  verse: {
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 14,
    color: Colors.text.muted,
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.green.primary,
    paddingVertical: 16,
    borderRadius: Radius.pill,
    ...Shadows.md,
  },
  shareText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
    color: Colors.white,
  },
});
