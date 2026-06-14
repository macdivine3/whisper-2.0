import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Radius, Shadows, Spacing } from '../constants/theme';
import { Prayer, savePrayer } from '../lib/prayers';
import { useState } from 'react';

const LEAF_IMAGE = require('../../assets/images/leaf-transparent.png');

interface Props {
  prayer: Prayer;
}

/**
 * PrayerCard — the single reusable prayer surface. Drops into chat, journal, or
 * follow-up. In L1 the prayer text is canned per theme; in L2 Claude generates
 * it. The card itself never changes.
 */
export default function PrayerCard({ prayer }: Props) {
  const [amen, setAmen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAmen = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setAmen((p) => !p);
  };

  const handleCopy = async () => {
    const ref = prayer.reference ? ` — ${prayer.reference}` : '';
    const verse = prayer.verse ? `\n\n"${prayer.verse}"${ref}` : '';
    await Clipboard.setStringAsync(`${prayer.title}\n\n${prayer.body}${verse}`);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    if (saved) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const ok = await savePrayer(prayer);
    if (ok) setSaved(true);
  };

  return (
    <View style={styles.outer}>
      <View style={styles.card}>
        {/* Leaf watermark */}
        <View style={styles.watermark} pointerEvents="none">
          <Image source={LEAF_IMAGE} style={styles.watermarkImg} resizeMode="contain" />
        </View>

        {/* Top row: praying-hands chip + bookmark */}
        <View style={styles.topRow}>
          <View style={styles.iconChip}>
            <Ionicons name="leaf-outline" size={14} color={Colors.green.primary} />
          </View>
          <TouchableOpacity onPress={handleSave} hitSlop={8} activeOpacity={0.7}>
            <Ionicons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={saved ? Colors.green.primary : Colors.text.muted}
            />
          </TouchableOpacity>
        </View>

        {/* Label + title */}
        <Text style={styles.label}>LET'S PRAY</Text>
        <Text style={styles.title}>{prayer.title}</Text>
        <View style={styles.divider} />

        {/* Prayer body */}
        <Text style={styles.body}>{prayer.body}</Text>

        {/* Scripture chip */}
        {prayer.verse ? (
          <View style={styles.verseBox}>
            <Ionicons name="leaf" size={12} color={Colors.green.primary} style={{ marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.verseText}>{prayer.verse}</Text>
              {prayer.reference ? <Text style={styles.verseRef}>{prayer.reference}</Text> : null}
            </View>
          </View>
        ) : null}

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={handleAmen} activeOpacity={0.7}>
            <Ionicons
              name={amen ? 'heart' : 'heart-outline'}
              size={16}
              color={amen ? '#E07B7B' : Colors.text.muted}
            />
            <Text style={[styles.actionText, amen && { color: '#E07B7B' }]}>Amen</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={handleCopy} activeOpacity={0.7}>
            <Ionicons
              name={copied ? 'checkmark-circle' : 'copy-outline'}
              size={16}
              color={copied ? Colors.green.primary : Colors.text.muted}
            />
            <Text style={[styles.actionText, copied && { color: Colors.green.primary }]}>
              {copied ? 'copied' : 'Copy'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={handleSave} activeOpacity={0.7}>
            <Ionicons
              name={saved ? 'checkmark-circle' : 'bookmark-outline'}
              size={16}
              color={saved ? Colors.green.primary : Colors.text.muted}
            />
            <Text style={[styles.actionText, saved && { color: Colors.green.primary }]}>
              {saved ? 'saved' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    paddingHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    alignSelf: 'stretch',
  },
  card: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.default,
    overflow: 'hidden',
    position: 'relative',
    ...Shadows.sm,
  },
  watermark: {
    position: 'absolute',
    right: -30,
    bottom: -30,
    opacity: 0.18,
    zIndex: 0,
  },
  watermarkImg: {
    width: 150,
    height: 150,
    transform: [{ rotate: '-15deg' }],
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
    zIndex: 1,
  },
  iconChip: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.green.faint,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    letterSpacing: 1.4,
    color: Colors.green.secondary,
    marginBottom: 4,
    zIndex: 1,
  },
  title: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 20,
    color: Colors.text.primary,
    lineHeight: 26,
    zIndex: 1,
  },
  divider: {
    width: 34,
    height: 2,
    backgroundColor: Colors.warning,
    borderRadius: 2,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
    zIndex: 1,
  },
  verseBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.green.faint,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    marginTop: Spacing.md,
    zIndex: 1,
  },
  verseText: {
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 12.5,
    color: Colors.text.primary,
    lineHeight: 18,
  },
  verseRef: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: Colors.text.muted,
    marginTop: 3,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border.default,
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    zIndex: 1,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  actionText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors.text.muted,
  },
});
