import { Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
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

        <Svg width={160} height={140} viewBox="0 0 160 140" style={styles.svg}>
          <Defs>
            <LinearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#F5EDDF" stopOpacity="0.95" />
              <Stop offset="100%" stopColor="#F0E3D3" stopOpacity="0.6" />
            </LinearGradient>
          </Defs>

          <Path d="M 125 30 Q 128 26 131 30 Q 134 26 137 30" fill="none" stroke={Colors.text.muted} strokeWidth="1.2" strokeLinecap="round" opacity={0.6} />
          <Path d="M 135 42 Q 137 39 139 42 Q 141 39 143 42" fill="none" stroke={Colors.text.muted} strokeWidth="1.0" strokeLinecap="round" opacity={0.5} />

          <Path
            d="M 10 120 Q 40 90 70 110 Q 100 80 135 110 Q 155 95 175 120 L 175 140 L 10 140 Z"
            fill="url(#cloudGrad)"
            opacity="0.8"
          />

          <Path
            d="M 30 130 Q 70 100 110 120 Q 140 95 175 130 L 175 140 L 30 140 Z"
            fill={Colors.bg.primary}
            opacity="1.0"
          />
        </Svg>
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
    fontSize: 26,
    color: '#333333', // Charcoal
    lineHeight: 32,
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
    zIndex: 1,
  },
  // EDIT THE SUN POSITION AND SIZE HERE
  sunImage: {
    position: 'absolute',
    top: 8,
    right: 4,
    width: 60,
    height: 60,
  },
  svg: {
    overflow: 'visible',
  },
});
