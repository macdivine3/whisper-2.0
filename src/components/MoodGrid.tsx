import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '../constants/theme';

interface MoodItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bgColor: string;
}

// Exactly 6 moods — 3 columns x 2 rows — icons match the mockup
const MOODS: MoodItem[] = [
  { id: 'grateful',    label: 'grateful',    icon: 'leaf',          color: '#4D7C5A', bgColor: '#E8F0E9' },
  { id: 'hopeful',     label: 'hopeful',     icon: 'sunny',         color: '#C47F2A', bgColor: '#FDF0DC' },
  { id: 'peaceful',    label: 'peaceful',    icon: 'leaf-outline',  color: '#4A8FA8', bgColor: '#E0F0F5' },
  { id: 'anxious',     label: 'anxious',     icon: 'cloud',         color: '#B05A5A', bgColor: '#FAE8E8' },
  { id: 'drained',     label: 'drained',     icon: 'water',         color: '#7A7A9A', bgColor: '#EEEEF5' },
  { id: 'overwhelmed', label: 'overwhelmed', icon: 'rainy',         color: '#5A7A9A', bgColor: '#E8EEF5' },
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
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1.0,
    textTransform: 'uppercase',
    color: Colors.green.primary,
    marginBottom: Spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 16,
    color: Colors.text.primary,
  },
  infoIcon: {
    marginLeft: 6,
    marginTop: 1,
  },
  editLink: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.text.muted,
  },
  // 3-column grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  moodPill: {
    width: '31%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  icon: {
    marginRight: 5,
  },
  moodLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    textTransform: 'lowercase',
    flexShrink: 1,
  },
});
