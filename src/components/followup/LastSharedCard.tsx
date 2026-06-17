import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Radius, Spacing } from '../../constants/theme';
import { getLatestSessionSummary } from '../../lib/chat';

export default function LastSharedCard() {
  const router = useRouter();
  const [data, setData] = useState<{ summary: string; date: number } | null>(null);

  useEffect(() => {
    getLatestSessionSummary().then(setData);
  }, []);

  if (!data) return null;

  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>YOU LAST SHARED</Text>
        <Text style={styles.sharedDate}>{formattedDate}</Text>
      </View>

      <View style={styles.sharedQuoteBox}>
        <View style={styles.sharedQuoteContent}>
          <Text style={styles.quoteMark}>“</Text>
          <Text style={styles.sharedQuoteText}>
            {data.summary}
          </Text>
        </View>

        <View style={styles.sharedDivider} />

        <TouchableOpacity style={styles.sharedAction} onPress={() => router.push('/whispers')} activeOpacity={0.6}>
          <Ionicons name="chatbubble-outline" size={14} color={Colors.text.muted} style={{ marginRight: 6 }} />
          <Text style={styles.sharedActionText}>view full conversation</Text>
          <View style={{ flex: 1 }} />
          <Ionicons name="chevron-forward" size={14} color={Colors.text.muted} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
    letterSpacing: 1.2,
    color: Colors.green.primary,
  },
  sharedDate: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: Colors.text.muted,
  },
  sharedQuoteBox: {
    backgroundColor: '#F8F6F1',
    borderRadius: Radius.md,
    marginHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  sharedQuoteContent: {
    flexDirection: 'row',
    padding: Spacing.md,
  },
  quoteMark: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 20,
    color: Colors.text.muted,
    marginRight: 8,
    lineHeight: 20,
  },
  sharedQuoteText: {
    flex: 1,
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 13,
    color: Colors.text.primary,
    lineHeight: 20,
  },
  sharedDivider: {
    height: 1,
    backgroundColor: '#E8E2D8',
  },
  sharedAction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: Spacing.md,
  },
  sharedActionText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: Colors.text.muted,
  },
});
