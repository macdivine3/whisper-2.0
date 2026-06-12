import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Radius, Spacing } from '../../constants/theme';

const HEART_IMAGE = require('../../../svjs/fainted heart-Photoroom.png');

interface Props {
  selectedFeeling: string | null;
  onSelectFeeling: (feeling: string) => void;
}

export default function CheckInCard({ selectedFeeling, onSelectFeeling }: Props) {
  return (
    <View style={styles.checkInCard}>
      <View style={styles.checkInTextContent}>
        <Text style={styles.checkInTag}>TODAY'S CHECK-IN</Text>
        <Text style={styles.checkInTitle}>How are you feeling{'\n'}since we last talked?</Text>
        <Text style={styles.checkInSub}>Your heart matters. I'm listening.</Text>
      </View>

      <Image source={HEART_IMAGE} style={styles.heartImage} resizeMode="contain" />

      {/* Feeling Pills: 3 on top, 2 on bottom */}
      <View style={styles.feelingPillsContainer}>
        <View style={styles.feelingRow}>
          <TouchableOpacity
            style={[
              styles.feelingPill,
              { backgroundColor: '#EAEBE3' },
              selectedFeeling === 'better' && { borderWidth: 1.5, borderColor: Colors.green.primary },
            ]}
            onPress={() => onSelectFeeling('better')}
            activeOpacity={0.7}
          >
            <Ionicons name="happy-outline" size={14} color={Colors.green.primary} style={{ marginRight: 4 }} />
            <Text style={[styles.feelingText, { color: Colors.green.primary }]} numberOfLines={1}>
              a little better
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.feelingPill,
              { backgroundColor: '#FDF0E1' },
              selectedFeeling === 'same' && { borderWidth: 1.5, borderColor: '#C9851A' },
            ]}
            onPress={() => onSelectFeeling('same')}
            activeOpacity={0.7}
          >
            <Ionicons name="reorder-two-outline" size={14} color="#C9851A" style={{ marginRight: 4 }} />
            <Text style={[styles.feelingText, { color: '#C9851A' }]} numberOfLines={1}>
              the same
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.feelingPill,
              { backgroundColor: '#FBE8E8' },
              selectedFeeling === 'notgood' && { borderWidth: 1.5, borderColor: '#D15D5D' },
            ]}
            onPress={() => onSelectFeeling('notgood')}
            activeOpacity={0.7}
          >
            <Ionicons name="sad-outline" size={14} color="#D15D5D" style={{ marginRight: 4 }} />
            <Text style={[styles.feelingText, { color: '#D15D5D' }]} numberOfLines={1}>
              not so good
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.feelingRow}>
          <TouchableOpacity
            style={[
              styles.feelingPill,
              { backgroundColor: '#EBE6F3' },
              selectedFeeling === 'overwhelmed' && { borderWidth: 1.5, borderColor: '#816CA8' },
            ]}
            onPress={() => onSelectFeeling('overwhelmed')}
            activeOpacity={0.7}
          >
            <Ionicons name="rainy-outline" size={14} color="#816CA8" style={{ marginRight: 4 }} />
            <Text style={[styles.feelingText, { color: '#816CA8' }]} numberOfLines={1}>
              still overwhelmed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.feelingPill,
              { backgroundColor: '#FAF8F5', borderWidth: 1, borderColor: '#E8E2D8' },
              selectedFeeling === 'something' && { borderColor: Colors.green.primary },
            ]}
            onPress={() => onSelectFeeling('something')}
            activeOpacity={0.7}
          >
            <Ionicons name="leaf-outline" size={14} color={Colors.green.primary} style={{ marginRight: 4 }} />
            <Text style={[styles.feelingText, { color: Colors.text.primary }]} numberOfLines={1}>
              something else
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkInCard: {
    backgroundColor: '#FAF5EA',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  checkInTextContent: {
    zIndex: 1,
    marginBottom: Spacing.md,
    width: '65%',
  },
  checkInTag: {
    fontFamily: 'Inter_700Bold',
    color: Colors.green.primary,
    fontSize: 10,
    letterSpacing: 1.0,
    marginBottom: 8,
  },
  checkInTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 18,
    color: Colors.text.primary,
    lineHeight: 24,
    marginBottom: 6,
  },
  checkInSub: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: Colors.text.secondary,
  },
  heartImage: {
    position: 'absolute',

    // MOVE IMAGE: Change right/top
    right: -0.1,
    top: 19,

    // BASE SIZE
    width: 150,
    height: 120,
    zIndex: 0,

    // CUSTOMIZE OPACITY (0.0 to 1.0)
    opacity: 0.65,

    // INCREASE SIZE WITHOUT MOVING: Change scale (e.g., 1.2 is 20% bigger)
    transform: [{ scale: 2.5 }],
  },
  feelingPillsContainer: {
    gap: 8,
    zIndex: 1,
  },
  feelingRow: {
    flexDirection: 'row',
    gap: 8,
  },
  feelingPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 8,
  },
  feelingText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
  },
});
