import { useCallback, useState } from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing } from '../../constants/theme';

// Import Refactored Components
import JournalHeader from '../../components/journal/JournalHeader';
import JournalSubTabs from '../../components/journal/JournalSubTabs';
import JournalPromptCard from '../../components/journal/JournalPromptCard';
import JournalEntryCard from '../../components/journal/JournalEntryCard';
import JournalVerseCard from '../../components/journal/JournalVerseCard';

// Data layer
import { getEntries, toggleFavorite, deleteEntry, JournalEntry } from '../../lib/journal';

type TabType = 'entries' | 'favorites' | 'prompts';

export default function JournalScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('entries');
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Reload entries every time the screen comes into focus — so a newly saved
  // entry shows up the instant we return from the writing modal.
  useFocusEffect(
    useCallback(() => {
      let active = true;
      getEntries().then((data) => {
        if (active) setEntries(data);
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const favoriteEntries = entries.filter((e) => e.isFavorite);

  const handleToggleFavorite = async (entry: JournalEntry) => {
    const next = await toggleFavorite(entry.id);
    setEntries(next);
  };

  const handleDelete = (entry: JournalEntry) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      'Delete this entry?',
      `"${entry.title}" will be permanently removed.`,
      [
        { text: 'Keep it', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const next = await deleteEntry(entry.id);
            setEntries(next);
          },
        },
      ]
    );
  };

  const openNewEntry = (prompt?: string) => {
    router.push({
      pathname: '/journal-entry',
      params: prompt ? { prompt } : undefined,
    });
  };

  const openEntry = (entry: JournalEntry) => {
    // Reading a full entry is a future slice; for now the write modal is the
    // canonical entry surface. Tapping favorites/bookmark already works.
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <JournalHeader onNewEntry={() => openNewEntry()} />

        {/* Segmented Tabs */}
        <JournalSubTabs
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />

        {activeTab === 'entries' && (
          <>
            {/* Featured Prompt Card */}
            <JournalPromptCard onPress={(prompt) => openNewEntry(prompt)} />

            {/* Recent Entries */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>RECENT ENTRIES</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>view all &gt;</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.entriesList}>
              {entries.length === 0 ? (
                <Text style={styles.emptyText}>
                  Your heart's pages are blank. Tap + to write your first entry.
                </Text>
              ) : (
                entries.map((entry) => (
                  <JournalEntryCard
                    key={entry.id}
                    entry={entry}
                    onPress={openEntry}
                    onLongPress={handleDelete}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))
              )}
            </View>

            {/* Favorites Section */}
            {favoriteEntries.length > 0 && (
              <>
                <View style={[styles.sectionHeader, { marginTop: Spacing.xl }]}>
                  <Text style={styles.sectionTitle}>FAVORITES</Text>
                  <TouchableOpacity onPress={() => setActiveTab('favorites')}>
                    <Text style={styles.viewAll}>view all &gt;</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.entriesList}>
                  {favoriteEntries.map((entry) => (
                    <JournalEntryCard
                      key={entry.id}
                      entry={entry}
                      onPress={openEntry}
                      onLongPress={handleDelete}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </View>
              </>
            )}

            {/* Verse Card at the bottom */}
            <JournalVerseCard />
          </>
        )}

        {activeTab === 'favorites' && (
          <View style={styles.entriesList}>
            {favoriteEntries.length === 0 ? (
              <Text style={styles.emptyText}>
                No favorites yet. Tap the bookmark on any entry to keep it close.
              </Text>
            ) : (
              favoriteEntries.map((entry) => (
                <JournalEntryCard
                  key={entry.id}
                  entry={entry}
                  onPress={openEntry}
                  onLongPress={handleDelete}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
            )}
          </View>
        )}

        {activeTab === 'prompts' && (
          <View style={styles.promptsTabContainer}>
            <JournalPromptCard onPress={(prompt) => openNewEntry(prompt)} />
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
  emptyText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.text.muted,
    textAlign: 'center',
    lineHeight: 20,
    paddingVertical: Spacing.lg,
  },
  promptsTabContainer: {
    marginTop: Spacing.md,
  },
  bottomSpacer: {
    height: 80,
  },
});
