import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Circle, Rect, Path, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Colors, Spacing, Radius, Shadows, CommonStyles } from '../../constants/theme';

export default function FollowUpScreen() {
  const router = useRouter();
  const [activeSubTab, setActiveSubTab] = useState<'checkin' | 'carelog' | 'reminders'>('checkin');
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.6}>
          <Ionicons name="chevron-back" size={24} color={Colors.text.secondary} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.logo}>follow-up</Text>
          <Text style={styles.tagline}>Whisper's check-in, just for you.</Text>
        </View>

        <TouchableOpacity style={styles.moreBtn} activeOpacity={0.6}>
          <Ionicons name="ellipsis-horizontal" size={18} color={Colors.text.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Memory Box with Custom SVG Mailbox */}
        <View style={styles.memoryBox}>
          <View style={styles.memoryTextContent}>
            <View style={styles.memoryTag}>
              <Ionicons name="leaf-outline" size={12} color={Colors.green.primary} style={{ marginRight: 4 }} />
              <Text style={styles.memoryTagText}>Whisper remembers</Text>
            </View>
            <Text style={styles.memoryMessage}>
              You've been feeling{' '}
              <Text style={[styles.moodHighlight, { backgroundColor: Colors.moodBg.overwhelmed, color: Colors.mood.overwhelmed }]}>
                overwhelmed
              </Text>
              .
            </Text>
            <Text style={styles.memorySub}>I'm here to walk with you.</Text>
          </View>

          {/* Premium Mailbox SVG Illustration */}
          <View style={styles.mailboxIllustration}>
            <Svg width={90} height={100} viewBox="0 0 90 100">
              <Defs>
                <LinearGradient id="postGrad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#D4C4A8" />
                  <Stop offset="1" stopColor="#A89A80" />
                </LinearGradient>
                <LinearGradient id="boxGrad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#F5ECE1" />
                  <Stop offset="1" stopColor="#DFD5C6" />
                </LinearGradient>
              </Defs>
              
              {/* Wooden Post */}
              <Rect x="42" y="55" width="6" height="35" rx="1" fill="url(#postGrad)" />
              
              {/* Mailbox Body */}
              <Path d="M 20 55 L 20 35 Q 20 20 45 20 Q 70 20 70 35 L 70 55 Z" fill="url(#boxGrad)" stroke="#CFC5B5" strokeWidth="1" />
              
              {/* Mailbox Door (slightly offset for depth) */}
              <Path d="M 20 55 Q 45 57 70 55" fill="none" stroke="#CFC5B5" strokeWidth="1" />
              
              {/* Mail Flag (active green) */}
              <Path d="M 68 35 L 78 35 L 78 20" fill="none" stroke={Colors.green.primary} strokeWidth="2" strokeLinecap="round" />
              <Rect x="75" y="16" width="6" height="5" fill={Colors.green.primary} rx="0.5" />
              
              {/* Letter peeking out */}
              <Rect x="30" y="32" width="22" height="15" rx="1" fill="#FFFFFF" transform="rotate(-10 30 32)" stroke="#E0D7C9" strokeWidth="1" />
              <Path d="M 31 35 L 42 41 L 52 32" fill="none" stroke="#E0D7C9" strokeWidth="1" />
              
              {/* Flowers at base */}
              <Circle cx="39" cy="85" r="2.5" fill="#ECA1A6" />
              <Circle cx="41" cy="88" r="2" fill="#ECA1A6" />
              <Circle cx="48" cy="86" r="2.5" fill="#F5C469" />
              <Path d="M 37 90 Q 40 82 42 85" fill="none" stroke={Colors.green.muted} strokeWidth="1" />
              <Path d="M 48 90 Q 46 84 48 86" fill="none" stroke={Colors.green.muted} strokeWidth="1" />

              {/* Little bird on top */}
              <Circle cx="45" cy="15" r="4.5" fill="#8B9D77" />
              <Path d="M 45 15 Q 52 16 54 12" fill="none" stroke="#8B9D77" strokeWidth="2" strokeLinecap="round" />
              {/* beak */}
              <Path d="M 41 14 L 38 15 L 41 16 Z" fill="#D4891A" />
            </Svg>
          </View>
        </View>

        {/* Sub Navigation Pills */}
        <View style={styles.subTabContainer}>
          <TouchableOpacity
            style={[styles.subTab, activeSubTab === 'checkin' && styles.activeSubTab]}
            onPress={() => setActiveSubTab('checkin')}
            activeOpacity={0.7}
          >
            <Text style={[styles.subTabText, activeSubTab === 'checkin' && styles.activeSubTabText]}>Check-in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.subTab, activeSubTab === 'carelog' && styles.activeSubTab]}
            onPress={() => setActiveSubTab('carelog')}
            activeOpacity={0.7}
          >
            <Text style={[styles.subTabText, activeSubTab === 'carelog' && styles.activeSubTabText]}>Care Log</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.subTab, activeSubTab === 'reminders' && styles.activeSubTab]}
            onPress={() => setActiveSubTab('reminders')}
            activeOpacity={0.7}
          >
            <Text style={[styles.subTabText, activeSubTab === 'reminders' && styles.activeSubTabText]}>Reminders</Text>
          </TouchableOpacity>
        </View>

        {activeSubTab === 'checkin' && (
          <>
            {/* Check-in prompt */}
            <View style={styles.checkInCard}>
              <Text style={styles.checkInTag}>TODAY'S CHECK-IN</Text>
              <Text style={styles.checkInTitle}>How are you feeling since we last talked?</Text>
              <Text style={styles.checkInSub}>Your heart matters. I'm listening.</Text>

              {/* Grid of options */}
              <View style={styles.feelingPillsContainer}>
                <TouchableOpacity
                  style={[
                    styles.feelingPill,
                    { borderColor: Colors.green.muted, backgroundColor: Colors.bg.card },
                    selectedFeeling === 'better' && { borderWidth: 1.5, borderColor: Colors.green.primary }
                  ]}
                  onPress={() => setSelectedFeeling('better')}
                  activeOpacity={0.7}
                >
                  <Ionicons name="happy-outline" size={14} color={Colors.green.secondary} style={{ marginRight: 6 }} />
                  <Text style={[styles.feelingText, { color: Colors.green.primary }]}>a little better</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.feelingPill,
                    { borderColor: Colors.border.default, backgroundColor: Colors.bg.card },
                    selectedFeeling === 'same' && { borderWidth: 1.5, borderColor: Colors.text.secondary }
                  ]}
                  onPress={() => setSelectedFeeling('same')}
                  activeOpacity={0.7}
                >
                  <Ionicons name="chatbubble-outline" size={14} color={Colors.text.muted} style={{ marginRight: 6 }} />
                  <Text style={[styles.feelingText, { color: Colors.text.secondary }]}>the same</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.feelingPill,
                    { borderColor: Colors.mood.grateful, backgroundColor: Colors.moodBg.grateful },
                    selectedFeeling === 'notgood' && { borderWidth: 1.5, borderColor: Colors.mood.grateful }
                  ]}
                  onPress={() => setSelectedFeeling('notgood')}
                  activeOpacity={0.7}
                >
                  <Ionicons name="sad-outline" size={14} color={Colors.mood.grateful} style={{ marginRight: 6 }} />
                  <Text style={[styles.feelingText, { color: Colors.mood.grateful }]}>not so good</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.feelingPill,
                    { borderColor: Colors.mood.anxious, backgroundColor: Colors.moodBg.anxious },
                    selectedFeeling === 'overwhelmed' && { borderWidth: 1.5, borderColor: Colors.mood.anxious }
                  ]}
                  onPress={() => setSelectedFeeling('overwhelmed')}
                  activeOpacity={0.7}
                >
                  <Ionicons name="rainy-outline" size={14} color={Colors.mood.anxious} style={{ marginRight: 6 }} />
                  <Text style={[styles.feelingText, { color: Colors.mood.anxious }]}>still overwhelmed</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.feelingPill,
                    { borderColor: Colors.green.muted, backgroundColor: Colors.bg.card },
                    selectedFeeling === 'something' && { borderWidth: 1.5, borderColor: Colors.green.primary }
                  ]}
                  onPress={() => setSelectedFeeling('something')}
                  activeOpacity={0.7}
                >
                  <Ionicons name="leaf-outline" size={14} color={Colors.green.primary} style={{ marginRight: 6 }} />
                  <Text style={[styles.feelingText, { color: Colors.green.primary }]}>something else</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* You Last Shared */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>YOU LAST SHARED</Text>
              <Text style={styles.sharedDate}>May 16, 2025</Text>
            </View>

            <View style={styles.sharedQuoteBox}>
              <Ionicons name="chatbubble-ellipses" size={18} color="#E8DCC8" style={{ marginBottom: 6 }} />
              <Text style={styles.sharedQuoteText}>
                "Everything just feels like too much. I feel like I'm failing in so many areas of my life."
              </Text>
              <TouchableOpacity style={styles.sharedAction} onPress={() => router.push('/whispers')} activeOpacity={0.6}>
                <Text style={styles.sharedActionText}>view full conversation</Text>
                <Ionicons name="arrow-forward" size={12} color={Colors.text.muted} />
              </TouchableOpacity>
            </View>

            {/* Gentle Reminder Card with Candle SVG */}
            <View style={styles.reminderCard}>
              <View style={styles.reminderTextContent}>
                <View style={styles.reminderTagRow}>
                  <Text style={styles.reminderTag}>a gentle reminder</Text>
                  <Ionicons name="leaf" size={10} color={Colors.green.secondary} style={{ marginLeft: 4 }} />
                </View>
                <Text style={styles.reminderText}>
                  You don't have to carry it all today. One breath. One step. I'm here.
                </Text>
              </View>

              {/* Candle SVG */}
              <View style={styles.candleIllustration}>
                <Svg width={60} height={60} viewBox="0 0 60 60">
                  <Defs>
                    <LinearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor="#FFEAA7" />
                      <Stop offset="0.6" stopColor="#FDCB6E" />
                      <Stop offset="1" stopColor="#E17055" stopOpacity="0" />
                    </LinearGradient>
                  </Defs>
                  
                  {/* Glass jar */}
                  <Rect x="20" y="25" width="20" height="25" rx="3" fill="rgba(253, 250, 246, 0.8)" stroke="#E8DCC8" strokeWidth="1" />
                  
                  {/* Wax */}
                  <Rect x="21" y="32" width="18" height="17" rx="1" fill="#F5ECE1" />
                  
                  {/* Wick */}
                  <Path d="M 30 32 L 30 27" stroke="#2C1810" strokeWidth="1.2" />
                  
                  {/* Flame */}
                  <Path d="M 30 27 Q 27 22 30 14 Q 33 22 30 27 Z" fill="url(#flameGrad)" />
                  
                  {/* Flame Glow Circle */}
                  <Circle cx="30" cy="20" r="10" fill="#FFEAA7" opacity="0.15" />
                  
                  {/* Small Leaf decoration next to jar */}
                  <Path d="M 43 45 Q 46 41 48 43" fill="none" stroke={Colors.green.muted} strokeWidth="1" />
                </Svg>
              </View>
            </View>

            {/* Quick Actions Grid */}
            <Text style={[styles.sectionTitle, { paddingHorizontal: Spacing.lg, marginTop: Spacing.lg }]}>
              I'M HERE FOR YOU
            </Text>

            <View style={styles.actionsGrid}>
              <TouchableOpacity 
                style={styles.gridCard} 
                onPress={() => router.push('/whispers')}
                activeOpacity={0.7}
              >
                <View style={styles.gridIconContainer}>
                  <Ionicons name="chatbubble-ellipses-outline" size={18} color={Colors.green.primary} />
                </View>
                <Text style={styles.gridCardTitle}>talk to whisper</Text>
                <Text style={styles.gridCardSub}>start a chat</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.gridCard} 
                onPress={() => router.push('/journal')}
                activeOpacity={0.7}
              >
                <View style={styles.gridIconContainer}>
                  <Ionicons name="create-outline" size={18} color={Colors.green.primary} />
                </View>
                <Text style={styles.gridCardTitle}>write it out</Text>
                <Text style={styles.gridCardSub}>open journal</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.gridCard} 
                onPress={() => router.push('/prayers')}
                activeOpacity={0.7}
              >
                <View style={styles.gridIconContainer}>
                  <Ionicons name="heart-outline" size={18} color={Colors.green.primary} />
                </View>
                <Text style={styles.gridCardTitle}>say a prayer</Text>
                <Text style={styles.gridCardSub}>pray together</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.gridCard} 
                onPress={() => router.push('/whispers')}
                activeOpacity={0.7}
              >
                <View style={styles.gridIconContainer}>
                  <Ionicons name="trophy-outline" size={18} color={Colors.green.primary} />
                </View>
                <Text style={styles.gridCardTitle}>share praise</Text>
                <Text style={styles.gridCardSub}>celebrate wins</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Explore Banner */}
            <View style={styles.exploreBanner}>
              <View style={{ flex: 1, paddingRight: Spacing.sm }}>
                <Text style={styles.exploreTitle}>Need something to uplift your heart?</Text>
                <Text style={styles.exploreSub}>Read a whisper, listen to a story, or reflect.</Text>
              </View>
              <TouchableOpacity 
                style={styles.exploreBtn} 
                onPress={() => router.push('/')}
                activeOpacity={0.8}
              >
                <Text style={styles.exploreBtnText}>explore content</Text>
                <Ionicons name="chevron-forward" size={14} color={Colors.white} />
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

        {/* Space for bottom nav bar tabs */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backBtn: {
    padding: 4,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 22,
    color: Colors.green.primary,
  },
  tagline: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: Colors.text.muted,
    marginTop: -2,
  },
  moreBtn: {
    padding: 4,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  memoryBox: {
    flexDirection: 'row',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border.default,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadows.sm,
  },
  memoryTextContent: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  memoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  memoryTagText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.text.secondary,
  },
  memoryMessage: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 16,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  moodHighlight: {
    fontFamily: 'Inter_600SemiBold',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: Radius.sm,
  },
  memorySub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.text.muted,
    marginTop: 6,
  },
  mailboxIllustration: {
    width: 90,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
    gap: Spacing.xs,
  },
  subTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: Radius.md,
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeSubTab: {
    backgroundColor: Colors.bg.card,
    borderColor: Colors.border.soft,
    ...Shadows.sm,
  },
  subTabText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.text.muted,
  },
  activeSubTabText: {
    color: Colors.green.primary,
  },
  checkInCard: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border.default,
    ...Shadows.sm,
  },
  checkInTag: {
    ...CommonStyles.smallCaps,
    color: Colors.text.muted,
    fontSize: 9,
    marginBottom: Spacing.xs,
  },
  checkInTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 18,
    color: Colors.text.primary,
    lineHeight: 24,
    marginBottom: 4,
  },
  checkInSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.text.muted,
    marginBottom: Spacing.md,
  },
  feelingPillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  feelingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  feelingText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    textTransform: 'lowercase',
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
    ...CommonStyles.smallCaps,
    color: Colors.text.muted,
    fontSize: 10,
  },
  sharedDate: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: Colors.text.muted,
  },
  sharedQuoteBox: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border.soft,
    ...Shadows.sm,
  },
  sharedQuoteText: {
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  sharedAction: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  sharedActionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.text.secondary,
    marginRight: 4,
  },
  reminderCard: {
    flexDirection: 'row',
    backgroundColor: '#FAF5EA', // Slightly warmer amber tint
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
    borderWidth: 1,
    borderColor: '#EFE2CC',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadows.sm,
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
    ...CommonStyles.smallCaps,
    color: Colors.green.secondary,
    fontSize: 9,
  },
  reminderText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  candleIllustration: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-between',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  gridCard: {
    width: '48%',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.soft,
    alignItems: 'center',
    ...Shadows.sm,
  },
  gridIconContainer: {
    width: 36,
    height: 36,
    borderRadius: Radius.circle,
    backgroundColor: Colors.bg.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  gridCardTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 13,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  gridCardSub: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: Colors.text.muted,
  },
  exploreBanner: {
    flexDirection: 'row',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border.soft,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadows.sm,
  },
  exploreTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 13,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  exploreSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: Colors.text.muted,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
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
