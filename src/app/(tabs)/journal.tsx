import { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../../constants/theme';

// Import Refactored Components
import JournalHeader from '../../components/journal/JournalHeader';
import JournalSubTabs from '../../components/journal/JournalSubTabs';
import JournalPromptCard from '../../components/journal/JournalPromptCard';
import JournalEntryCard, { JournalEntry } from '../../components/journal/JournalEntryCard';
import JournalVerseCard from '../../components/journal/JournalVerseCard';

type TabType = 'entries' | 'favorites' | 'prompts';

export default function JournalScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('entries');

  const [entries] = useState<JournalEntry[]>([
    {
      id: 'e1',
      title: 'Feeling Overwhelmed',
      date: 'May 18, 2025',
      excerpt: "Today was a lot. My mind wouldn't stop racing and I felt like I was failing in so...",
      mood: 'anxious',
      color: '#8B8B8B',
    },
    {
      id: 'e2',
      title: 'Grateful for the Little Things',
      date: 'May 17, 2025',
      excerpt: 'God really showed up in the small moments today. The sunrise, a kind...',
      mood: 'grateful',
      color: '#C9851A',
    },
    {
      id: 'e3',
      title: 'A Quiet Night Prayer',
      date: 'May 16, 2025',
      excerpt: 'Lord, I\'m laying it all down tonight. Thank You for being close when...',
      mood: 'hopeful',
      color: '#C9851A',
    },
  ]);

  const favoriteEntries: JournalEntry[] = [
    {
      id: 'f1',
      title: 'When I Needed Peace',
      date: 'May 12, 2025',
      excerpt: 'You calmed my heart in ways I can\'t even explain. You always...',
      mood: 'peaceful',
      color: '#6B8E78',
      isFavorite: true,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <JournalHeader />

        {/* Segmented Tabs */}
        <JournalSubTabs
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />

        {activeTab === 'entries' && (
          <>
            {/* Featured Prompt Card */}
            <JournalPromptCard />

            {/* Recent Entries */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>RECENT ENTRIES</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>view all &gt;</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.entriesList}>
              {entries.map((entry) => (
                <JournalEntryCard key={entry.id} entry={entry} />
              ))}
            </View>

            {/* Favorites Section */}
            <View style={[styles.sectionHeader, { marginTop: Spacing.xl }]}>
              <Text style={styles.sectionTitle}>FAVORITES</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>view all &gt;</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.entriesList}>
              {favoriteEntries.map((entry) => (
                <JournalEntryCard key={entry.id} entry={entry} />
              ))}
            </View>

            {/* Verse Card at the bottom */}
            <JournalVerseCard />
          </>
        )}

        {activeTab === 'favorites' && (
          <View style={styles.entriesList}>
            {favoriteEntries.map((entry) => (
              <JournalEntryCard key={entry.id} entry={entry} />
            ))}
          </View>
        )}

        {activeTab === 'prompts' && (
          <View style={styles.promptsTabContainer}>
            <JournalPromptCard />
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
    letterSpacing: 1.2,
    color: Colors.green.primary,
  },
  viewAll: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors.text.muted,
  },
  entriesList: {
    paddingHorizontal: Spacing.lg,
  },
  promptsTabContainer: {
    marginTop: Spacing.md,
  },
  bottomSpacer: {
    height: 80,
  },
});
