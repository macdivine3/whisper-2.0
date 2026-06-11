import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Shadows, Spacing } from '../constants/theme';

// The high-quality background
const STORY_BG = require('../../assets/images/story-bg.png');

interface StoryCardProps {
  title?: string;
  excerpt?: string;
  onPress?: () => void;
  onSharePress?: () => void;
}

export default function StoryCard({
  title = "The Owner's Dog",
  excerpt = "Do you know what it's like to be seen as nothing but your worst moment?",
  onPress,
  onSharePress,
}: StoryCardProps) {
  const [isLoved, setIsLoved] = useState(false);

  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={STORY_BG}
        style={styles.card}
        imageStyle={styles.cardImage}
        resizeMode="cover"
      >
        {/* Toned down 'glass' overlay to reduce sharpness */}
        <View style={styles.overlay} />

        <View style={styles.innerContent}>
          {/* Top row */}
          <View style={styles.cardTopRow}>
            <View style={styles.storyBadge}>
              <Text style={styles.storyBadgeText}>today's story</Text>
            </View>
            <TouchableOpacity onPress={() => setIsLoved(!isLoved)} activeOpacity={0.6} hitSlop={8}>
              <Feather
                name="heart"
                size={22}
                color={isLoved ? '#E07B7B' : "#fff"}
              />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.middleContent}>
            <Text style={styles.storyTitle}>{title}</Text>
            <Text style={styles.storyBody}>{excerpt}</Text>
          </View>

          {/* Bottom row */}
          <View style={styles.storyBottomRow}>
            <TouchableOpacity style={styles.readLink} onPress={onPress} activeOpacity={0.6}>
              <Text style={styles.storyReadLink}>read full story</Text>
              <Feather name="arrow-right" size={15} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={onSharePress}
              activeOpacity={0.7}
              hitSlop={8}
            >
              <Feather name="share-2" size={18} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
    marginBottom: 28,
    borderRadius: 24,
    overflow: 'hidden',
    ...Shadows.md,
  },
  card: {
    minHeight: 240,
    width: '100%',
  },
  cardImage: {
    // Ensuring the image covers the whole card area
    ...StyleSheet.absoluteFill,
    borderRadius: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.15)', // Slightly darker glass for better readability
    borderRadius: 24,
  },
  innerContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storyBadge: {
    backgroundColor: Colors.green.secondary,
    borderRadius: 99,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  storyBadgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  middleContent: {
    marginVertical: 12,
  },
  storyTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  storyBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  storyBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  storyReadLink: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  shareButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 99,
    padding: 10,
  },
});
