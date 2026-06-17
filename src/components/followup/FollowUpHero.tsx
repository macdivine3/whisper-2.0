import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Radius, Shadows, Spacing } from '../../constants/theme';

const MAILBOX_IMAGE = require('../../../svjs/gemini-2.5-flash-image_Remove_the_background_completely_and_make_the_edges_of_the_illustration_fade_out-0-removebg-preview.png');

interface Props {
  onPrayPress?: () => void;
  latestMood?: string | null;
}

export default function FollowUpHero({ onPrayPress, latestMood }: Props) {
  const displayMood = latestMood || 'quiet';

  return (
    <View style={styles.heroSection}>
      <View style={styles.heroLeft}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>follow-up</Text>
          <Ionicons name="leaf" size={16} color={Colors.green.primary} style={styles.logoIcon} />
        </View>
        <Text style={styles.tagline}>Whisper's check-in, just for you.</Text>

        {/* Memory Box with Pray Overlap */}
        <View style={styles.memoryBoxContainer}>
          <View style={styles.memoryBox}>
            <View style={styles.memoryIconCircle}>
              <Ionicons name="leaf-outline" size={12} color={Colors.green.secondary} />
            </View>
            <View style={styles.memoryTextContainer}>
              <Text style={styles.memoryTagText}>Whisper remembers</Text>
              <View style={styles.memoryMessageRow}>
                <Text style={styles.memoryMessage}>You've been feeling </Text>
                <View style={styles.moodHighlightBg}>
                  <Text style={styles.moodHighlightText}>{displayMood}.</Text>
                </View>
              </View>
              <Text style={styles.memorySub}>I'm here to walk with you.</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.prayAboutItCard} 
            activeOpacity={0.8}
            onPress={onPrayPress}
          >
            <Ionicons name="hand-right-outline" size={14} color={Colors.white} style={{ marginRight: 6 }} />
            <Text style={styles.prayAboutItText}>pray about it??</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Gradient oval backdrop + Mailbox Image */}
      <View style={styles.mailboxWrapper}>
        <LinearGradient
          colors={['#F5ECD7', '#F0E4C8', 'transparent']}
          style={styles.mailboxGradientBg}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
        <Image source={MAILBOX_IMAGE} style={styles.mailboxImage} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    position: 'relative',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    minHeight: 180,
  },
  heroLeft: {
    width: '65%',
    zIndex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logo: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 34,
    color: Colors.green.primary,
    letterSpacing: -0.5,
  },
  logoIcon: {
    marginLeft: 4,
  },
  tagline: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.text.muted,
    marginTop: 4,
    marginBottom: Spacing.xl,
  },
  memoryBoxContainer: {
    position: 'relative',
    marginBottom: Spacing.xl + 10,
  },
  memoryBox: {
    backgroundColor: Colors.bg.primary,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E8E2D8',
    ...Shadows.sm,
  },
  prayAboutItCard: {
    position: 'absolute',
    // MOVE OVERLAP POSITION
    bottom: -20, // Overlap bottom (more negative = lower)
    right: -10,  // Overlap right (negative = sticking out past the edge)
    backgroundColor: Colors.green.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.md,
    elevation: 4,
    zIndex: 10,
  },
  prayAboutItText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.white,
  },
  memoryIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EAEBE3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  memoryTextContainer: {
    flex: 1,
  },
  memoryTagText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  memoryMessageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 4,
  },
  memoryMessage: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.text.primary,
  },
  moodHighlightBg: {
    backgroundColor: '#EBE6F3',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  moodHighlightText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: '#816CA8',
  },
  memorySub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: Colors.text.muted,
  },
  mailboxWrapper: {
    position: 'absolute',
    right: -20,
    top: -30,
    width: 220,
    height: 220,
    zIndex: 0,
  },
  mailboxGradientBg: {
    position: 'absolute',
    // Oval shape sitting behind the image
    top: '10%',
    left: '5%',
    right: '5%',
    bottom: '5%',
    borderRadius: 999,
  },
  mailboxImage: {
    width: '100%',
    height: '100%',
    // RESIZE WITHOUT MOVING: Change scale (e.g. 1.2 is bigger)
    transform: [{ scale: 1.0 }],
  },
});
