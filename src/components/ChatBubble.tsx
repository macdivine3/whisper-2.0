import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Shadows } from '../constants/theme';

interface ChatBubbleProps {
  message: string;
  time: string;
  senderName?: string;
  isSeen?: boolean;
}

export default function ChatBubble({
  message,
  time,
  senderName = 'YOU',
  isSeen = true,
}: ChatBubbleProps) {
  return (
    <View style={styles.container}>
      {/* Sender Header */}
      <Text style={styles.senderHeader}>
        {senderName}  <Text style={styles.timeText}>{time}</Text>
      </Text>
      
      {/* Bubble Container */}
      <View style={styles.bubble}>
        <Text style={styles.messageText}>{message}</Text>
        
        {/* Status Row */}
        {isSeen && (
          <View style={styles.statusRow}>
            <Ionicons name="checkmark" size={10} color={Colors.green.secondary} style={styles.checkIcon} />
            <Text style={styles.seenText}>seen</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
    paddingHorizontal: Spacing.lg,
    alignSelf: 'stretch',
  },
  senderHeader: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    color: Colors.text.secondary,
    letterSpacing: 0.8,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  timeText: {
    fontFamily: 'Inter_400Regular',
    color: Colors.text.muted,
    fontSize: 9,
    textTransform: 'none',
  },
  bubble: {
    backgroundColor: Colors.green.faint,
    borderRadius: Radius.sm,
    borderLeftWidth: 2,
    borderLeftColor: Colors.green.primary,
    paddingVertical: Spacing.xs,
    paddingHorizontal: 12,
    ...Shadows.sm,
    position: 'relative',
  },
  messageText: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 20,
    paddingBottom: Spacing.xs,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -4,
  },
  checkIcon: {
    marginRight: 2,
  },
  seenText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 8.5,
    color: Colors.text.muted,
  },
});
