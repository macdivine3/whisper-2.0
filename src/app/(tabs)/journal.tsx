import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Radius, Shadows, Spacing } from "../../constants/theme";

const { width } = Dimensions.get("window");

// Assets
const BOOK_LEAF_IMAGE = require("../../../svjs/book_leaf-removebg-preview.png");

// Mood Icons from SVJS
const MOOD_ICONS = {
  grateful: require("../../../svjs/grateful-removebg-preview.png"),
  peaceful: require("../../../svjs/peaceful-removebg-preview.png"),
  anxious: require("../../../svjs/anxious-removebg-preview.png"),
  drained: require("../../../svjs/drained-removebg-preview.png"),
  overwhelmed: require("../../../svjs/overwhelmed-removebg-preview.png"),
  unsure: require("../../../svjs/unsure-removebg-preview.png"),
  hopeful: require("../../../svjs/grateful-removebg-preview.png"), // Fallback
};

const LEAF_IMAGE = require("../../../svjs/leaf image.jpg");

interface JournalEntry {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  mood: string;
  color: string;
  isFavorite?: boolean;
}

export default function JournalScreen() {
  const [entries] = useState<JournalEntry[]>([
    {
      id: "e1",
      title: "Feeling Overwhelmed",
      date: "May 18, 2025",
      excerpt: "Today was a lot. My mind wouldn't stop racing and I felt like I was failing in so...",
      mood: "anxious",
      color: "#8B8B8B",
    },
    {
      id: "e2",
      title: "Grateful for the Little Things",
      date: "May 17, 2025",
      excerpt: "God really showed up in the small moments today. The sunrise, a kind...",
      mood: "grateful",
      color: "#C9851A",
    },
    {
      id: "e3",
      title: "A Quiet Night Prayer",
      date: "May 16, 2025",
      excerpt: "Lord, I'm laying it all down tonight. Thank You for being close when...",
      mood: "hopeful",
      color: "#C9851A",
    },
  ]);

  const favoriteEntries: JournalEntry[] = [
    {
      id: "f1",
      title: "When I Needed Peace",
      date: "May 12, 2025",
      excerpt: "You calmed my heart in ways I can't even explain. You always...",
      mood: "peaceful",
      color: "#6B8E78",
      isFavorite: true,
    }
  ];

  const renderEntryCard = (entry: JournalEntry) => (
    <TouchableOpacity
      key={entry.id}
      style={styles.entryCard}
      activeOpacity={0.85}
    >
      <View style={[styles.moodIconBg, { backgroundColor: entry.color + '15' }]}>
        <Image
          source={MOOD_ICONS[entry.mood as keyof typeof MOOD_ICONS] || MOOD_ICONS.peaceful}
          style={styles.moodIconImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.entryMain}>
        <Text style={styles.entryTitle} numberOfLines={1}>{entry.title}</Text>
        <Text style={styles.entryExcerpt} numberOfLines={2}>
          {entry.excerpt}
        </Text>
      </View>

      <View style={styles.entryRight}>
        <View style={styles.entryRightTop}>
          <Text style={styles.entryDate}>{entry.date}</Text>
          <Ionicons
            name={entry.isFavorite ? "bookmark" : "bookmark-outline"}
            size={18}
            color={entry.isFavorite ? Colors.green.primary : Colors.text.muted}
            style={{ marginLeft: 6 }}
          />
        </View>
        <View style={[styles.emotionTag, { backgroundColor: entry.color + '20' }]}>
          <Text style={[styles.emotionTagText, { color: entry.color }]}>{entry.mood}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>journal</Text>
              <Ionicons name="leaf" size={16} color={Colors.green.primary} style={styles.logoIcon} />
            </View>
            <Text style={styles.tagline}>a space for your heart</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons
                name="search-outline"
                size={20}
                color={Colors.text.primary}
              />
            </TouchableOpacity>
            <View style={styles.addBtnContainer}>
              <TouchableOpacity style={styles.addBtn}>
                <Ionicons name="add" size={24} color={Colors.white} />
              </TouchableOpacity>
              <Text style={styles.addBtnText}>new entry</Text>
            </View>
          </View>
        </View>

        {/* Segmented Tabs */}
        <View style={styles.segmentContainer}>
          <View style={styles.segmentRow}>
            <TouchableOpacity style={[styles.segmentItem, styles.segmentActive]}>
              <Text style={[styles.segmentText, styles.segmentTextActive]}>
                My Entries
              </Text>
            </TouchableOpacity>

            <View style={styles.segmentDivider} />

            <TouchableOpacity style={styles.segmentItem}>
              <Ionicons name="heart-outline" size={14} color={Colors.text.muted} style={{ marginRight: 6 }} />
              <Text style={styles.segmentText}>Favorites</Text>
            </TouchableOpacity>

            <View style={styles.segmentDivider} />

            <TouchableOpacity style={styles.segmentItem}>
              <Ionicons name="leaf-outline" size={14} color={Colors.text.muted} style={{ marginRight: 6 }} />
              <Text style={styles.segmentText}>Prompts</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Prompt Card */}
        <View style={styles.featuredContainer}>
          <View style={styles.featuredCard}>
            <View style={styles.featuredContent}>
              <View style={styles.featuredLabelRow}>
                <Ionicons name="sunny-outline" size={16} color="#C9851A" />
                <Text style={styles.featuredLabel}>TODAY'S REFLECTION</Text>
              </View>

              <Text style={styles.featuredTitle}>
                What's something you're learning to surrender into God's hands?
              </Text>

              <TouchableOpacity style={styles.featuredCta} activeOpacity={0.7}>
                <Ionicons name="leaf-outline" size={16} color={Colors.green.primary} />
                <Text style={styles.featuredCtaText}>take a moment to write</Text>
              </TouchableOpacity>
            </View>

            {/* Background image positioned absolute on the right */}
            <Image
              source={BOOK_LEAF_IMAGE}
              style={styles.featuredImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Recent Entries */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>RECENT ENTRIES</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>view all &gt;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.entriesList}>
          {entries.map(renderEntryCard)}
        </View>

        {/* Favorites Section */}
        <View style={[styles.sectionHeader, { marginTop: Spacing.xl }]}>
          <Text style={styles.sectionTitle}>FAVORITES</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>view all &gt;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.entriesList}>
          {favoriteEntries.map(renderEntryCard)}
        </View>

        {/* Verse Card at the bottom */}
        <View style={styles.verseContainer}>
          <View style={styles.verseCard}>
            <View style={styles.quoteIconBox}>
              <Text style={styles.quoteIconText}>“</Text>
            </View>
            <View style={styles.verseContent}>
              <Text style={styles.verseText}>
                "You keep track of all my sorrows.{'\n'}You have collected all my tears in your bottle."
              </Text>
              <Text style={styles.verseReference}>PSALM 56:8</Text>
            </View>
            <Image source={LEAF_IMAGE} style={styles.verseLeaf} resizeMode="cover" />
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8F5', // Match the warm beige background
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  // Header
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logo: {
    fontFamily: "NotoSerif_700Bold",
    fontSize: 32,
    color: Colors.green.primary, // Dark green logo
    letterSpacing: -0.5,
  },
  logoIcon: {
    marginLeft: 4,
  },
  tagline: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: Colors.text.muted,
    marginTop: -2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  searchBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.circle,
    backgroundColor: 'transparent',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  addBtnContainer: {
    alignItems: 'center',
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.circle,
    backgroundColor: Colors.green.primary,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.md,
  },
  addBtnText: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    color: Colors.text.muted,
    marginTop: 4,
  },

  // Segments
  segmentContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  segmentRow: {
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: '#F8F6F1', // Slight off-white/beige
    borderRadius: Radius.pill,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  segmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Radius.pill,
  },
  segmentActive: {
    backgroundColor: '#EAEBE3', // Light sage tint
  },
  segmentText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: Colors.text.muted,
  },
  segmentTextActive: {
    color: Colors.green.primary,
    fontFamily: "Inter_600SemiBold",
  },
  segmentDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#E8E2D8',
    marginHorizontal: 2,
  },

  // Featured Prompt Card
  featuredContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  featuredCard: {
    backgroundColor: '#F9F1E6', // Warm earthy background
    borderRadius: Radius.lg,
    height: 180,
    position: 'relative',
    overflow: "hidden",
    borderWidth: 1,
    borderColor: '#E8E2D8',
    ...Shadows.sm,
  },
  featuredImage: {
    position: 'absolute',

    // MOVE IMAGE: Change right/bottom
    right: -30,
    bottom: -30,

    // BASE SIZE
    width: 250,
    height: 100,
    zIndex: 0,

    // RESIZE WITHOUT MOVING: Change scale (e.g. 1.2 is 20% bigger, 0.8 is smaller)
    transform: [{ scale: 4.9 }],
  },
  featuredContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.md, // Move content up slightly so the CTA fits!
    zIndex: 1,
    width: '80%', // Slightly wider to fit text nicely
  },
  featuredLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Reduced from 12
  },
  featuredLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: Colors.green.primary,
    marginLeft: 6,
    letterSpacing: 1.0,
  },
  featuredTitle: {
    fontFamily: "NotoSerif_700Bold",
    fontSize: 16, // Reduced from 18
    color: Colors.text.primary,
    lineHeight: 22,
    marginBottom: 12, // Reduced to fit CTA
  },
  featuredCta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredCtaText: {
    color: Colors.green.primary,
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    marginLeft: 6,
  },

  // Section Headers
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    letterSpacing: 1.2,
    color: Colors.green.primary, // Dark green for titles
  },
  viewAll: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: Colors.text.muted,
  },

  // List Entries
  entriesList: {
    paddingHorizontal: Spacing.lg,
  },
  entryCard: {
    flexDirection: "row",
    backgroundColor: Colors.bg.primary,
    padding: 16,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    alignItems: 'center',
    ...Shadows.sm,
  },
  moodIconBg: {
    width: 54,
    height: 54,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  moodIconImage: {
    width: "100%",
    height: "100%",
  },
  entryMain: {
    flex: 1,
    paddingRight: 8,
  },
  entryTitle: {
    fontFamily: "NotoSerif_700Bold",
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  entryExcerpt: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  entryRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 54,
  },
  entryRightTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryDate: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    color: Colors.text.muted,
  },
  emotionTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  emotionTagText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    textTransform: 'lowercase',
  },

  // Verse Card
  verseContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xxl,
  },
  verseCard: {
    backgroundColor: '#F5EFE6', // Light beige
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  quoteIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDDFCD', // Slightly darker beige circle
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  quoteIconText: {
    fontFamily: "NotoSerif_700Bold",
    fontSize: 24,
    color: '#C9851A',
    lineHeight: 32,
  },
  verseContent: {
    flex: 1,
    zIndex: 1,
    paddingRight: 40, // Space for leaf
  },
  verseText: {
    fontFamily: "NotoSerif_700Bold",
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  verseReference: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: Colors.text.muted,
    marginTop: 12,
    letterSpacing: 1.0,
  },
  verseLeaf: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    width: 100,
    height: 100,
    opacity: 0.4,
    zIndex: 0,
  },

  bottomSpacer: {
    height: 80,
  },
});

