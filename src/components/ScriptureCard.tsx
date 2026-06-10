import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';
import { Colors, Radius, Spacing, Shadows } from '../constants/theme';

const LEAF_IMAGE = require('../../assets/images/leaf-transparent.png');

interface ScriptureCardProps {
  verse?: string;
  reference?: string;
}

export default function ScriptureCard({
  verse = "Cast all your anxiety on Him because He cares for you.",
  reference = "1 Peter 5:7",
}: ScriptureCardProps) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(`"${verse}" — ${reference}`);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSaved((prev) => !prev);
  };

  return (
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={['#F3EAD9', '#E6DCC8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Leaf Watermark */}
        <View style={styles.watermarkContainer}>
          <Image source={LEAF_IMAGE} style={styles.watermarkImage} resizeMode="contain" />
        </View>

        {/* Top label row */}
        <View style={styles.topRow}>
          <View style={styles.scriptureTag}>
            <Ionicons name="sunny" size={10} color={Colors.mood.hopeful} style={{ marginRight: 4 }} />
            <Text style={styles.scriptureTagText}>SCRIPTURE</Text>
          </View>
          <Text style={styles.referenceText}>{reference}</Text>
        </View>

        {/* Verse */}
        <Text style={styles.verseText}>"{verse}"</Text>

        {/* Action Row */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleCopy} activeOpacity={0.7}>
            <Ionicons
              name={copied ? 'checkmark-circle' : 'copy-outline'}
              size={14}
              color={copied ? Colors.green.primary : Colors.text.muted}
            />
            <Text style={[styles.actionLabel, copied && styles.actionLabelActive]}>
              {copied ? 'copied!' : 'copy'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handleSave} activeOpacity={0.7}>
            <Ionicons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={14}
              color={saved ? Colors.green.primary : Colors.text.muted}
            />
            <Text style={[styles.actionLabel, saved && styles.actionLabelActive]}>
              {saved ? 'saved' : 'save verse'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    alignSelf: 'stretch',
    ...Shadows.sm,
  },
  card: {
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border.soft,
    position: 'relative',
    overflow: 'hidden',
  },
  watermarkContainer: {
    position: 'absolute',
    bottom: -35,
    right: -20,
    opacity: 0.25, // Increased visibility
    zIndex: 0,
  },
  watermarkImage: {
    width: 150,
    height: 150,
    transform: [{ rotate: '-18deg' }],
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  scriptureTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scriptureTagText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    letterSpacing: 1.2,
    color: Colors.mood.hopeful,
  },
  referenceText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.text.muted,
  },
  verseText: {
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 15,
    color: Colors.text.primary,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.soft,
    paddingTop: Spacing.sm,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: Colors.text.muted,
    marginLeft: 4,
  },
  actionLabelActive: {
    color: Colors.green.primary,
    fontFamily: 'Inter_600SemiBold',
  },
});

