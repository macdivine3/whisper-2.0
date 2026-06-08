import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Radius, Shadows, CommonStyles } from '../constants/theme';

interface NightWhisperCardProps {
  title: string;
  message: string;
  whisper: string;
  onPress?: () => void;
}

export default function NightWhisperCard({ title, message, whisper, onPress }: NightWhisperCardProps) {
  return (
    <LinearGradient
      colors={['#1C2D40', '#263347', '#1A2438']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Stars decoration */}
      <View style={styles.starField}>
        <View style={[styles.star, { top: 12, left: 30, width: 3, height: 3 }]} />
        <View style={[styles.star, { top: 22, left: 90, width: 2, height: 2 }]} />
        <View style={[styles.star, { top: 8,  left: 160, width: 2.5, height: 2.5 }]} />
        <View style={[styles.star, { top: 30, left: 220, width: 2, height: 2 }]} />
        <View style={[styles.star, { top: 14, right: 40, width: 3, height: 3 }]} />
        <View style={[styles.star, { top: 28, right: 110, width: 2, height: 2 }]} />
      </View>

      {/* Moon icon */}
      <View style={styles.topRow}>
        <View style={styles.tagRow}>
          <Ionicons name="moon" size={12} color="#B8C5D6" style={{ marginRight: 6 }} />
          <Text style={styles.tagText}>TONIGHT'S WHISPER</Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={16} color="#5E7A99" />
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Message */}
      <Text style={styles.message} numberOfLines={3}>{message}</Text>

      {/* Whisper quote */}
      <View style={styles.whisperContainer}>
        <View style={styles.whisperLeftBar} />
        <Text style={styles.whisperText}>{whisper}</Text>
      </View>

      {/* Action */}
      <TouchableOpacity style={styles.actionBtn} onPress={onPress} activeOpacity={0.7}>
        <Text style={styles.actionText}>read tonight's whisper</Text>
        <Ionicons name="arrow-forward" size={14} color="#7FAAD4" />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    overflow: 'hidden',
    position: 'relative',
    ...Shadows.md,
  },
  starField: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 99,
    opacity: 0.5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#7FAAD4',
  },
  title: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 22,
    color: '#EEF3F8',
    marginBottom: Spacing.sm,
    lineHeight: 28,
  },
  message: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#9AB3C8',
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  whisperContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
    paddingLeft: Spacing.xs,
  },
  whisperLeftBar: {
    width: 2,
    backgroundColor: '#4A7FAE',
    borderRadius: 1,
    marginRight: Spacing.sm,
    alignSelf: 'stretch',
    minHeight: 20,
  },
  whisperText: {
    flex: 1,
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 13,
    color: '#C4D5E3',
    lineHeight: 18,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  actionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#7FAAD4',
    marginRight: 6,
  },
});
