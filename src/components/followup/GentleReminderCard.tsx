import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing } from '../../constants/theme';

const CANDLE_IMAGE = require('../../../svjs/candle-Photoroom.png');

export default function GentleReminderCard() {
  return (
    <View style={styles.reminderCard}>
      <View style={styles.reminderTextContent}>
        <View style={styles.reminderTagRow}>
          <Text style={styles.reminderTag}>a gentle reminder</Text>
          <Ionicons name="leaf" size={10} color={Colors.green.secondary} style={{ marginLeft: 6 }} />
        </View>
        <Text style={styles.reminderText}>
          You don't have to carry it all today.{'\n'}One breath. One step. I'm here.
        </Text>
      </View>
      <Image source={CANDLE_IMAGE} style={styles.candleImage} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  reminderCard: {
    flexDirection: 'row',
    backgroundColor: '#EAEBE3',
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E3D8',
  },
  reminderTextContent: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  reminderTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  reminderTag: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1.0,
    color: Colors.green.primary,
  },
  reminderText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors.text.primary,
    lineHeight: 18,
  },
  candleImage: {
    width: 50,
    height: 50,
    opacity: 0.7,
    transform: [
      { scale: 3.5 },
      { translateX: 0 },
      { translateY: 0 }
    ],
  },
});
