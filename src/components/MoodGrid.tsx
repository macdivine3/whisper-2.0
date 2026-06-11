import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '../constants/theme';

interface MoodItem {
  id: string;
  label: string;
  iconType: 'feather' | 'ionicons';
  icon: string;
  color: string;
  bgColor: string;
}

// Icons matching the reference UI image exactly
const MOODS: MoodItem[] = [
  { id: 'grateful',    label: 'grateful',    iconType: 'ionicons', icon: 'leaf',       color: Colors.mood.grateful,    bgColor: Colors.moodBg.grateful },
  { id: 'hopeful',     label: 'hopeful',     iconType: 'feather',  icon: 'sun',        color: Colors.mood.hopeful,     bgColor: Colors.moodBg.hopeful },
  { id: 'peaceful',   label: 'peaceful',    iconType: 'ionicons', icon: 'leaf-outline', color: Colors.mood.peaceful,  bgColor: Colors.moodBg.peaceful },
  { id: 'anxious',    label: 'anxious',     iconType: 'feather',  icon: 'cloud',      color: Colors.mood.anxious,     bgColor: Colors.moodBg.anxious },
  { id: 'drained',    label: 'drained',     iconType: 'feather',  icon: 'droplet',    color: Colors.mood.drained,     bgColor: Colors.moodBg.drained },
  { id: 'overwhelmed', label: 'overwhelmed', iconType: 'feather', icon: 'cloud-rain', color: Colors.mood.overwhelmed, bgColor: Colors.moodBg.overwhelmed },
];

interface MoodGridProps {
  onSelectMood?: (moodId: string) => void;
  selectedMood?: string | null;
}

export default function MoodGrid({ onSelectMood, selectedMood }: MoodGridProps) {
  return (
    <View style={styles.container}>
      {/* Section label */}
      <Text style={styles.moodHeaderUpper}>HOW ARE YOU FEELING?</Text>

      {/* Sub-header row */}
      <View style={styles.moodSubRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text style={styles.moodHeaderLower}>how are you feeling?</Text>
          <Feather name="info" size={13} color={Colors.text.muted} />
        </View>
        <TouchableOpacity activeOpacity={0.6}>
          <Text style={styles.editMoodText}>edit mood</Text>
        </TouchableOpacity>
      </View>

      {/* Grid */}
      <View style={styles.moodGrid}>
        {MOODS.map((mood) => {
          const isSelected = selectedMood === mood.id;
          return (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodChip,
                { backgroundColor: mood.bgColor },
                isSelected && { borderColor: mood.color, borderWidth: 1.5 },
              ]}
              onPress={() => onSelectMood?.(mood.id)}
              activeOpacity={0.75}
            >
              {mood.iconType === 'ionicons' ? (
                <Ionicons name={mood.icon as any} size={15} color={mood.color} />
              ) : (
                <Feather name={mood.icon as any} size={15} color={mood.color} />
              )}
              <Text style={[styles.moodChipLabel, { color: mood.color }]}>{mood.label}</Text>
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
    marginBottom: 20,
  },
  moodHeaderUpper: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 10,
    fontWeight: '800',
    color: Colors.text.primary,
    letterSpacing: 1.2,
    marginBottom: 3,
  },
  moodSubRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  moodHeaderLower: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  editMoodText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  moodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 99,
    paddingVertical: 8,
    paddingHorizontal: 14,
    width: '30%',
    flexGrow: 1,
  },
  moodChipLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    fontWeight: '500',
  },
});
