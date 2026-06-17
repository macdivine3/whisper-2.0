import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Share } from 'react-native';
import { Colors, Radius, Spacing, Shadows } from '../../constants/theme';
import { CareLogInsights, getWeeklyInsights } from '../../lib/careLog';

export default function CareLogTab() {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<CareLogInsights | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getWeeklyInsights();
      setInsights(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleInvite = async () => {
    try {
      await Share.share({
        message: 'I found a safe sanctuary for my thoughts and prayers. Join me on Whisper. Link: 123456',
      });
    } catch (e) {
      console.warn('Share failed', e);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={Colors.green.primary} />
      </View>
    );
  }

  if (!insights) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No data available for this week yet.</Text>
      </View>
    );
  }

  const { topMood, activityPattern, mostUsedFeature, seedsCount } = insights;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>YOUR WEEKLY PULSE</Text>

      {/* Mood Card */}
      <View style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: '#F0F4EF' }]}>
          <Ionicons name="leaf" size={20} color={Colors.green.primary} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardLabel}>The Emotional Mirror</Text>
          <Text style={styles.cardValue}>
            {topMood 
              ? `You've felt ${topMood.mood} ${topMood.count} times this week.`
              : "You're still exploring your feelings this week."}
          </Text>
        </View>
      </View>

      {/* Activity Pattern Card */}
      <View style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: '#FFF9F0' }]}>
          <Ionicons name={activityPattern === 'night' ? 'moon' : 'sunny'} size={20} color="#C9851A" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardLabel}>Rhythms of Rest</Text>
          <Text style={styles.cardValue}>
            {activityPattern === 'night' 
              ? "You find Whisper mostly at night." 
              : (activityPattern === 'morning' ? "You find Whisper mostly in the morning." : "You use Whisper throughout the day.")}
          </Text>
        </View>
      </View>

      {/* Feature Usage Card */}
      <View style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: '#F5F0FF' }]}>
          <Ionicons 
            name={mostUsedFeature === 'journal' ? 'book' : (mostUsedFeature === 'chat' ? 'chatbubbles' : 'heart')} 
            size={20} 
            color="#6B4BBF" 
          />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardLabel}>The Heart's Habit</Text>
          <Text style={styles.cardValue}>
            Your heart's been in the {mostUsedFeature} most this week.
          </Text>
        </View>
      </View>

      {/* Seeds Sown Card */}
      <TouchableOpacity style={[styles.card, styles.shareCard]} activeOpacity={0.9} onPress={handleInvite}>
        <View style={[styles.iconBox, { backgroundColor: '#E8F5E9' }]}>
          <Ionicons name="seedling" size={20} color="#2E7D32" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardLabel}>The Sower's Score</Text>
          <Text style={styles.cardValue}>
            You've sown {seedsCount} seeds of peace.
          </Text>
          <View style={styles.inviteBtn}>
            <Text style={styles.inviteText}>Invite a friend to find peace</Text>
            <Ionicons name="arrow-forward" size={14} color={Colors.green.primary} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1.5,
    color: Colors.text.muted,
    marginBottom: Spacing.md,
  },
  center: {
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.text.muted,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border.soft,
    ...Shadows.sm,
  },
  shareCard: {
    borderColor: Colors.green.muted,
    backgroundColor: '#FBFCFA',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
    color: Colors.text.muted,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardValue: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 15,
    color: Colors.text.primary,
    lineHeight: 20,
  },
  inviteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  inviteText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.green.primary,
  },
});
