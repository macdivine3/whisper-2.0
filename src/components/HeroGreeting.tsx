import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing } from '../constants/theme';

const SUN_IMAGE = require('../../assets/images/sun-glow.png');
const CANDLE_IMAGE = require('../../svjs/candle-Photoroom.png');
const BULB_IMAGE = require('../../svjs/Gemini_Generated_Image_x8cy4kx8cy4kx8cy-Photoroom.png');

interface HeroGreetingProps {
  name?: string;
  subtitle?: string;
}

type Period = 'morning' | 'afternoon' | 'evening' | 'night';

// Warm, varied greeting phrases per part of day. Each reads naturally with
// ", {name}" appended — so the greeting feels alive, not robotic.
const GREETINGS: Record<Period, string[]> = {
  morning: ['Good morning', 'A gentle morning', 'Grace this morning'],
  afternoon: ['Good afternoon', 'A calm afternoon', 'Grace this afternoon'],
  evening: ['Good evening', 'A peaceful evening', 'Grace this evening'],
  night: ['Good night', 'Rest now', 'Peace tonight'],
};

// Gentle sub-lines that rotate day to day.
const SUBTITLES = [
  "be still. you're not alone.",
  'you were made to be heard.',
  'one breath at a time.',
  "you're safe here.",
  'He is near to you today.',
  "rest. you don't have to carry it all.",
];

function getPeriod(hour: number): Period {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

// Day-of-year seed so the chosen phrases stay stable through the day but
// change from one day to the next.
function dayOfYear(): number {
  const now = new Date();
  return Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
}

export default function HeroGreeting({ name = 'Mac Divine', subtitle }: HeroGreetingProps) {
  const hour = new Date().getHours();
  const period = getPeriod(hour);
  const seed = dayOfYear();

  // SET THESE TO 'true' TO TEST NIGHT MODE OR BULB DISPLAY
  const FORCE_NIGHT = false; 
  const FORCE_BULB = false;

  const greetingPool = GREETINGS[period];
  const greeting = greetingPool[seed % greetingPool.length];
  // Offset the subtitle so it doesn't always pair with the same greeting.
  const line = subtitle ?? SUBTITLES[(seed + 3) % SUBTITLES.length];

  // Sun by day, candle/bulb for the wind-down hours.
  const isNight = FORCE_NIGHT || (period === 'evening' || period === 'night');

  // Alternating logic: Bulb on even days, Candle on odd days
  const isBulbDay = FORCE_BULB || seed % 2 === 0;
  const nightSource = isBulbDay ? BULB_IMAGE : CANDLE_IMAGE;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>{greeting}, {name}</Text>
        <Text style={styles.subtitle}>{line}</Text>
      </View>

      <View style={styles.graphicContainer} pointerEvents="none">
        <Image
          source={isNight ? nightSource : SUN_IMAGE}
          style={
            !isNight
              ? styles.sunImage
              : (isBulbDay ? styles.bulbImage : styles.candleImage)
          }
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
    paddingBottom: Spacing.xs,
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
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 19,
    color: '#333333',
    lineHeight: 28,
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
    zIndex: -1,
  },
  // Sun (day)
  sunImage: {
    position: 'absolute',
    top: 35,
    right: 0.7,
    width: 200,
    height: 120,
    transform: [{ scale: 3.5 }],
    opacity: 0.7,
  },
  // Candle (night option A)
  candleImage: {
    position: 'absolute',
    top: 6,
    right: 24,
    width: 110,
    height: 130,
    transform: [{ scale: 1.15 }],
    opacity: 0.85,
  },
  // Bulb (night option B)
  bulbImage: {
    position: 'absolute',
    top: 10,       // NEGATIVE moves it UP, POSITIVE moves it DOWN
    right: 20,     // HIGHER moves it LEFT, LOWER moves it RIGHT
    width: 100,    // INCREASE to make BIGGER
    height: 120,   // INCREASE to make BIGGER
    opacity: 0.55, // 0.0 to 1.0 (Visibility)
    transform: [{ scale: 1.2 }], // Scaling without moving
  },
});
