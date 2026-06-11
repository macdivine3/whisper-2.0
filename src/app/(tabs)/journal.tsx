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
const BOOK_LEAF_IMAGE = require("../../../svjs/book_leaf.jpg");

// Mood Icons from SVJS
const MOOD_ICONS = {
  grateful: require("../../../svjs/grateful.jpg"),
  peaceful: require("../../../svjs/peaceful.jpg"),
  anxious: require("../../../svjs/anxious.jpg"),
  drained: require("../../../svjs/drained.jpg"),
  overwhelmed: require("../../../svjs/overwhelmed.jpg"),
  unsure: require("../../../svjs/unsure.jpg"),
  hopeful: require("../../../svjs/grateful.jpg"), // Fallback
};

interface JournalEntry {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  mood: string;
  color: string;
}

export default function JournalScreen() {
  const [entries] = useState<JournalEntry[]>([
    {
      id: "e1",
      title: "surrendering my plans",
      date: "MAY 18",
      excerpt:
        "Today I realized that my need for control is just a mask for my fear. I'm learning to let go...",
      mood: "peaceful",
      color: "#4A7231",
    },
    {
      id: "e2",
      title: "the weight of waiting",
      date: "MAY 16",
      excerpt:
        "Waiting isn't passive. It's an active trust. Even when the silence feels heavy, He is working...",
      mood: "hopeful",
      color: "#C9851A",
    },
    {
      id: "e3",
      title: "finding beauty in ruins",
      date: "MAY 12",
      excerpt:
        "Even the broken pieces of my story have a place in His masterpiece. Every tear is seen.",
      mood: "grateful",
      color: "#B05555",
    },
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.logo}>journal</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons
                name="search-outline"
                size={20}
                color={Colors.text.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addBtn}>
              <Ionicons name="add" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Segmented Tabs */}
        <View style={styles.segmentRow}>
          <TouchableOpacity style={[styles.segmentItem, styles.segmentActive]}>
            <Text style={[styles.segmentText, styles.segmentTextActive]}>
              My Entries
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.segmentItem}>
            <Text style={styles.segmentText}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.segmentItem}>
            <Text style={styles.segmentText}>Prompts</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Prompt Card - Matches "whisper ui journal.jpg" */}
        <View style={styles.featuredContainer}>
          <View style={styles.featuredCard}>
            <View style={{ flex: 1, padding: Spacing.lg }}>
              <Text style={styles.featuredLabel}>TODAY'S PROMPT</Text>
              <Text style={styles.featuredTitle}>
                What's something you're learning to surrender?
              </Text>
              <TouchableOpacity style={styles.featuredCta}>
                <Text style={styles.featuredCtaText}>start writing</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={BOOK_LEAF_IMAGE}
              style={styles.featuredImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Recent Entries */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>RECENT ENTRIES</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>view all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.entriesList}>
          {entries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={styles.entryCard}
              activeOpacity={0.85}
            >
              <View style={styles.entryIconContainer}>
                <Image
                  source={MOOD_ICONS[entry.mood as keyof typeof MOOD_ICONS] || MOOD_ICONS.peaceful}
                  style={styles.moodIconImage}
                />
              </View>

              <View style={styles.entryMain}>
                <Text style={styles.entryTitle}>{entry.title}</Text>
                <Text style={styles.entryExcerpt} numberOfLines={1}>
                  {entry.excerpt}
                </Text>
              </View>

              <View style={styles.entryRight}>
                <Text style={styles.entryDate}>{entry.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    alignItems: "center",
  },
  logo: {
    fontFamily: "NotoSerif_700Bold",
    fontSize: 32,
    color: Colors.text.primary,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.circle,
    backgroundColor: Colors.bg.card,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border.soft,
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
  segmentRow: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    gap: 8,
  },
  segmentItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Radius.pill,
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.soft,
  },
  segmentActive: {
    backgroundColor: Colors.green.primary,
    borderColor: Colors.green.primary,
  },
  segmentText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.text.muted,
  },
  segmentTextActive: {
    color: Colors.white,
  },
  featuredContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  featuredCard: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    height: 160,
    overflow: "hidden",
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: Colors.border.soft,
  },
  featuredLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: Colors.text.muted,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  featuredTitle: {
    fontFamily: "NotoSerif_700Bold",
    fontSize: 18,
    color: Colors.text.primary,
    lineHeight: 24,
  },
  featuredCta: {
    marginTop: 12,
  },
  featuredCtaText: {
    color: Colors.green.primary,
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    textTransform: "uppercase",
  },
  featuredImage: {
    width: 120,
    height: "100%",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    letterSpacing: 1.5,
    color: Colors.text.muted,
  },
  viewAll: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: Colors.green.primary,
  },
  entriesList: {
    paddingHorizontal: Spacing.lg,
  },
  entryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bg.card,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border.soft,
  },
  entryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    overflow: "hidden",
    marginRight: Spacing.md,
  },
  moodIconImage: {
    width: "100%",
    height: "100%",
  },
  entryMain: {
    flex: 1,
  },
  entryTitle: {
    fontFamily: "NotoSerif_700Bold",
    fontSize: 16,
    color: Colors.text.primary,
  },
  entryExcerpt: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  entryRight: {
    marginLeft: Spacing.md,
  },
  entryDate: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.text.muted,
  },
  bottomSpacer: {
    height: 80,
  },
});
