import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Shadows } from '../constants/theme';

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
        <View style={styles.overlay} />

        {/* Top Row */}
        <View style={styles.topRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>today's story</Text>
          </View>
          <TouchableOpacity onPress={() => setIsLoved(!isLoved)} activeOpacity={0.6}>
            <Ionicons
              name={isLoved ? 'heart' : 'heart-outline'}
              size={18}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.excerpt}>{excerpt}</Text>
        </View>

        {/* Bottom Row */}
        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.actionRow} onPress={onPress} activeOpacity={0.6}>
            <Text style={styles.actionText}>read full story</Text>
            <Ionicons name="arrow-forward-outline" size={13} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={onSharePress}
            activeOpacity={0.7}
          >
            <Ionicons name="share-social-outline" size={14} color={Colors.text.secondary} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xs,
    marginBottom: 32, // Breathing space before "how are you feeling"

    borderRadius: 16,
    overflow: 'hidden',
    ...Shadows.md,
  },
  card: {
    padding: 16, // Shrink internal padding
    minHeight: 180, // Shrink min height
    position: 'relative',
  },
  cardImage: {
    borderRadius: 16,
    opacity: 0.8, // Added opacity to the background image
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(140, 80, 20, 0.18)',
    borderRadius: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: Colors.green.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: Colors.white,
    letterSpacing: 0.2,
  },
  content: {
    marginBottom: 12,
  },
  title: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 22,
    color: Colors.white,
    marginBottom: 2,
    lineHeight: 28,
  },
  excerpt: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 18,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.white,
    marginRight: 4,
  },
  shareButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.82)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
