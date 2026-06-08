import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path, G, Ellipse, Defs, RadialGradient, Stop } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Shadows, CommonStyles } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const ONBOARDING_KEY = 'whisper_onboarding_complete';

export default function OnboardingScreen() {
  const router = useRouter();

  // Animation refs
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const cardFade = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Entrance animation sequence
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(fadeIn, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
      Animated.delay(150),
      Animated.parallel([
        Animated.timing(slideUp, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(cardFade, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(cardSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const handleGetStarted = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Soft warm gradient background */}
      <LinearGradient
        colors={['#FBF8F3', '#F3EAD9', '#EDE0CC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.4, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative SVG Background Art */}
      <View style={styles.bgArt} pointerEvents="none">
        <Svg width={width} height={height * 0.5} viewBox={`0 0 ${width} ${height * 0.5}`}>
          <Defs>
            <RadialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor="#F5D49E" stopOpacity="0.6" />
              <Stop offset="1" stopColor="#F5D49E" stopOpacity="0" />
            </RadialGradient>
          </Defs>

          {/* Large sun glow behind scene */}
          <Ellipse
            cx={width * 0.5}
            cy={height * 0.18}
            rx={width * 0.55}
            ry={width * 0.35}
            fill="url(#sunGlow)"
          />

          {/* Rolling hills (bottom) */}
          <Path
            d={`M 0 ${height * 0.38} Q ${width * 0.25} ${height * 0.28} ${width * 0.5} ${height * 0.35} Q ${width * 0.75} ${height * 0.42} ${width} ${height * 0.3} L ${width} ${height * 0.5} L 0 ${height * 0.5} Z`}
            fill="#D6C9AE"
            opacity={0.35}
          />
          <Path
            d={`M 0 ${height * 0.44} Q ${width * 0.3} ${height * 0.36} ${width * 0.6} ${height * 0.42} Q ${width * 0.8} ${height * 0.46} ${width} ${height * 0.38} L ${width} ${height * 0.5} L 0 ${height * 0.5} Z`}
            fill="#C9BBA0"
            opacity={0.25}
          />

          {/* Small tree silhouettes */}
          {/* Tree 1 */}
          <G transform={`translate(${width * 0.12}, ${height * 0.33})`}>
            <Path d="M 0 0 L -14 -40 L 14 -40 Z" fill="#8B9D77" opacity={0.5} />
            <Path d="M 0 -30 L -10 -60 L 10 -60 Z" fill="#7A8E66" opacity={0.5} />
            <Path d="M -2 0 L 2 0 L 2 8 L -2 8 Z" fill="#6B7B52" opacity={0.5} />
          </G>
          {/* Tree 2 */}
          <G transform={`translate(${width * 0.82}, ${height * 0.3})`}>
            <Path d="M 0 0 L -12 -36 L 12 -36 Z" fill="#8B9D77" opacity={0.4} />
            <Path d="M 0 -26 L -9 -52 L 9 -52 Z" fill="#7A8E66" opacity={0.4} />
            <Path d="M -2 0 L 2 0 L 2 7 L -2 7 Z" fill="#6B7B52" opacity={0.4} />
          </G>
          {/* Tree 3 (small, distant) */}
          <G transform={`translate(${width * 0.55}, ${height * 0.36})`}>
            <Path d="M 0 0 L -8 -26 L 8 -26 Z" fill="#8B9D77" opacity={0.3} />
            <Path d="M 0 -18 L -6 -38 L 6 -38 Z" fill="#7A8E66" opacity={0.3} />
          </G>

          {/* Flying birds */}
          <Path d={`M ${width * 0.2} ${height * 0.08} Q ${width * 0.22} ${height * 0.07} ${width * 0.24} ${height * 0.08}`} fill="none" stroke="#8B9D77" strokeWidth="1.5" opacity={0.4} />
          <Path d={`M ${width * 0.27} ${height * 0.06} Q ${width * 0.29} ${height * 0.05} ${width * 0.31} ${height * 0.06}`} fill="none" stroke="#8B9D77" strokeWidth="1.5" opacity={0.3} />
          <Path d={`M ${width * 0.7} ${height * 0.1} Q ${width * 0.72} ${height * 0.09} ${width * 0.74} ${height * 0.1}`} fill="none" stroke="#8B9D77" strokeWidth="1.5" opacity={0.35} />
        </Svg>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>

        {/* Logo Block */}
        <Animated.View style={[styles.logoBlock, { opacity: fadeIn, transform: [{ scale: logoScale }] }]}>
          <View style={styles.leafIcon}>
            <Ionicons name="leaf" size={28} color={Colors.green.primary} />
          </View>
          <Text style={styles.logoText}>whisper.</Text>
          <Text style={styles.logoSubtitle}>your safe sanctuary</Text>
        </Animated.View>

        {/* Welcome Card */}
        <Animated.View
          style={[
            styles.welcomeCard,
            {
              opacity: cardFade,
              transform: [{ translateY: cardSlide }],
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTag}>A QUIET PLACE FOR YOUR HEART</Text>
          </View>

          <Text style={styles.cardTitle}>You were made to be heard.</Text>

          <Text style={styles.cardBody}>
            Whisper is a gentle space to breathe, pray, reflect, and feel God's presence — even on the heaviest of days.
          </Text>

          <View style={styles.featureList}>
            {[
              { icon: 'chatbubble-ellipses-outline', text: 'Talk to Whisper, your AI companion' },
              { icon: 'book-outline',                text: 'Journal your heart and daily stories' },
              { icon: 'heart-outline',               text: 'Pray together with the community' },
              { icon: 'leaf-outline',                text: 'Daily morning & night devotions' },
            ].map((f) => (
              <View key={f.text} style={styles.featureRow}>
                <View style={styles.featureIconBox}>
                  <Ionicons name={f.icon as any} size={16} color={Colors.green.primary} />
                </View>
                <Text style={styles.featureText}>{f.text}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Get Started CTA */}
        <Animated.View style={[styles.ctaContainer, { opacity: cardFade, transform: [{ translateY: slideUp }] }]}>
          <TouchableOpacity style={styles.ctaBtn} onPress={handleGetStarted} activeOpacity={0.85}>
            <Text style={styles.ctaText}>enter whisper</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.ctaNote}>no account needed · always free</Text>
        </Animated.View>

        {/* Bottom Scripture */}
        <Animated.View style={[styles.bottomScripture, { opacity: cardFade }]}>
          <Text style={styles.scriptureText}>"Come to me, all you who are weary and burdened, and I will give you rest."</Text>
          <Text style={styles.scriptureRef}>MATTHEW 11:28</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  bgArt: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: height * 0.08,
    paddingBottom: Spacing.xl,
    justifyContent: 'space-between',
  },
  logoBlock: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  leafIcon: {
    width: 56,
    height: 56,
    borderRadius: Radius.circle,
    backgroundColor: Colors.green.faint,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.green.muted,
  },
  logoText: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 40,
    color: Colors.green.primary,
    letterSpacing: -1,
  },
  logoSubtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.text.muted,
    marginTop: -2,
    letterSpacing: 0.2,
  },
  welcomeCard: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border.default,
    ...Shadows.md,
  },
  cardHeader: {
    marginBottom: Spacing.xs,
  },
  cardTag: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: Colors.green.secondary,
  },
  cardTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 24,
    color: Colors.text.primary,
    lineHeight: 30,
    marginBottom: Spacing.sm,
  },
  cardBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  featureList: {
    gap: Spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIconBox: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: Colors.green.faint,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  featureText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.text.secondary,
    flex: 1,
  },
  ctaContainer: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green.primary,
    paddingVertical: 18,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.md,
    width: '100%',
    ...Shadows.md,
  },
  ctaText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 17,
    color: Colors.white,
    marginRight: Spacing.sm,
  },
  ctaNote: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: Colors.text.muted,
    marginTop: Spacing.sm,
  },
  bottomScripture: {
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  scriptureText: {
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 12,
    color: Colors.text.muted,
    textAlign: 'center',
    lineHeight: 17,
    marginBottom: 4,
  },
  scriptureRef: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    color: Colors.text.muted,
    letterSpacing: 0.8,
  },
});
