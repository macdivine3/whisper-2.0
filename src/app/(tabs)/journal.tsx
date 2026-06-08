import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Shadows, CommonStyles } from '../../constants/theme';

interface JournalEntry {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  mood: 'grateful' | 'hopeful' | 'peaceful' | 'anxious' | 'drained' | 'overwhelmed';
  moodIcon: keyof typeof Ionicons.glyphMap;
  isBookmarked?: boolean;
}

export default function JournalScreen() {
  const [activeTab, setActiveTab] = useState<'entries' | 'favorites' | 'prompts'>('entries');
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 'e1',
      title: 'Feeling Overwhelmed',
      date: 'May 18, 2025',
      excerpt: "Today was a lot. My mind wouldn't stop racing and I felt like I was failing in so...",
      mood: 'anxious',
      moodIcon: 'cloud',
      isBookmarked: true,
    },
    {
      id: 'e2',
      title: 'Grateful for the Little Things',
      date: 'May 17, 2025',
      excerpt: 'God really showed up in the small moments today. The sunrise, a kind...',
      mood: 'grateful',
      moodIcon: 'leaf',
      isBookmarked: false,
    },
    {
      id: 'e3',
      title: 'A Quiet Night Prayer',
      date: 'May 16, 2025',
      excerpt: "Lord, I'm laying it all down tonight. Thank You for being close when...",
      mood: 'hopeful',
      moodIcon: 'sunny',
      isBookmarked: true,
    },
  ]);

  const favorites = entries.filter((e) => e.isBookmarked);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>journal.</Text>
          <Text style={styles.tagline}>a space for your heart</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.searchBtn} activeOpacity={0.6}>
            <Ionicons name="search-outline" size={20} color={Colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.addBtnContainer}>
            <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
              <Ionicons name="add" size={24} color={Colors.white} />
            </TouchableOpacity>
            <Text style={styles.addBtnLabel}>new entry</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Navigation Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'entries' && styles.activeTab]}
            onPress={() => setActiveTab('entries')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === 'entries' && styles.activeTabText]}>My Entries</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
            onPress={() => setActiveTab('favorites')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === 'favorites' && styles.activeTabText]}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'prompts' && styles.activeTab]}
            onPress={() => setActiveTab('prompts')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === 'prompts' && styles.activeTabText]}>Prompts</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'entries' && (
          <>
            {/* Today's Reflection Prompter Card */}
            <View style={styles.reflectionCard}>
              <View style={styles.reflectionContent}>
                <View style={styles.reflectionHeader}>
                  <Ionicons name="sunny" size={14} color={Colors.mood.hopeful} style={{ marginRight: 6 }} />
                  <Text style={styles.reflectionTitle}>TODAY'S REFLECTION</Text>
                </View>
                <Text style={styles.promptText}>
                  What's something you're learning to surrender into God's hands?
                </Text>
                <TouchableOpacity style={styles.promptAction} activeOpacity={0.6}>
                  <Text style={styles.promptActionText}>take a moment to write</Text>
                  <Ionicons name="leaf-outline" size={12} color={Colors.green.primary} />
                </TouchableOpacity>
              </View>

              {/* Decorative Notebook Vector/Illustration representation */}
              <View style={styles.notebookIllustration}>
                <Ionicons name="book" size={60} color="#E6C594" opacity={0.65} />
                <Ionicons name="create-outline" size={24} color={Colors.green.primary} style={styles.penIcon} />
              </View>
            </View>

            {/* Recent Entries Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>RECENT ENTRIES</Text>
              <TouchableOpacity activeOpacity={0.6}>
                <Text style={styles.viewAllLink}>view all <Ionicons name="chevron-forward" size={10} /></Text>
              </TouchableOpacity>
            </View>

            {/* Entries List */}
            <View style={styles.entriesList}>
              {entries.map((entry) => (
                <View key={entry.id} style={styles.entryRow}>
                  {/* Mood Icon Rounded Box */}
                  <View style={[styles.moodIconBox, { backgroundColor: Colors.moodBg[entry.mood] }]}>
                    <Ionicons name={entry.moodIcon} size={22} color={Colors.mood[entry.mood]} />
                  </View>

                  {/* Text Contents */}
                  <View style={styles.entryDetails}>
                    <View style={styles.entryHeaderRow}>
                      <Text style={styles.entryTitle}>{entry.title}</Text>
                      <View style={styles.dateAndBookmark}>
                        <Text style={styles.entryDate}>{entry.date}</Text>
                        <Ionicons 
                          name={entry.isBookmarked ? "bookmark" : "bookmark-outline"} 
                          size={14} 
                          color={entry.isBookmarked ? Colors.green.primary : Colors.text.muted} 
                          style={{ marginLeft: 6 }}
                        />
                      </View>
                    </View>
                    <Text style={styles.entryExcerpt} numberOfLines={2}>{entry.excerpt}</Text>
                    
                    {/* Tiny Mood Tag Capsule */}
                    <View style={[styles.moodTag, { backgroundColor: Colors.moodBg[entry.mood] }]}>
                      <Text style={[styles.moodTagText, { color: Colors.mood[entry.mood] }]}>{entry.mood}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Bottom Quote Card */}
            <View style={styles.quoteCard}>
              <View style={styles.quoteWatermark}>
                <Ionicons name="leaf-outline" size={120} color={Colors.green.primary} />
              </View>
              <Ionicons name="chatbubble-ellipses" size={24} color="#E8DCC8" style={{ marginBottom: 6 }} />
              <Text style={styles.quoteText}>
                "You keep track of all my sorrows. You have collected all my tears in your bottle."
              </Text>
              <Text style={styles.quoteReference}>PSALM 56:8</Text>
            </View>
          </>
        )}

        {activeTab === 'favorites' && (
          <View style={styles.entriesList}>
            {favorites.map((entry) => (
              <View key={entry.id} style={styles.entryRow}>
                <View style={[styles.moodIconBox, { backgroundColor: Colors.moodBg[entry.mood] }]}>
                  <Ionicons name={entry.moodIcon} size={22} color={Colors.mood[entry.mood]} />
                </View>
                <View style={styles.entryDetails}>
                  <View style={styles.entryHeaderRow}>
                    <Text style={styles.entryTitle}>{entry.title}</Text>
                    <Text style={styles.entryDate}>{entry.date}</Text>
                  </View>
                  <Text style={styles.entryExcerpt} numberOfLines={2}>{entry.excerpt}</Text>
                  <View style={[styles.moodTag, { backgroundColor: Colors.moodBg[entry.mood] }]}>
                    <Text style={[styles.moodTagText, { color: Colors.mood[entry.mood] }]}>{entry.mood}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'prompts' && (
          <View style={styles.promptsList}>
            <Text style={styles.promptRow}>• How has God shown His faithfulness to you this week?</Text>
            <Text style={styles.promptRow}>• Write down a moment of unexpected joy you experienced today.</Text>
            <Text style={styles.promptRow}>• What is a burden you need to release before you sleep?</Text>
          </View>
        )}

        {/* Space for navigation tabs */}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  logo: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 26,
    color: Colors.green.primary,
  },
  tagline: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: Colors.text.muted,
    marginTop: -2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBtn: {
    width: 38,
    height: 38,
    borderRadius: Radius.circle,
    backgroundColor: Colors.bg.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border.soft,
    marginRight: Spacing.md,
    ...Shadows.sm,
  },
  addBtnContainer: {
    alignItems: 'center',
  },
  addBtn: {
    width: 38,
    height: 38,
    borderRadius: Radius.circle,
    backgroundColor: Colors.green.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
  },
  addBtnLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 9,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  tab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.soft,
  },
  activeTab: {
    backgroundColor: Colors.green.faint,
    borderColor: Colors.green.muted,
  },
  tabText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  activeTabText: {
    color: Colors.green.primary,
  },
  reflectionCard: {
    flexDirection: 'row',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border.default,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    ...Shadows.sm,
  },
  reflectionContent: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  reflectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  reflectionTitle: {
    ...CommonStyles.smallCaps,
    color: Colors.green.secondary,
    fontSize: 9,
  },
  promptText: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 16,
    color: Colors.text.primary,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  promptAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promptActionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.green.primary,
    marginRight: 4,
  },
  notebookIllustration: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
  },
  penIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
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
  viewAllLink: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.green.secondary,
  },
  entriesList: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  entryRow: {
    flexDirection: 'row',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.soft,
    alignItems: 'flex-start',
    ...Shadows.sm,
  },
  moodIconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  entryDetails: {
    flex: 1,
  },
  entryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  entryTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 14,
    color: Colors.text.primary,
  },
  dateAndBookmark: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryDate: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: Colors.text.muted,
  },
  entryExcerpt: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    lineHeight: 16,
    marginBottom: Spacing.xs,
  },
  moodTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  moodTagText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 9,
    textTransform: 'lowercase',
  },
  quoteCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    padding: Spacing.lg,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border.default,
    position: 'relative',
    overflow: 'hidden',
  },
  quoteWatermark: {
    position: 'absolute',
    bottom: -30,
    right: -20,
    opacity: 0.03,
    transform: [{ rotate: '-15deg' }],
  },
  quoteText: {
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: Spacing.sm,
  },
  quoteReference: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    color: Colors.text.muted,
    letterSpacing: 0.5,
  },
  promptsList: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    gap: Spacing.md,
  },
  promptRow: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 100,
  },
});
