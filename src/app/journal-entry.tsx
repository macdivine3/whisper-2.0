import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Colors, Radius, Shadows, Spacing } from '../constants/theme';
import { addEntry, moodPrompt, MOODS, moodColor } from '../lib/journal';
import { logMood } from '../lib/mood';

export default function JournalEntryScreen() {
  const router = useRouter();
  // Optional params: a reflection `prompt`, and an incoming `mood` carried over
  // from the Home screen so we don't ask the user how they feel twice.
  const { prompt, mood: incomingMood } = useLocalSearchParams<{
    prompt?: string;
    mood?: string;
  }>();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState<string>(
    incomingMood && (MOODS as readonly string[]).includes(incomingMood)
      ? incomingMood
      : 'peaceful'
  );
  const [saving, setSaving] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const canSave = body.trim().length > 0 && !saving;

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await addEntry({ title, body, mood });
    await logMood(mood, 'journal');
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.flex}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn} activeOpacity={0.6}>
            <Ionicons name="close" size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>new entry</Text>
          <TouchableOpacity
            onPress={handleSave}
            disabled={!canSave}
            style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]}
            activeOpacity={0.8}
          >
            <Text style={[styles.saveText, !canSave && styles.saveTextDisabled]}>save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          automaticallyAdjustKeyboardInsets
          // Keep the newest line above the keyboard as the entry grows.
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {/* Optional prompt nudge */}
          {prompt ? (
            <View style={styles.promptBanner}>
              <Ionicons name="sunny-outline" size={15} color={Colors.warning} />
              <Text style={styles.promptText}>{prompt}</Text>
            </View>
          ) : null}

          {/* Title — optional; auto-named by time of day if left blank */}
          <TextInput
            style={styles.titleInput}
            placeholder="title (optional)…"
            placeholderTextColor={Colors.text.muted}
            value={title}
            onChangeText={setTitle}
            maxLength={80}
          />

          {/* Gentle mood mirror — reflects the selected feeling back */}
          <Text style={styles.moodMirror}>{moodPrompt(mood)}</Text>

          {/* Mood selector */}
          <Text style={styles.moodLabel}>HOW ARE YOU FEELING?</Text>
          <View style={styles.moodRow}>
            {MOODS.map((m) => {
              const active = mood === m;
              const color = moodColor(m);
              return (
                <TouchableOpacity
                  key={m}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setMood(m);
                  }}
                  style={[
                    styles.moodChip,
                    active && { backgroundColor: color + '20', borderColor: color },
                  ]}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.moodChipText, active && { color }]}>{m}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Body */}
          <TextInput
            style={styles.bodyInput}
            placeholder="pour it all out here. this is your safe place…"
            placeholderTextColor={Colors.text.muted}
            value={body}
            onChangeText={setBody}
            multiline
            textAlignVertical="top"
            autoFocus={!prompt}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.default,
  },
  headerBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 18,
    color: Colors.green.primary,
  },
  saveBtn: {
    backgroundColor: Colors.green.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    ...Shadows.sm,
  },
  saveBtnDisabled: {
    backgroundColor: Colors.green.faint,
    ...({ elevation: 0 } as object),
    shadowOpacity: 0,
  },
  saveText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
    color: Colors.white,
  },
  saveTextDisabled: {
    color: Colors.text.muted,
  },
  scroll: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  promptBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F9F1E6',
    borderRadius: Radius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  promptText: {
    flex: 1,
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 13,
    color: Colors.text.primary,
    lineHeight: 18,
  },
  titleInput: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 24,
    color: Colors.text.primary,
    paddingVertical: Spacing.xs,
    marginBottom: Spacing.md,
  },
  moodMirror: {
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  moodLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1.2,
    color: Colors.green.primary,
    marginBottom: Spacing.sm,
  },
  moodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: Spacing.lg,
  },
  moodChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.border.default,
    backgroundColor: Colors.bg.secondary,
  },
  moodChipText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors.text.muted,
  },
  bodyInput: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.text.primary,
    lineHeight: 24,
    minHeight: 240,
  },
});
