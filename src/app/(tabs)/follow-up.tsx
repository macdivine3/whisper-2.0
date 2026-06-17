import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Colors, Radius, Shadows, Spacing } from '../../constants/theme';

// Import Refactored Components
import FollowUpHero from '../../components/followup/FollowUpHero';
import FollowUpSubTabs from '../../components/followup/FollowUpSubTabs';
import CheckInCard from '../../components/followup/CheckInCard';
import LastSharedCard from '../../components/followup/LastSharedCard';
import GentleReminderCard from '../../components/followup/GentleReminderCard';
import FollowUpActionsGrid from '../../components/followup/FollowUpActionsGrid';
import CareLogTab from '../../components/followup/CareLogTab';
import PrayerCard from '../../components/PrayerCard';

// Libs
import { getLatestMood } from '../../lib/mood';
import { getLatestSessionSummary } from '../../lib/chat';
import { getPersonalizedPrayer } from '../../lib/whisperVoice';
import { Prayer } from '../../lib/prayers';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function FollowUpScreen() {
  const router = useRouter();
  const [activeSubTab, setActiveSubTab] = useState<'checkin' | 'carelog' | 'reminders'>('checkin');
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [latestMood, setLatestMood] = useState<string | null>(null);

  useEffect(() => {
    getLatestMood().then((m) => setLatestMood(m?.mood || null));
  }, []);

  // Prayer Modal State
  const [prayerModalVisible, setPrayerModalVisible] = useState(false);
  const [loadingPrayer, setLoadingPrayer] = useState(false);
  const [activePrayer, setActivePrayer] = useState<Prayer | null>(null);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const handleFeelingSelect = (feeling: string) => {
    setSelectedFeeling(feeling);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Navigate to chat with the 'followUpMood' param so Whisper can pick up the convo
    router.push({ pathname: '/whispers', params: { followUpMood: feeling } });
  };

  const openPrayerModal = async () => {
    setLoadingPrayer(true);
    setPrayerModalVisible(true);
    
    // Animate up
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();

    try {
      // Fetch context
      const [moodData, summaryData] = await Promise.all([
        getLatestMood(),
        getLatestSessionSummary()
      ]);

      const prayer = await getPersonalizedPrayer(
        "Mac Divine", // Hardcoded for now, like in Hero
        moodData?.mood || null,
        summaryData?.summary || null
      );

      setActivePrayer(prayer as Prayer);
    } catch (e) {
      console.warn('Failed to load prayer', e);
    } finally {
      setLoadingPrayer(false);
    }
  };

  const closePrayerModal = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.in(Easing.ease),
    }).start(() => {
      setPrayerModalVisible(false);
      setActivePrayer(null);
    });
  };

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
        <FollowUpHero onPrayPress={openPrayerModal} latestMood={latestMood} />

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
              onSelectFeeling={handleFeelingSelect}
            />

            {/* You Last Shared */}
            <LastSharedCard />

            {/* Gentle Reminder Card */}
            <GentleReminderCard />

            {/* Quick Actions Grid & Explore Banner */}
            <FollowUpActionsGrid onPrayPress={openPrayerModal} />
          </>
        )}

        {activeSubTab === 'carelog' && (
          <CareLogTab />
        )}

        {activeSubTab === 'reminders' && (
          <View style={styles.emptyLogContainer}>
            <Text style={styles.emptyLogText}>Set quiet alerts to remind you to take a breath.</Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Personalized Prayer Modal */}
      <Modal visible={prayerModalVisible} transparent animationType="none" onRequestClose={closePrayerModal}>
        <Pressable style={styles.modalOverlay} onPress={closePrayerModal}>
          <Animated.View
            style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.modalHandle} />
            
            {loadingPrayer ? (
              <View style={styles.modalLoading}>
                <ActivityIndicator color={Colors.green.primary} size="large" />
                <Text style={styles.loadingText}>preparing a prayer for you...</Text>
              </View>
            ) : activePrayer ? (
              <View style={styles.prayerScrollWrapper}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <PrayerCard prayer={activePrayer} />
                  <View style={{ height: 20 }} />
                </ScrollView>
              </View>
            ) : null}

            {!loadingPrayer && (
              <TouchableOpacity style={styles.closeBtn} onPress={closePrayerModal}>
                <Text style={styles.closeBtnText}>amen ❤️</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </Pressable>
      </Modal>
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.bg.primary,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingBottom: Spacing.xl,
    maxHeight: SCREEN_HEIGHT * 0.85,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border.default,
    borderRadius: Radius.pill,
    alignSelf: 'center',
    marginVertical: Spacing.md,
  },
  modalLoading: {
    padding: Spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.text.muted,
    fontStyle: 'italic',
  },
  prayerScrollWrapper: {
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  closeBtn: {
    backgroundColor: Colors.green.primary,
    marginHorizontal: Spacing.lg,
    paddingVertical: 16,
    borderRadius: Radius.pill,
    alignItems: 'center',
    marginTop: Spacing.md,
    ...Shadows.md,
  },
  closeBtnText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
    color: Colors.white,
  },
});
