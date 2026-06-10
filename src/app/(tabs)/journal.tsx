import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, Radius, Shadows, Spacing } from "../../constants/theme";

const { width } = Dimensions.get("window");

// Assets
const CANDLE_IMAGE = require("../../../svjs/candle.jpg");
const BOOK_LEAF_IMAGE = require("../../../svjs/book + leaf.jpg");
const LEAF_BG = require("../../../assets/images/leaf-transparent.png");

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
            <Text style={styles.tagline}>a space for your heart</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons
                name="search-outline"
                size={18}
                color={Colors.text.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addBtn}>
              <Ionicons name="add" size={20} color={Colors.white} />
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

        {/* Featured Prompt Card (soft horizontal) with vertical background image */}
        <View style={styles.featuredSmallWrap}>
          <View style={styles.featuredSmall}>
            <Image
              source={BOOK_LEAF_IMAGE}
              style={styles.featuredBgImage}
              resizeMode="cover"
            />
            <View style={{ flex: 1, zIndex: 2 }}>
              <Text style={styles.featuredSmallLabel}>TODAY'S REFLECTION</Text>
              <Text style={styles.featuredSmallTitle}>
                What's something you're learning to surrender into God's hands?
              </Text>
              <TouchableOpacity style={styles.featuredSmallCta}>
                <Text style={styles.featuredSmallCtaText}>
                  take a moment to write
                </Text>
              </TouchableOpacity>
            </View>
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
              style={styles.entryCardNew}
              activeOpacity={0.85}
            >
              <View style={styles.entryLeftIconWrap}>
                <View
                  style={[
                    styles.entryIcon,
                    { backgroundColor: getMoodBg(entry.mood) },
                  ]}
                >
                  <Ionicons
                    name={iconForMood(entry.mood)}
                    size={20}
                    color={Colors.green.primary}
                  />
                </View>
              </View>

              <View style={styles.entryMain}>
                <Text style={styles.entryTitleNew}>{entry.title}</Text>
                <Text style={styles.entryExcerptNew} numberOfLines={1}>
                  {entry.excerpt}
                </Text>
              </View>

              <View style={styles.entryRight}>
                <Text style={styles.entryDateNew}>{entry.date}</Text>
                <Ionicons
                  name="bookmark-outline"
                  size={16}
                  color={Colors.text.muted}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Favorites */}
        <View style={[styles.sectionHeader, { marginTop: Spacing.xl }]}>
          <Text style={styles.sectionTitle}>FAVORITES</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>view all</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.favoriteCard} activeOpacity={0.85}>
          <View style={styles.favoriteLeft}>
            <View
              style={[
                styles.favoriteIcon,
                { backgroundColor: Colors.moodBg.peaceful },
              ]}
            >
              <Ionicons name="heart" size={18} color={Colors.green.primary} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.favoriteTitle}>When I Needed Peace</Text>
            <Text style={styles.favoriteExcerpt} numberOfLines={1}>
              You calmed my heart in ways I can't even explain. You always...
            </Text>
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.favoriteDate}>May 12, 2025</Text>
          </View>
        </TouchableOpacity>

        {/* Quote Banner */}
        <View style={styles.quoteWrap}>
          <Text style={styles.quoteText}>
            “You keep track of all my sorrows. You have collected all my tears
            in your bottle.”
          </Text>
          <Text style={styles.quoteRef}>PSALM 56:8</Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

function getMoodBg(mood: string) {
  switch (mood) {
    case "grateful":
      return Colors.moodBg.grateful;
    case "hopeful":
      return Colors.moodBg.hopeful;
    case "peaceful":
      return Colors.moodBg.peaceful;
    case "anxious":
      return Colors.moodBg.anxious;
    default:
      return Colors.bg.secondary;
  }
}

function iconForMood(mood: string) {
  switch (mood) {
    case "grateful":
      return "sunny-outline";
    case "hopeful":
      return "sunny-outline";
    case "peaceful":
      return "leaf-outline";
    case "anxious":
      return "cloudy-outline";
    default:
      return "book-outline";
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 140,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.sm,
    alignItems: "center",
  },
  logo: {
    fontFamily: "NotoSerif_700Bold",
    fontSize: 30,
    color: Colors.text.primary,
  },
  tagline: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: Colors.text.muted,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.circle,
    backgroundColor: Colors.bg.card,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
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
    marginTop: Spacing.md,
    gap: 8,
  },
  segmentItem: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: Radius.pill,
    backgroundColor: Colors.bg.card,
  },
  segmentActive: {
    backgroundColor: Colors.green.faint,
  },
  segmentText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.text.muted,
  },
  segmentTextActive: {
    color: Colors.green.primary,
  },
  featuredSmallWrap: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  featuredSmall: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  featuredSmallLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: Colors.text.muted,
    marginBottom: 6,
  },
  featuredSmallTitle: {
    fontFamily: "NotoSerif_700Bold",
    fontSize: 16,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  featuredSmallCta: {
    marginTop: Spacing.sm,
  },
  featuredSmallCtaText: {
    color: Colors.green.primary,
    fontFamily: "Inter_600SemiBold",
  },
  featuredSmallImage: {
    width: 88,
    height: 88,
    marginLeft: Spacing.md,
    borderRadius: Radius.md,
  },
  featuredBgImage: {
    position: "absolute",
    right: -40,
    top: -10,
    width: 220,
    height: 220,
    opacity: 0.98,
    transform: [{ rotate: "90deg" }],
    borderRadius: Radius.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
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
  entryCardNew: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bg.card,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border.soft,
  },
  entryLeftIconWrap: {
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
  },
  entryIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  entryMain: {
    flex: 1,
  },
  entryTitleNew: {
    fontFamily: "NotoSerif_700Bold",
    fontSize: 16,
    color: Colors.text.primary,
  },
  entryExcerptNew: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  entryRight: {
    alignItems: "flex-end",
    marginLeft: Spacing.md,
  },
  entryDateNew: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: Colors.text.muted,
    marginBottom: 8,
  },
  favoriteCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bg.card,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.soft,
    marginBottom: Spacing.sm,
  },
  favoriteLeft: {
    marginRight: Spacing.md,
  },
  favoriteIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteTitle: {
    fontFamily: "NotoSerif_700Bold",
    fontSize: 16,
    color: Colors.text.primary,
  },
  favoriteExcerpt: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  favoriteDate: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: Colors.text.muted,
  },
  quoteWrap: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.soft,
  },
  quoteText: {
    fontFamily: "NotoSerif_700Bold",
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  quoteRef: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: Colors.text.muted,
  },
  bottomSpacer: {
    height: 80,
  },
});
