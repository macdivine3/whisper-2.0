import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Radius } from '../constants/theme';

interface ReactionBarProps {
  onThankYou?: () => void;
  onNeededThat?: () => void;
  onSave?: () => void;
  onShare?: () => void;
}

type ReactionKey = 'thankYou' | 'neededThat' | 'save' | 'share';

export default function ReactionBar({
  onThankYou,
  onNeededThat,
  onSave,
  onShare,
}: ReactionBarProps) {
  const [active, setActive] = useState<ReactionKey | null>(null);

  const handlePress = (key: ReactionKey, callback?: () => void) => {
    // Toggle off if already selected
    const next = active === key ? null : key;
    setActive(next);
    if (next !== null) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      callback?.();
    }
  };

  const reactions: { key: ReactionKey; icon: string; iconActive: string; label: string; cb?: () => void }[] = [
    { key: 'thankYou',   icon: 'heart-outline',    iconActive: 'heart',        label: 'thank you',    cb: onThankYou   },
    { key: 'neededThat', icon: 'leaf-outline',      iconActive: 'leaf',         label: 'I needed that', cb: onNeededThat },
    { key: 'save',       icon: 'bookmark-outline',  iconActive: 'bookmark',     label: 'save this',    cb: onSave       },
    { key: 'share',      icon: 'share-outline',     iconActive: 'share',        label: 'share',        cb: onShare      },
  ];

  return (
    <View style={styles.container}>
      {reactions.map(({ key, icon, iconActive, label, cb }) => {
        const isActive = active === key;
        return (
          <TouchableOpacity
            key={key}
            style={[styles.btn, isActive && styles.btnActive]}
            onPress={() => handlePress(key, cb)}
            activeOpacity={0.65}
          >
            <Ionicons
              name={(isActive ? iconActive : icon) as any}
              size={13}
              color={isActive ? Colors.green.primary : Colors.text.muted}
              style={styles.icon}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border.soft,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.soft,
    marginVertical: Spacing.sm,
    marginHorizontal: Spacing.lg,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: Radius.sm,
  },
  btnActive: {
    backgroundColor: Colors.green.faint,
  },
  icon: {
    marginRight: 4,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: Colors.text.secondary,
    textTransform: 'lowercase',
  },
  labelActive: {
    color: Colors.green.primary,
    fontFamily: 'Inter_600SemiBold',
  },
});
