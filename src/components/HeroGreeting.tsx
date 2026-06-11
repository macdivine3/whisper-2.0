import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing } from '../constants/theme';

const SUN_IMAGE = require('../../assets/images/sun-glow.png');

interface HeroGreetingProps {
  name?: string;
  subtitle?: string;
}

export default function HeroGreeting({
  name = 'Mac Divine',
  subtitle = "be still. you're not alone.",
}: HeroGreetingProps) {
  return (
    <View style={styles.container}>
      {/* Left: Text - Normal weight, Sentence case, Charcoal */}
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Good morning, {name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.graphicContainer} pointerEvents="none">
        {/* EDITABLE SUN IMAGE: Adjust width, height, top, right in styles.sunImage below */}
        <Image
          source={SUN_IMAGE}
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
    paddingBottom: Spacing.xs, // Reduced padding
    minHeight: 110,
    position: 'relative',
  },
  textContainer: {
    flex: 1,
    zIndex: 2,
    paddingRight: 60,
    marginTop: 4,
  },
  greeting: {
    fontFamily: 'NotoSerif_400Regular', // Normal weight
    fontSize: 22, // Reduced font size
    color: '#333333', // Charcoal
    lineHeight: 28, // Adjusted line height
  },
  subtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.text.muted,
    marginTop: 4,
  },
  graphicContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 160,
    height: 140,
    zIndex: -1, // Put it behind the text and cards
  },
  // EDIT THE SUN POSITION AND SIZE HERE
  sunImage: {
    position: 'absolute',

    // --- 1. MOVE IT ---
    // Decrease 'top' (e.g., -10) to move UP. Increase (e.g., 20) to move DOWN.
    top: 35,
    // Decrease 'right' (e.g., 20) to move RIGHT. Increase (e.g., 60) to move LEFT.
    right: 0.7,

    // --- 2. BASE SIZE --- (Best to leave these alone to keep the ratio)
    width: 200,
    height: 120,

    // --- 3. MAKE IT BIGGER/SMALLER ---
    // Change this number to resize WITHOUT moving it! 
    // Example: 1.5 is 50% bigger, 0.8 is smaller, 2.0 is double size.
    transform: [{ scale: 3.5 }],

    // --- 4. TRANSPARENCY (OPACITY) ---
    // 1.0 is fully solid, 0.5 is half see-through, 0.0 is invisible
    opacity: 0.7,
  },
});
