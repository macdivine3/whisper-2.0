import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing } from '../constants/theme';

const SUN_GLOW = require('../../assets/images/sun-glow.png');

interface HeroGreetingProps {
  name?: string;
  subtitle?: string;
}

export default function HeroGreeting({
  name = 'David',
  subtitle = "be still. you're not alone.",
}: HeroGreetingProps) {
  return (
    <View style={styles.container}>
      {/* Left: Text */}
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>good morning, {name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.graphicWrapper} pointerEvents="none">
        {/* Glow Sun Image */}
        <Image
          source={SUN_GLOW}
          style={styles.sunImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    marginBottom: 20,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    paddingTop: 8,
  },
  greeting: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text.primary,
    lineHeight: 34,
  },
  subtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 6,
  },
  graphicWrapper: {
    width: 140,
    height: 120,
    marginRight: -20,
    marginTop: -12,
  },
  sunImage: {
    width: '100%',
    height: '100%',
  },
});