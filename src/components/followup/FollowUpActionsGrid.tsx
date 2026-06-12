import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Radius, Spacing } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default function FollowUpActionsGrid() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>I'M HERE FOR YOU</Text>
      </View>

      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.gridCard} onPress={() => router.push('/whispers')} activeOpacity={0.7}>
          <Ionicons name="chatbubble-outline" size={24} color={Colors.green.primary} style={styles.gridIcon} />
          <Text style={styles.gridCardTitle}>talk to whisper</Text>
          <Text style={styles.gridCardSub}>start a chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridCard} onPress={() => router.push('/journal')} activeOpacity={0.7}>
          <Ionicons name="pencil-outline" size={24} color={Colors.green.primary} style={styles.gridIcon} />
          <Text style={styles.gridCardTitle}>write it out</Text>
          <Text style={styles.gridCardSub}>open journal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridCard} onPress={() => { }} activeOpacity={0.7}>
          <Ionicons name="hand-right-outline" size={24} color={Colors.green.primary} style={styles.gridIcon} />
          <Text style={styles.gridCardTitle}>say a prayer</Text>
          <Text style={styles.gridCardSub}>pray together</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridCard} onPress={() => router.push('/whispers')} activeOpacity={0.7}>
          <Ionicons name="heart-outline" size={24} color="#D15D5D" style={styles.gridIcon} />
          <Text style={styles.gridCardTitle}>share praise</Text>
          <Text style={styles.gridCardSub}>celebrate wins</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Explore Banner */}
      <View style={styles.exploreBanner}>
        <View style={styles.exploreHeaderRow}>
          <Ionicons name="sparkles" size={16} color="#C9851A" style={{ marginRight: 6 }} />
          <Text style={styles.exploreTitle} numberOfLines={1}>Need something to uplift your heart?</Text>
        </View>
        <Text style={styles.exploreSub} numberOfLines={1}>Read a whisper, listen to a story, or reflect.</Text>

        <TouchableOpacity style={styles.exploreBtn} onPress={() => router.push('/')} activeOpacity={0.8}>
          <Text style={styles.exploreBtnText}>explore content</Text>
          <Ionicons name="chevron-forward" size={12} color={Colors.white} />
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
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-between',
    gap: 12,
  },
  gridCard: {
    width: (width - Spacing.lg * 2 - 12) / 2,
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.lg,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridIcon: {
    marginBottom: 10,
  },
  gridCardTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.text.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  gridCardSub: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: Colors.text.muted,
    textAlign: 'center',
  },
  exploreBanner: {
    backgroundColor: '#F9F1E6',
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    alignItems: 'flex-start',
  },
  exploreHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  exploreTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.text.primary,
  },
  exploreSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  exploreBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.white,
    marginRight: 4,
  },
});
