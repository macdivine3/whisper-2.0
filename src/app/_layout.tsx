import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { NotoSerif_400Regular, NotoSerif_700Bold, NotoSerif_400Regular_Italic } from '@expo-google-fonts/noto-serif';

SplashScreen.preventAutoHideAsync();

const ONBOARDING_KEY = 'whisper_onboarding_complete';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [onboardingChecked, setOnboardingChecked] = useState(false);

  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
    NotoSerif_400Regular_Italic,
  });

  // Hide splash once fonts are ready
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Check onboarding status after fonts are ready
  useEffect(() => {
    if (!loaded && !error) return;

    const checkOnboarding = async () => {
      const complete = await AsyncStorage.getItem(ONBOARDING_KEY);
      if (!complete) {
        // First time — send to onboarding
        router.replace('/onboarding');
      }
      setOnboardingChecked(true);
    };

    checkOnboarding();
  }, [loaded, error]);

  if ((!loaded && !error) || !onboardingChecked) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
