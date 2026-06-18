import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius } from '../constants/theme';
import { dailyStories } from '../data/dailyContent';
import { storyExcerpts } from '../data/excerpt';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Ruled-paper colors
const PAPER = '#FAF6EC';
const RULE = 'rgba(120, 90, 70, 0.08)';
const MARGIN = 'rgba(193, 120, 120, 0.35)';
const INK = '#4A4034';
const INK_SOFT = '#8A7E6E';

const LINE_HEIGHT = 31; // body line-height; ruled lines align to this

// Pull "Psalm 147:3" out of a stored verse like "...sin. — John 8:11"
function referenceOnly(verse?: string): string {
  if (!verse) return '';
  const parts = verse.split('—');
  return parts[parts.length - 1].trim();
}

export default function StoryCardScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const story = dailyStories.find((s) => s.id === id) ?? dailyStories[0];

  const excerpt =
    storyExcerpts[story.title] ??
    story.content.split('\n\n').filter((p) => p.trim().length > 0)[0] ??
    '';
  const reference = referenceOnly(story.verse);

  // Enough ruled lines to fill the card height.
  const ruleCount = Math.ceil(SCREEN_HEIGHT / LINE_HEIGHT) + 2;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Header controls (excluded from the screenshot mentally — user crops) */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="close" size={24} color={INK_SOFT} />
          </TouchableOpacity>
        </View>

        {/* The Card */}
        <View style={styles.card}>
          {/* Ruled lines */}
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            {Array.from({ length: ruleCount }).map((_, i) => (
              <View key={i} style={[styles.rule, { top: (i + 1) * LINE_HEIGHT }]} />
            ))}
          </View>

          {/* Left margin line */}
          <View style={styles.marginLine} pointerEvents="none" />

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.kicker}>WHISPER STORIES</Text>
            <Text style={styles.title}>{story.title}</Text>
            {!!reference && <Text style={styles.reference}>{reference}</Text>}

            <Text style={styles.excerpt}>{`“${excerpt}”`}</Text>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            shared from whisper · the safe retreat sanctuary
          </Text>
        </View>

        {/* Screenshot hint */}
        <View style={styles.instructions}>
          <View style={styles.instructionPill}>
            <Ionicons name="camera-outline" size={16} color={Colors.white} />
            <Text style={styles.instructionText}>Screenshot to share this story</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E2D6',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: PAPER,
    borderRadius: Radius.sm,
    overflow: 'hidden',
  },
  rule: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: RULE,
  },
  marginLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 56,
    width: 1,
    backgroundColor: MARGIN,
  },
  content: {
    paddingTop: 44,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  kicker: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 12,
    letterSpacing: 6,
    color: INK_SOFT,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'CormorantGaramond_700Bold_Italic',
    fontSize: 38,
    color: INK,
    textAlign: 'center',
    marginTop: 14,
  },
  reference: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 12,
    letterSpacing: 3,
    color: INK_SOFT,
    textAlign: 'center',
    marginTop: 10,
  },
  excerpt: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 13,
    lineHeight: LINE_HEIGHT,
    letterSpacing: 1,
    color: INK,
    textAlign: 'center',
    marginTop: 48,
  },
  footer: {
    position: 'absolute',
    bottom: 28,
    left: 32,
    right: 32,
    fontFamily: 'CormorantGaramond_700Bold_Italic',
    fontSize: 15,
    letterSpacing: 1,
    color: INK_SOFT,
    textAlign: 'center',
  },
  instructions: {
    paddingBottom: 24,
    alignItems: 'center',
  },
  instructionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(58, 68, 52, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: Radius.pill,
    gap: 10,
  },
  instructionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.white,
  },
});
