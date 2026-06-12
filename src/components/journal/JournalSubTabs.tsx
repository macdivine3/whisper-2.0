import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Radius, Spacing } from '../../constants/theme';

type TabType = 'entries' | 'favorites' | 'prompts';

interface Props {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function JournalSubTabs({ activeTab, onTabChange }: Props) {
  return (
    <View style={styles.segmentContainer}>
      <View style={styles.segmentRow}>
        <TouchableOpacity
          style={[styles.segmentItem, activeTab === 'entries' && styles.segmentActive]}
          onPress={() => onTabChange('entries')}
        >
          <Text style={[styles.segmentText, activeTab === 'entries' && styles.segmentTextActive]}>
            My Entries
          </Text>
        </TouchableOpacity>

        <View style={styles.segmentDivider} />

        <TouchableOpacity
          style={[styles.segmentItem, activeTab === 'favorites' && styles.segmentActive]}
          onPress={() => onTabChange('favorites')}
        >
          <Ionicons
            name="heart-outline"
            size={14}
            color={activeTab === 'favorites' ? Colors.green.primary : Colors.text.muted}
            style={{ marginRight: 6 }}
          />
          <Text style={[styles.segmentText, activeTab === 'favorites' && styles.segmentTextActive]}>
            Favorites
          </Text>
        </TouchableOpacity>

        <View style={styles.segmentDivider} />

        <TouchableOpacity
          style={[styles.segmentItem, activeTab === 'prompts' && styles.segmentActive]}
          onPress={() => onTabChange('prompts')}
        >
          <Ionicons
            name="leaf-outline"
            size={14}
            color={activeTab === 'prompts' ? Colors.green.primary : Colors.text.muted}
            style={{ marginRight: 6 }}
          />
          <Text style={[styles.segmentText, activeTab === 'prompts' && styles.segmentTextActive]}>
            Prompts
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  segmentContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  segmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F6F1',
    borderRadius: Radius.pill,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  segmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Radius.pill,
  },
  segmentActive: {
    backgroundColor: '#EAEBE3',
  },
  segmentText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.text.muted,
  },
  segmentTextActive: {
    color: Colors.green.primary,
    fontFamily: 'Inter_600SemiBold',
  },
  segmentDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#E8E2D8',
    marginHorizontal: 2,
  },
});
