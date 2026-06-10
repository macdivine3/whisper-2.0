import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Shadows } from '../constants/theme';

interface MoodItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bgColor: string;
}

// Exactly 6 moods — 3 columns x 2 rows — icons match the mockup
const MOODS: MoodItem[] = [
  { id: 'grateful',    label: 'grateful',    icon: 'leaf',          color: '#4D7C5A', bgColor: '#F0F5F1' },
  { id: 'hopeful',     label: 'hopeful',     icon: 'sunny',         color: '#C47F2A', bgColor: '#FCF5EB' },
  { id: 'peaceful',    label: 'peaceful',    icon: 'leaf-outline',  color: '#4A8FA8', bgColor: '#F0F7F9' },
  { id: 'anxious',     label: 'anxious',     icon: 'cloud',         color: '#B05A5A', bgColor: '#F9F1F1' },
  { id: 'drained',     label: 'drained',     icon: 'water',         color: '#7A7A9A', bgColor: '#F3F3F7' },
  { id: 'overwhelmed', label: 'overwhelmed', icon: 'rainy',         color: '#5A7A9A', bgColor: '#F1F5F9' },
];

interface MoodGridProps {
  onSelectMood?: (moodId: string) => void;
  selectedMood?: string | null;
}

export default function MoodGrid({ onSelectMood, selectedMood }: MoodGridProps) {
  return (
    <View style={styles.container}>
      {/* Section label */}
      <Text style={styles.sectionTitle}>HOW ARE YOU FEELING?</Text>

      {/* Sub-header row */}
      <View style={styles.headerRow}>
        <View style={styles.leftHeader}>
          <Text style={styles.subtitle}>how are you feeling?</Text>
          <TouchableOpacity activeOpacity={0.6} style={styles.infoIcon}>
            <Ionicons name="information-circle-outline" size={15} color={Colors.text.muted} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.6}>
          <Text style={styles.editLink}>edit mood</Text>
        </TouchableOpacity>
      </View>

      {/* Grid: 3 columns x 2 rows */}
      <View style={styles.grid}>
        {MOODS.map((mood) => {
          const isSelected = selectedMood === mood.id;
          return (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodPill,
                { backgroundColor: mood.bgColor },
                isSelected && { borderColor: mood.color, borderWidth: 1.5 },
              ]}
              onPress={() => onSelectMood?.(mood.id)}
              activeOpacity={0.75}
            >
              <Ionicons name={mood.icon} size={15} color={mood.color} style={styles.icon} />
              <Text style={[styles.moodLabel, { color: mood.color }]}>{mood.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl, // More breathing room
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9, // Smaller, more precise small-caps
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.green.primary,
    marginBottom: 6,
    opacity: 0.8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: 'NotoSerif_700Bold', // Bold serif to match other headers
    fontSize: 20,
    color: Colors.text.primary,
    letterSpacing: -0.3,
  },
  infoIcon: {
    marginLeft: 8,
    marginTop: 2,
  },
  editLink: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.green.primary, // Links usually brand color
  },
  // 3-column grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10, // Slightly more gap
  },
  moodPill: {
    width: '31.2%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'transparent',
    ...Shadows.sm,
  },
  icon: {
    marginRight: 6,
  },
  moodLabel: {
    fontFamily: 'Inter_600SemiBold', // Slightly bolder label
    fontSize: 11,
    textTransform: 'lowercase',
    flexShrink: 1,
  },
});
