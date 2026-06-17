import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
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

const NIGHT_BGS = {
  night_1: require('../../assets/grace_notes/night_1.jpg'),
  night_2: require('../../assets/grace_notes/night_2.jpg'),
  night_3: require('../../assets/grace_notes/night_3.jpg'),
  night_4: require('../../assets/grace_notes/night_4.png'),
};

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
  const backgrounds = isNight ? NIGHT_BGS : MORNING_BGS;
  const bgKeys = Object.keys(backgrounds);

  const [bgIndex, setBgIndex] = useState(0);
  const currentBgKey = bgKeys[bgIndex];

  // UI Logic
  const isPlainMorning = !isNight && currentBgKey.startsWith('plain');
  const isJournalNight = isNight && currentBgKey === 'night_3';

  const nextBg = () => setBgIndex((prev) => (prev + 1) % bgKeys.length);

  // Content Logic:
  // Morning: Reflection (Main) -> Verse (Sub) -> Reference
  // Night: Message (Main) only
  const mainText = isNight ? params.message : params.reflection;
  const subText = isNight ? null : params.verse;
  const reference = isNight ? null : params.reference;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground
        source={(backgrounds as any)[currentBgKey]}
        style={styles.bgImage}
        resizeMode="cover"
      >
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
              // Night Layout: Centered immersive text
              <View style={styles.nightContentContainer}>
                <Text style={[
                  styles.nightMainText,
                  isJournalNight && styles.journalText // Dark text for the journal page image
                ]}>
                  {mainText}
                </Text>
                
                <View style={styles.footerCenter}>
                  <Text style={[
                    styles.footerText,
                    isJournalNight && styles.journalFooter
                  ]}>
                    whisper | your safe sanctuary
                  </Text>
                </View>
              </View>
            ) : (
              // Morning Layouts
              isPlainMorning ? (
                // Logic B: Plain Background -> Add a soft card
                <View style={styles.graceCard}>
                  <Text style={styles.mainText}>{mainText}</Text>
                  <View style={styles.divider} />
                  <Text style={styles.subText}>{subText}</Text>
                  {reference && <Text style={styles.referenceText}>{reference}</Text>}
                  
                  <View style={styles.footer}>
                    <Text style={styles.footerText}>whisper | your safe sanctuary</Text>
                  </View>
                </View>
              ) : (
                // Logic A: Pre-designed Card -> Overlay text directly
                <View style={styles.overlayTextContainer}>
                  <Text style={styles.mainTextDark}>{mainText}</Text>
                  <View style={styles.dividerDark} />
                  <Text style={styles.subTextDark}>{subText}</Text>
                  {reference && <Text style={styles.referenceTextDark}>{reference}</Text>}
                  
                  <View style={styles.footerDark}>
                    <Text style={styles.footerTextDark}>whisper | your safe sanctuary</Text>
                  </View>
                </View>
              )
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
    color: '#F0F4EF', // Soft glowing white
    textAlign: 'center',
    lineHeight: 34,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  journalText: {
    color: '#333333', // Ink color for the journal page
    textShadowRadius: 0,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  footerCenter: {
    marginTop: 60,
    alignItems: 'center',
  },
  journalFooter: {
    color: 'rgba(0,0,0,0.4)',
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
  footerText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: '#999',
    letterSpacing: 0.5,
  },
  overlayTextContainer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    marginTop: 40,
  },
  mainTextDark: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 20,
    color: '#2D3428',
    textAlign: 'center',
    lineHeight: 30,
  },
  dividerDark: {
    width: 30,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 16,
  },
  subTextDark: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    color: '#4A5245',
    textAlign: 'center',
    lineHeight: 22,
  },
  referenceTextDark: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: 'rgba(0,0,0,0.4)',
    marginTop: 8,
    textTransform: 'uppercase',
  },
  footerDark: {
    marginTop: 30,
    opacity: 0.4,
  },
  footerTextDark: {
    fontFamily: 'Inter_500Medium',
    fontSize: 9,
    color: '#000',
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
