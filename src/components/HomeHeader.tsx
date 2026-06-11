import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Shadows } from '../constants/theme';

const LOGO_IMAGE = require('../../assets/images/whisper logo-Photoroom.png');

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
      {/* Left: Logo Image + Tagline */}
      <View style={styles.logoBlock}>
        <Image source={LOGO_IMAGE} style={styles.logoImage} resizeMode="contain" />
        <Text style={styles.tagline}>your safe sanctuary</Text>
      </View>

      {/* Right: Follow-up pill containing Bell icon */}
      <View style={styles.rightRow}>
        <TouchableOpacity style={styles.followUpBtn} onPress={onFollowUpPress} activeOpacity={0.7}>
          <Text style={styles.followUpText}>Follow-up</Text>
          <View style={styles.bellContainer}>
            <Ionicons name="notifications-outline" size={18} color={Colors.text.primary} />
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
    paddingBottom: Spacing.xs,
    backgroundColor: 'transparent',
  },
  logoBlock: {
    flexDirection: 'column',
  },
  logoImage: {
    width: 120,
    height: 36,
  },
  tagline: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: Colors.text.muted,
    marginTop: -4,
    fontStyle: 'italic',
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followUpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.pill,
    paddingLeft: 18,
    paddingRight: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border.soft,
    ...Shadows.sm,
  },
  followUpText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
    color: Colors.text.primary,
    marginRight: 10,
    letterSpacing: -0.2,
  },
  bellContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#D15D5D',
    borderWidth: 1.5,
    borderColor: Colors.bg.card,
  },
});
