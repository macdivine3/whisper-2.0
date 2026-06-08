import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Defs, RadialGradient, LinearGradient, Stop } from 'react-native-svg';
import { Colors, Spacing } from '../constants/theme';

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

      <View style={styles.graphicContainer} pointerEvents="none">
        <Svg width={140} height={120} viewBox="0 0 140 120" style={styles.svg}>
          <Defs>
            {/* Sun Gradient */}
            <RadialGradient id="sunRad" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#FFD97A" stopOpacity="1" />
              <Stop offset="60%" stopColor="#F5B942" stopOpacity="1" />
              <Stop offset="100%" stopColor="#E8993A" stopOpacity="0.85" />
            </RadialGradient>
            
            {/* Cloud Gradient */}
            <LinearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#F5EDDF" stopOpacity="0.9" />
              <Stop offset="100%" stopColor="#F0E3D3" stopOpacity="0.5" />
            </LinearGradient>
          </Defs>

          {/* Sun */}
          <Circle cx="80" cy="50" r="35" fill="url(#sunRad)" />

          {/* Birds */}
          <Path d="M 105 20 Q 108 16 111 20 Q 114 16 117 20" fill="none" stroke={Colors.text.muted} strokeWidth="1.5" strokeLinecap="round" />
          <Path d="M 115 32 Q 117 29 119 32 Q 121 29 123 32" fill="none" stroke={Colors.text.muted} strokeWidth="1.2" strokeLinecap="round" />

          {/* Soft Overlapping Clouds resting at the bottom */}
          {/* Back Cloud Layer */}
          <Path 
            d="M 10 100 Q 35 75 60 90 Q 85 70 115 90 Q 130 80 145 100 L 145 120 L 10 120 Z" 
            fill="url(#cloudGrad)" 
            opacity="0.7" 
          />
          
          {/* Front Cloud Layer */}
          <Path 
            d="M 30 110 Q 60 85 90 100 Q 120 80 150 110 L 150 120 L 30 120 Z" 
            fill={Colors.bg.primary} 
            opacity="0.9" 
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Spacing.lg,
    paddingRight: 0,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
    minHeight: 110,
    position: 'relative',
    // Removed overflow: hidden so the image can spill out if needed
  },
  textContainer: {
    flex: 1,
    zIndex: 2,
    paddingRight: 120, // Keep text away from the sun
  },
  greeting: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 30,
    color: Colors.text.primary,
    lineHeight: 36,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.text.muted,
    marginTop: 4,
  },
  graphicContainer: {
    position: 'absolute',
    right: -10,
    bottom: -15, // Pushes it down so clouds rest flush with WhisperCard
    width: 140, 
    height: 120,
    zIndex: 1,
  },
  svg: {
    overflow: 'visible',
  },
});
