import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Radius, Shadows } from '../../constants/theme';

// Import Components
import HomeHeader from '../../components/HomeHeader';
import HeroGreeting from '../../components/HeroGreeting';
import WhisperCard from '../../components/WhisperCard';
import StoryCard from '../../components/StoryCard';
import MoodGrid from '../../components/MoodGrid';
import NightWhisperCard from '../../components/NightWhisperCard';

// Import Data
import { morningWhispers, dailyStories } from '../../data/dailyContent';

export default function HomeScreen() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Daily seed helper — same content for the whole day
  const getDailyIndex = (length: number) => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    );
    return dayOfYear % length;
  };

  // Get daily content
  const dailyMorningWhisper = morningWhispers[getDailyIndex(morningWhispers.length)];
  const dailyStory = dailyStories[getDailyIndex(dailyStories.length)];

  const handleMoodSelect = (moodId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedMood(moodId);
  };

  const handleContinue = () => {
    if (selectedMood) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    router.push('/whispers');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg.primary} />

      <HomeHeader onFollowUpPress={() => router.push('/profile')} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Section */}
        <HeroGreeting name="David" />

        {/* Morning Whisper Card */}
        <WhisperCard
          type="morning"
          title={dailyMorningWhisper.title}
          verse={dailyMorningWhisper.verse}
          reference={dailyMorningWhisper.reference}
          reflection={dailyMorningWhisper.reflection}
        />

        {/* Story Card */}
        <StoryCard
          title={dailyStory.title}
          excerpt={dailyStory.deepComment}
          onPress={() => router.push('/journal')}
        />

        {/* Mood Selector Grid */}
        <MoodGrid
          selectedMood={selectedMood}
          onSelectMood={handleMoodSelect}
        />

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueButton, selectedMood ? styles.continueButtonActive : null]}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>
            {selectedMood ? `talk about feeling ${selectedMood}` : 'continue with whisper'}
          </Text>
          <Feather name="arrow-right" size={20} color={Colors.white} />
        </TouchableOpacity>

        {/* Bottom padding to offset the floating tab bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green.secondary,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    paddingVertical: 18,
    borderRadius: 99,
    gap: 10,
    ...Shadows.md,
  },
  continueButtonActive: {
    backgroundColor: Colors.green.primary,
  },
  continueText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: Colors.white,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 140,
  },
});
