import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Shadows, Spacing } from '../../constants/theme';

// Import Refactored Components
import FollowUpHero from '../../components/followup/FollowUpHero';
import FollowUpSubTabs from '../../components/followup/FollowUpSubTabs';
import CheckInCard from '../../components/followup/CheckInCard';
import LastSharedCard from '../../components/followup/LastSharedCard';
import GentleReminderCard from '../../components/followup/GentleReminderCard';
import FollowUpActionsGrid from '../../components/followup/FollowUpActionsGrid';

export default function FollowUpScreen() {
  const router = useRouter();
  const [activeSubTab, setActiveSubTab] = useState<'checkin' | 'carelog' | 'reminders'>('checkin');
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Nav */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconCircleBtn} activeOpacity={0.6}>
            <Ionicons name="chevron-back" size={20} color={Colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircleBtn} activeOpacity={0.6}>
            <Ionicons name="ellipsis-horizontal" size={20} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Header Hero Section */}
        <FollowUpHero />

        {/* Sub Navigation Pills */}
        <FollowUpSubTabs
          activeSubTab={activeSubTab}
          onTabChange={(tab) => setActiveSubTab(tab)}
        />

        {activeSubTab === 'checkin' && (
          <>
            {/* Check-in prompt */}
            <CheckInCard
              selectedFeeling={selectedFeeling}
              onSelectFeeling={(feeling) => setSelectedFeeling(feeling)}
            />

            {/* You Last Shared */}
            <LastSharedCard />

            {/* Gentle Reminder Card */}
            <GentleReminderCard />

            {/* Quick Actions Grid & Explore Banner */}
            <FollowUpActionsGrid />
          </>
        )}

        {activeSubTab === 'carelog' && (
          <View style={styles.emptyLogContainer}>
            <Text style={styles.emptyLogText}>Your Care Log tracks your emotional history.</Text>
          </View>
        )}

        {activeSubTab === 'reminders' && (
          <View style={styles.emptyLogContainer}>
            <Text style={styles.emptyLogText}>Set quiet alerts to remind you to take a breath.</Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  iconCircleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.bg.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E2D8',
    ...Shadows.sm,
  },
  emptyLogContainer: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  emptyLogText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.text.muted,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 100,
  },
});
