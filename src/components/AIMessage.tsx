import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing } from '../constants/theme';

const LEAF_IMAGE = require('../../assets/images/leaf-transparent.png');

interface AIMessageProps {
  message: string;
  time: string;
  senderName?: string;
  showDecorativeLeaf?: boolean;
}

export default function AIMessage({
  message,
  time,
  senderName = 'whisper',
  showDecorativeLeaf = false,
}: AIMessageProps) {
  // Entrance animation
  const opacity = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.timing(slideY, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity, transform: [{ translateY: slideY }] }]}>
      {/* Decorative leaf floating behind text */}
      {showDecorativeLeaf && (
        <View style={styles.leafDecor}>
          <Image source={LEAF_IMAGE} style={styles.leafImage} resizeMode="contain" />
        </View>
      )}

      {/* Sender Header */}
      <View style={styles.header}>
        <View style={styles.avatarDot} />
        <Text style={styles.senderText}>{senderName}</Text>
        <Ionicons name="leaf" size={10} color={Colors.green.primary} style={styles.headerIcon} />
        <Text style={styles.timeText}>{time}</Text>
      </View>

      {/* Message Text — flat on background, no bubble */}
      <Text style={styles.messageText}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    position: 'relative',
    alignSelf: 'stretch',
  },
  leafDecor: {
    position: 'absolute',
    right: 15,
    top: -5,
    zIndex: -1,
    opacity: 1,
  },
  leafImage: {
    width: 140,
    height: 140,
    transform: [{ rotate: '25deg' }],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  avatarDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.green.primary,
    marginRight: 6,
  },
  senderText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    color: Colors.text.primary,
    letterSpacing: 0.8,
    textTransform: 'lowercase',
  },
  headerIcon: {
    marginHorizontal: 6,
  },
  timeText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    color: Colors.text.muted,
  },
  messageText: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 16,
    color: Colors.text.primary,
    lineHeight: 25,
  },
});

