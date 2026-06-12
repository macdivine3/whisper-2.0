import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing } from '../../constants/theme';

const LEAF_IMAGE = require('../../../svjs/leaf image.jpg');

export default function JournalVerseCard() {
  return (
    <View style={styles.verseContainer}>
      <View style={styles.verseCard}>
        <View style={styles.quoteIconBox}>
          <Text style={styles.quoteIconText}>“</Text>
        </View>
        <View style={styles.verseContent}>
          <Text style={styles.verseText}>
            "You keep track of all my sorrows.{'\n'}You have collected all my tears in your bottle."
          </Text>
          <Text style={styles.verseReference}>PSALM 56:8</Text>
        </View>
        <Image source={LEAF_IMAGE} style={styles.verseLeaf} resizeMode="cover" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  verseContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xxl,
  },
  verseCard: {
    backgroundColor: '#F5EFE6',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  quoteIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDDFCD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  quoteIconText: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 24,
    color: '#C9851A',
    lineHeight: 32,
  },
  verseContent: {
    flex: 1,
    zIndex: 1,
    paddingRight: 40,
  },
  verseText: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  verseReference: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    color: Colors.text.muted,
    marginTop: 12,
    letterSpacing: 1.0,
  },
  verseLeaf: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    width: 100,
    height: 100,
    opacity: 0.4,
    zIndex: 0,
  },
});
