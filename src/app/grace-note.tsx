import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing, Shadows } from '../constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Background Assets
const MORNING_BGS = {
  plain_1: require('../../assets/grace_notes/plain_1.jpg'),
  plain_2: require('../../assets/grace_notes/plain_2.jpg'),
  plain_3: require('../../assets/grace_notes/plain_3.jpg'),
  card_1: require('../../assets/grace_notes/card_1.png'),
  card_2: require('../../assets/grace_notes/card_2.jpg'),
};

// We want to alternate: [Dark, Cream, Dark, Cream...]
const NIGHT_BGS = [
  { id: 'night_5', source: require('../../assets/grace_notes/night_5.jpg'), theme: 'dark' },
  { id: 'night_1', source: require('../../assets/grace_notes/night_1.jpg'), theme: 'cream' },
  { id: 'night_6', source: require('../../assets/grace_notes/night_6.jpg'), theme: 'dark' },
  { id: 'night_2', source: require('../../assets/grace_notes/night_2.jpg'), theme: 'cream' },
  { id: 'night_7', source: require('../../assets/grace_notes/night_7.jpg'), theme: 'dark' },
  { id: 'night_3', source: require('../../assets/grace_notes/night_3.jpg'), theme: 'cream' }, // Journal Page
  { id: 'night_4', source: require('../../assets/grace_notes/night_4.png'), theme: 'cream' },
];

export default function GraceNoteScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    type: 'morning' | 'night';
    title?: string;
    verse?: string;
    reference?: string;
    reflection?: string;
    message?: string;
    whisper?: string;
  }>();

  const isNight = params.type === 'night';
  const morningKeys = Object.keys(MORNING_BGS);
  
  const [bgIndex, setBgIndex] = useState(0);

  // Logic to get current background and theme
  const currentBg = isNight ? NIGHT_BGS[bgIndex % NIGHT_BGS.length] : { id: morningKeys[bgIndex % morningKeys.length], source: (MORNING_BGS as any)[morningKeys[bgIndex % morningKeys.length]], theme: 'cream' };
  const isDarkTheme = currentBg.theme === 'dark';
  const isJournalPage = currentBg.id === 'night_3';

  const nextBg = () => {
    const max = isNight ? NIGHT_BGS.length : morningKeys.length;
    setBgIndex((prev) => (prev + 1) % max);
  };

  // Content Logic:
  const mainText = isNight ? params.message : params.reflection;
  const subText = isNight ? null : params.verse;
  const reference = isNight ? null : params.reference;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground
        source={currentBg.source}
        style={styles.bgImage}
        resizeMode="cover"
      >
        {/* Scrim for Dark backgrounds to ensure white text pops */}
        {isDarkTheme && (
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)']}
            style={StyleSheet.absoluteFill}
          />
        )}

        <SafeAreaView style={styles.safeArea}>
          {/* Header Controls */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
              <Ionicons name="close" size={24} color={Colors.white} />
            </TouchableOpacity>
            
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={nextBg} style={styles.changeBgBtn}>
                <Ionicons name="color-palette-outline" size={20} color={Colors.white} />
                <Text style={styles.changeBgText}>change style</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* The Grace Note Content */}
          <View style={styles.contentWrapper}>
            {isNight ? (
              // Night Layout
              <View style={styles.nightContentContainer}>
                <Text style={[
                  styles.nightMainText,
                  isDarkTheme ? styles.textGlow : styles.textInk,
                  isJournalPage && styles.journalText
                ]}>
                  {mainText}
                </Text>
                
                <View style={styles.footerCenter}>
                  <Text style={[
                    styles.footerText,
                    isDarkTheme ? styles.footerGlow : styles.footerInk,
                    isJournalPage && styles.journalFooter
                  ]}>
                    whisper | your safe sanctuary
                  </Text>
                </View>
              </View>
            ) : (
              // Morning Layout (Always Cream Card style)
              <View style={currentBg.id.startsWith('plain') ? styles.graceCard : styles.overlayTextContainer}>
                <Text style={styles.mainText}>{mainText}</Text>
                <View style={styles.divider} />
                <Text style={styles.subText}>{subText}</Text>
                {reference && <Text style={styles.referenceText}>{reference}</Text>}
                
                <View style={styles.footer}>
                  <Text style={styles.footerTextBrand}>whisper | your safe sanctuary</Text>
                </View>
              </View>
            )}
          </View>

          {/* Sharing Instructions */}
          <View style={styles.instructionsContainer}>
            <View style={styles.instructionPill}>
              <Ionicons name="camera-outline" size={16} color={Colors.white} />
              <Text style={styles.instructionText}>Screenshot to share your Grace Note</Text>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  bgImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  changeBgBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    gap: 8,
  },
  changeBgText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.white,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  // --- NIGHT STYLES ---
  nightContentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  nightMainText: {
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 34,
    fontStyle: 'italic',
  },
  textGlow: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  textInk: {
    color: '#333333',
  },
  journalText: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  footerCenter: {
    marginTop: 60,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  footerGlow: {
    color: 'rgba(255,255,255,0.6)',
  },
  footerInk: {
    color: 'rgba(0,0,0,0.4)',
  },
  journalFooter: {
    color: 'rgba(0,0,0,0.3)',
  },
  // --- MORNING STYLES ---
  graceCard: {
    backgroundColor: '#FAF8F2',
    width: '100%',
    padding: 32,
    borderRadius: 4,
    ...Shadows.md,
    alignItems: 'center',
  },
  overlayTextContainer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  mainText: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 22,
    color: '#333',
    textAlign: 'center',
    lineHeight: 32,
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: '#D1C4B0',
    marginVertical: 20,
  },
  subText: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
  },
  referenceText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: '#888',
    marginTop: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    marginTop: 40,
    opacity: 0.6,
  },
  footerTextBrand: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: '#999',
    letterSpacing: 0.5,
  },
  instructionsContainer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  instructionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: Radius.pill,
    gap: 10,
  },
  instructionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.white,
  },
});
