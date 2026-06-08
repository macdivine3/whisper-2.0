import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Shadows } from '../constants/theme';

interface HomeHeaderProps {
  onFollowUpPress?: () => void;
  onBellPress?: () => void;
  hasNotifications?: boolean;
}

export default function HomeHeader({
  onFollowUpPress,
  onBellPress,
  hasNotifications = true,
}: HomeHeaderProps) {
  return (
    <View style={styles.header}>
      {/* Left: Logo + Tagline */}
      <View style={styles.logoBlock}>
        <View style={styles.logoRow}>
          <Text style={styles.logo}>whisper.</Text>
          <Ionicons name="leaf" size={10} color={Colors.green.primary} style={styles.logoLeaf} />
        </View>
        <Text style={styles.tagline}>your safe sanctuary</Text>
      </View>

      {/* Right: Follow-up pill containing Bell icon */}
      <View style={styles.rightRow}>
        <TouchableOpacity style={styles.followUpBtn} onPress={onFollowUpPress} activeOpacity={0.7}>
          <Text style={styles.followUpText}>Follow-up</Text>
          <View style={styles.bellContainer}>
            <Ionicons name="notifications-outline" size={16} color={Colors.text.secondary} />
            {hasNotifications && <View style={styles.notifDot} />}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    backgroundColor: 'transparent',
  },
  logoBlock: {
    flexDirection: 'column',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  logo: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 26,
    color: Colors.green.primary,
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  logoLeaf: {
    marginLeft: 2,
    marginBottom: 5,
  },
  tagline: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: Colors.text.muted,
    marginTop: 1,
    letterSpacing: 0.1,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  followUpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.pill,
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border.soft,
    ...Shadows.sm,
  },
  followUpText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.text.secondary,
    marginRight: 8,
  },
  bellContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.green.primary,
    borderWidth: 1.5,
    borderColor: Colors.bg.card,
  },
});
