import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Radius, Shadows, Spacing } from '../../constants/theme';

const BOOK_LEAF_IMAGE = require('../../../svjs/book_leaf-removebg-preview.png');

const PROMPT_TEXT = "What's something you're learning to surrender into God's hands?";

interface Props {
  onPress?: (prompt: string) => void;
}

export default function JournalPromptCard({ onPress }: Props) {
  return (
    <View style={styles.featuredContainer}>
      <View style={styles.featuredCard}>
        <View style={styles.featuredContent}>
          <View style={styles.featuredLabelRow}>
            <Ionicons name="sunny-outline" size={16} color="#C9851A" />
            <Text style={styles.featuredLabel}>TODAY'S REFLECTION</Text>
          </View>

          <Text style={styles.featuredTitle}>{PROMPT_TEXT}</Text>

          <TouchableOpacity
            style={styles.featuredCta}
            activeOpacity={0.7}
            onPress={() => onPress?.(PROMPT_TEXT)}
          >
            <Ionicons name="leaf-outline" size={16} color={Colors.green.primary} />
            <Text style={styles.featuredCtaText}>take a moment to write</Text>
          </TouchableOpacity>
        </View>

        {/* Background image positioned absolute on the right */}
        <Image source={BOOK_LEAF_IMAGE} style={styles.featuredImage} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  featuredContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  featuredCard: {
    backgroundColor: '#F9F1E6',
    borderRadius: Radius.lg,
    height: 180,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8E2D8',
    ...Shadows.sm,
  },
  featuredImage: {
    position: 'absolute',
    // MOVE IMAGE: Change right/bottom
    right: -30,
    bottom: -30,
    // BASE SIZE
    width: 250,
    height: 100,
    zIndex: 0,
    // RESIZE WITHOUT MOVING: Change scale
    transform: [{ scale: 4.9 }],
  },
  featuredContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    zIndex: 1,
    width: '80%',
  },
  featuredLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featuredLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    color: Colors.green.primary,
    marginLeft: 6,
    letterSpacing: 1.0,
  },
  featuredTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 16,
    color: Colors.text.primary,
    lineHeight: 22,
    marginBottom: 12,
  },
  featuredCta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredCtaText: {
    color: Colors.green.primary,
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    marginLeft: 6,
  },
});
