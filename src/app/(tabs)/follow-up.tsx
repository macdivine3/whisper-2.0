import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius, Shadows, Spacing } from '../../constants/theme';

const { width } = Dimensions.get('window');

// Assets
const MAILBOX_IMAGE = require('../../../svjs/gemini-2.5-flash-image_Remove_the_background_completely_and_make_the_edges_of_the_illustration_fade_out-0-removebg-preview.png');
const HEART_IMAGE = require('../../../svjs/fainted heart-Photoroom.png');
const CANDLE_IMAGE = require('../../../svjs/candle-Photoroom.png');

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
        <View style={styles.heroSection}>
          <View style={styles.heroLeft}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>follow-up</Text>
              <Ionicons name="leaf" size={16} color={Colors.green.primary} style={styles.logoIcon} />
            </View>
            <Text style={styles.tagline}>Whisper's check-in, just for you.</Text>

            {/* Memory Box with Pray Overlap */}
            <View style={styles.memoryBoxContainer}>
              <View style={styles.memoryBox}>
                <View style={styles.memoryIconCircle}>
                  <Ionicons name="leaf-outline" size={12} color={Colors.green.secondary} />
                </View>
                <View style={styles.memoryTextContainer}>
                  <Text style={styles.memoryTagText}>Whisper remembers</Text>
                  <View style={styles.memoryMessageRow}>
                    <Text style={styles.memoryMessage}>You've been feeling </Text>
                    <View style={styles.moodHighlightBg}>
                      <Text style={styles.moodHighlightText}>overwhelmed.</Text>
                    </View>
                  </View>
                  <Text style={styles.memorySub}>I'm here to walk with you.</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.prayAboutItCard} activeOpacity={0.8}>
                <Ionicons name="hand-right-outline" size={14} color={Colors.white} style={{ marginRight: 6 }} />
                <Text style={styles.prayAboutItText}>pray about it??</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Gradient oval backdrop + Mailbox Image */}
          <View style={styles.mailboxWrapper}>
            <LinearGradient
              colors={['#F5ECD7', '#F0E4C8', 'transparent']}
              style={styles.mailboxGradientBg}
              start={{ x: 0.5, y: 0.5 }}
              end={{ x: 1, y: 1 }}
            />
            <Image source={MAILBOX_IMAGE} style={styles.mailboxImage} resizeMode="contain" />
          </View>
        </View>

        {/* Sub Navigation Pills */}
        <View style={styles.subTabContainer}>
          <TouchableOpacity
            style={[styles.subTab, activeSubTab === 'checkin' && styles.activeSubTab]}
            onPress={() => setActiveSubTab('checkin')}
            activeOpacity={0.7}
          >
            <Ionicons name="heart-outline" size={16} color={activeSubTab === 'checkin' ? Colors.green.primary : Colors.text.muted} style={{ marginRight: 6 }} />
            <Text style={[styles.subTabText, activeSubTab === 'checkin' && styles.activeSubTabText]}>Check-in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.subTab, activeSubTab === 'carelog' && styles.activeSubTab]}
            onPress={() => setActiveSubTab('carelog')}
            activeOpacity={0.7}
          >
            <Ionicons name="document-text-outline" size={16} color={activeSubTab === 'carelog' ? Colors.green.primary : Colors.text.muted} style={{ marginRight: 6 }} />
            <Text style={[styles.subTabText, activeSubTab === 'carelog' && styles.activeSubTabText]}>Care Log</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.subTab, activeSubTab === 'reminders' && styles.activeSubTab]}
            onPress={() => setActiveSubTab('reminders')}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={16} color={activeSubTab === 'reminders' ? Colors.green.primary : Colors.text.muted} style={{ marginRight: 6 }} />
            <Text style={[styles.subTabText, activeSubTab === 'reminders' && styles.activeSubTabText]}>Reminders</Text>
          </TouchableOpacity>
        </View>

        {activeSubTab === 'checkin' && (
          <>
            {/* Check-in prompt */}
            <View style={styles.checkInCard}>
              <View style={styles.checkInTextContent}>
                <Text style={styles.checkInTag}>TODAY'S CHECK-IN</Text>
                <Text style={styles.checkInTitle}>How are you feeling{'\n'}since we last talked?</Text>
                <Text style={styles.checkInSub}>Your heart matters. I'm listening.</Text>
              </View>

              <Image source={HEART_IMAGE} style={styles.heartImage} resizeMode="contain" />

              {/* Grid of options: 3 on top, 2 on bottom */}
              <View style={styles.feelingPillsContainer}>
                {/* Top Row: 3 pills */}
                <View style={styles.feelingRow}>
                  <TouchableOpacity
                    style={[
                      styles.feelingPill,
                      { backgroundColor: '#EAEBE3' }, // green tint
                      selectedFeeling === 'better' && { borderWidth: 1.5, borderColor: Colors.green.primary }
                    ]}
                    onPress={() => setSelectedFeeling('better')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="happy-outline" size={14} color={Colors.green.primary} style={{ marginRight: 4 }} />
                    <Text style={[styles.feelingText, { color: Colors.green.primary }]} numberOfLines={1}>a little better</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.feelingPill,
                      { backgroundColor: '#FDF0E1' }, // orange tint
                      selectedFeeling === 'same' && { borderWidth: 1.5, borderColor: '#C9851A' }
                    ]}
                    onPress={() => setSelectedFeeling('same')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="reorder-two-outline" size={14} color="#C9851A" style={{ marginRight: 4 }} />
                    <Text style={[styles.feelingText, { color: '#C9851A' }]} numberOfLines={1}>the same</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.feelingPill,
                      { backgroundColor: '#FBE8E8' }, // red/pink tint
                      selectedFeeling === 'notgood' && { borderWidth: 1.5, borderColor: '#D15D5D' }
                    ]}
                    onPress={() => setSelectedFeeling('notgood')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="sad-outline" size={14} color="#D15D5D" style={{ marginRight: 4 }} />
                    <Text style={[styles.feelingText, { color: '#D15D5D' }]} numberOfLines={1}>not so good</Text>
                  </TouchableOpacity>
                </View>

                {/* Bottom Row: 2 pills */}
                <View style={styles.feelingRow}>
                  <TouchableOpacity
                    style={[
                      styles.feelingPill,
                      { backgroundColor: '#EBE6F3' }, // purple tint
                      selectedFeeling === 'overwhelmed' && { borderWidth: 1.5, borderColor: '#816CA8' }
                    ]}
                    onPress={() => setSelectedFeeling('overwhelmed')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="rainy-outline" size={14} color="#816CA8" style={{ marginRight: 4 }} />
                    <Text style={[styles.feelingText, { color: '#816CA8' }]} numberOfLines={1}>still overwhelmed</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.feelingPill,
                      { backgroundColor: '#FAF8F5', borderWidth: 1, borderColor: '#E8E2D8' }, // neutral outline
                      selectedFeeling === 'something' && { borderColor: Colors.green.primary }
                    ]}
                    onPress={() => setSelectedFeeling('something')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="leaf-outline" size={14} color={Colors.green.primary} style={{ marginRight: 4 }} />
                    <Text style={[styles.feelingText, { color: Colors.text.primary }]} numberOfLines={1}>something else</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* You Last Shared */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>YOU LAST SHARED</Text>
              <Text style={styles.sharedDate}>May 16, 2025</Text>
            </View>

            <View style={styles.sharedQuoteBox}>
              <View style={styles.sharedQuoteContent}>
                <Text style={styles.quoteMark}>“</Text>
                <Text style={styles.sharedQuoteText}>
                  "Everything just feels like too much.{'\n'}I feel like I'm failing in so many areas of my life."
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

            {/* Gentle Reminder Card */}
            <View style={styles.reminderCard}>
              <View style={styles.reminderTextContent}>
                <View style={styles.reminderTagRow}>
                  <Text style={styles.reminderTag}>a gentle reminder</Text>
                  <Ionicons name="leaf" size={10} color={Colors.green.secondary} style={{ marginLeft: 6 }} />
                </View>
                <Text style={styles.reminderText}>
                  You don't have to carry it all today.{'\n'}One breath. One step. I'm here.
                </Text>
              </View>
              <Image source={CANDLE_IMAGE} style={styles.candleImage} resizeMode="contain" />
            </View>

            {/* Quick Actions Grid - Now 2x2 */}
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

  // Hero Section
  heroSection: {
    position: 'relative',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    minHeight: 180,
  },
  heroLeft: {
    width: '65%',
    zIndex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logo: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 34,
    color: Colors.green.primary,
    letterSpacing: -0.5,
  },
  logoIcon: {
    marginLeft: 4,
  },
  tagline: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.text.muted,
    marginTop: 4,
    marginBottom: Spacing.xl,
  },
  memoryBoxContainer: {
    position: 'relative',
    marginBottom: Spacing.xl + 10, // extra margin for overlap
  },
  memoryBox: {
    backgroundColor: Colors.bg.primary,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E8E2D8',
    ...Shadows.sm,
  },
  prayAboutItCard: {
    position: 'absolute',
    // MOVE OVERLAP POSITION
    bottom: -20, // Overlap bottom (more negative = lower)
    right: -10,  // Overlap right (negative = sticking out past the edge)
    backgroundColor: Colors.green.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.md,
    elevation: 4,
    zIndex: 10,
  },
  prayAboutItText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.white,
  },
  memoryIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EAEBE3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  memoryTextContainer: {
    flex: 1,
  },
  memoryTagText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  memoryMessageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 4,
  },
  memoryMessage: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.text.primary,
  },
  moodHighlightBg: {
    backgroundColor: '#EBE6F3',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  moodHighlightText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: '#816CA8',
  },
  memorySub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: Colors.text.muted,
  },
  mailboxWrapper: {
    position: 'absolute',
    right: -20,
    top: -30,
    width: 220,
    height: 220,
    zIndex: 0,
  },
  mailboxGradientBg: {
    position: 'absolute',
    // Oval shape sitting behind the image
    top: '10%',
    left: '5%',
    right: '5%',
    bottom: '5%',
    borderRadius: 999,
  },
  mailboxImage: {
    width: '100%',
    height: '100%',
    // RESIZE WITHOUT MOVING: Change scale (e.g. 1.2 is bigger)
    transform: [{ scale: 1.0 }],
  },

  // Sub Tabs
  subTabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  subTab: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: Radius.pill,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeSubTab: {
    backgroundColor: Colors.bg.card,
    borderColor: '#E8E2D8',
    ...Shadows.sm,
  },
  subTabText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.text.muted,
  },
  activeSubTabText: {
    color: Colors.text.primary,
    fontFamily: 'Inter_600SemiBold',
  },

  // Check-In Card
  checkInCard: {
    backgroundColor: '#FAF5EA', // Very light warm background
    borderRadius: Radius.lg,
    padding: Spacing.md, // Reduced padding
    marginHorizontal: Spacing.lg,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  checkInTextContent: {
    zIndex: 1,
    marginBottom: Spacing.md,
    width: '65%', // Placed firmly on the left
  },
  checkInTag: {
    fontFamily: 'Inter_700Bold',
    color: Colors.green.primary,
    fontSize: 10,
    letterSpacing: 1.0,
    marginBottom: 8,
  },
  checkInTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 18, // Reduced
    color: Colors.text.primary,
    lineHeight: 24,
    marginBottom: 6,
  },
  checkInSub: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11, // Reduced
    color: Colors.text.secondary,
  },
  heartImage: {
    position: 'absolute',

    // MOVE IMAGE: Change right/top
    right: -0.1,
    top: 19,

    // BASE SIZE
    width: 150,
    height: 120,
    zIndex: 0,

    // CUSTOMIZE OPACITY (0.0 to 1.0)
    opacity: 0.65,

    // INCREASE SIZE WITHOUT MOVING: Change scale (e.g., 1.2 is 20% bigger)
    transform: [{ scale: 2.5 }],
  },
  feelingPillsContainer: {
    gap: 8,
    zIndex: 1,
  },
  feelingRow: {
    flexDirection: 'row',
    gap: 8,
  },
  feelingPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 8, // Reduced corners (sharper edges)
  },
  feelingText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10, // Reduced font to fit 3 in a row comfortably
  },

  // Shared Quote Box
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg, // Reduced top margin
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
    borderRadius: Radius.md, // More rectangular shape
    marginHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  sharedQuoteContent: {
    flexDirection: 'row',
    padding: Spacing.md, // Reduced padding
  },
  quoteMark: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 20, // Reduced
    color: Colors.text.muted,
    marginRight: 8,
    lineHeight: 20,
  },
  sharedQuoteText: {
    flex: 1,
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 13, // Reduced
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
    fontSize: 11, // Reduced
    color: Colors.text.muted,
  },

  // Gentle Reminder
  reminderCard: {
    flexDirection: 'row',
    backgroundColor: '#EAEBE3',
    borderRadius: Radius.md, // reduced corners
    padding: Spacing.md, // Reduced padding
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E3D8',
  },
  reminderTextContent: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  reminderTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  reminderTag: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1.0,
    color: Colors.green.primary,
  },
  reminderText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12, // Reduced font
    color: Colors.text.primary,
    lineHeight: 18,
  },
  candleImage: {
    // BASE SIZE
    width: 50,
    height: 50,

    // CUSTOMIZE OPACITY (0.0 to 1.0)
    opacity: 0.7,

    // RESIZE & MOVE WITHOUT BREAKING LAYOUT:
    transform: [
      { scale: 3.5 },       // Increase/decrease size (e.g., 1.3)
      { translateX: 0 },    // Move left/right (e.g., -10 or 10)
      { translateY: 0 }     // Move up/down (e.g., -5 or 5)
    ],
  },

  // Actions Grid (2x2)
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-between',
    gap: 12,
  },
  gridCard: {
    width: (width - Spacing.lg * 2 - 12) / 2, // 2 items per row
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.lg, // increased padding to make them taller
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

  // Explore Banner
  exploreBanner: {
    backgroundColor: '#F9F1E6',
    borderRadius: Radius.md, // Reduced corners
    padding: Spacing.md, // Reduced padding
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
    marginBottom: 12, // Space before the button
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
