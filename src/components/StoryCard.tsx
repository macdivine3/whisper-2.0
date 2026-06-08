import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Shadows } from '../constants/theme';

// The watercolor JPG from your svjs folder
const WATERCOLOR_BG = require('../../svjs/story card.jpg');

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
        source={WATERCOLOR_BG}
        style={styles.card}
        imageStyle={styles.cardImage}
        resizeMode="cover"
      >
        {/* Semi-transparent dark overlay so text is always readable */}
        <View style={styles.overlay} />

        {/* Top Row: badge + heart */}
        <View style={styles.topRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>today's story</Text>
          </View>
          <TouchableOpacity onPress={() => setIsLoved(!isLoved)} activeOpacity={0.6}>
            <Ionicons
              name={isLoved ? 'heart' : 'heart-outline'}
              size={20}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.excerpt}>{excerpt}</Text>
        </View>

        {/* Bottom Row: read link + share circle */}
        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.actionRow} onPress={onPress} activeOpacity={0.6}>
            <Text style={styles.actionText}>read full story</Text>
            <Ionicons name="arrow-forward-outline" size={14} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={onSharePress}
            activeOpacity={0.7}
          >
            <Ionicons name="share-social-outline" size={16} color={Colors.text.secondary} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  card: {
    padding: Spacing.lg,
    position: 'relative',
  },
  cardImage: {
    borderRadius: Radius.lg,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(140, 80, 20, 0.18)', // very subtle warm dark overlay
    borderRadius: Radius.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  badge: {
    backgroundColor: Colors.green.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
  },
  badgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.white,
    letterSpacing: 0.2,
  },
  content: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 24,
    color: Colors.white,
    marginBottom: Spacing.xs,
    lineHeight: 30,
  },
  excerpt: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 20,
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
    fontSize: 13,
    color: Colors.white,
    marginRight: 4,
  },
  shareButton: {
    width: 34,
    height: 34,
    borderRadius: Radius.circle,
    backgroundColor: 'rgba(255,255,255,0.82)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
