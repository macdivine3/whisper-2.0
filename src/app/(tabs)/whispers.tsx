import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Spacing, Radius, Shadows } from '../../constants/theme';

// Components
import ChatBubble from '../../components/ChatBubble';
import AIMessage from '../../components/AIMessage';
import ScriptureCard from '../../components/ScriptureCard';
import PrayerCard from '../../components/PrayerCard';
import TypingIndicator from '../../components/TypingIndicator';

// Data + voice
import {
  ChatMessage,
  ChatSession,
  createSession,
  addMessage,
  getSessions,
  getMessages,
} from '../../lib/chat';
import { getOpener, getWhisperReply } from '../../lib/whisperVoice';
import { getPrayer, Prayer } from '../../lib/prayers';

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function WhispersScreen() {
  const router = useRouter();
  const { mood } = useLocalSearchParams<{ mood?: string }>();
  const scrollRef = useRef<ScrollView>(null);
  const initialized = useRef(false);

  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [pastSessions, setPastSessions] = useState<ChatSession[]>([]);
  const [aboutOpen, setAboutOpen] = useState(false);

  // --- start a brand-new conversation with the mood-aware opener ----------
  const startNewSession = async (openingMood?: string | null) => {
    const s = await createSession(openingMood);
    const opener = await addMessage(s.id, 'whisper', getOpener(openingMood));
    setSession(s);
    setMessages([opener]);
  };

  // First mount: open a fresh session using the mood we arrived with.
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    startNewSession(mood ?? null);
  }, []);

  const scrollToEnd = () =>
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);

  // --- send a message -----------------------------------------------------
  const handleSend = async () => {
    const text = input.trim();
    if (!text || !session) return;
    setInput('');

    const userMsg = await addMessage(session.id, 'user', text);
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    scrollToEnd();

    const reply = await getWhisperReply([...messages, userMsg], session.openingMood);
    // Unhurried: let the typing dots breathe before the reply lands.
    setTimeout(async () => {
      const wMsg = await addMessage(session.id, 'whisper', reply);
      setIsTyping(false);
      setMessages((prev) => [...prev, wMsg]);
      scrollToEnd();
    }, 1500);
  };

  // --- offer a prayer (user-triggered in L1; Claude-triggered in L2) ------
  const handlePray = async () => {
    if (!session) return;
    const prayer = getPrayer(session.openingMood);
    const pMsg = await addMessage(session.id, 'prayer', undefined, prayer);
    setMessages((prev) => [...prev, pMsg]);
    scrollToEnd();
  };

  // --- past chats menu ----------------------------------------------------
  const openMenu = async () => {
    setMenuOpen(true);
    setPastSessions(await getSessions());
  };

  const openPast = async (s: ChatSession) => {
    setMenuOpen(false);
    const msgs = await getMessages(s.id);
    setSession(s);
    setMessages(msgs);
    scrollToEnd();
  };

  const handleNewChat = async () => {
    setMenuOpen(false);
    await startNewSession(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.6}>
            <Ionicons name="chevron-back" size={24} color={Colors.text.secondary} />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.logo}>whisper.</Text>
            <Text style={styles.tagline}>your safe sanctuary</Text>
          </View>

          <View style={styles.rightHeaderActions}>
            <TouchableOpacity style={styles.whatIsBtn} activeOpacity={0.7} onPress={() => setAboutOpen(true)}>
              <Text style={styles.whatIsText}>what is whisper?</Text>
              <Ionicons name="leaf" size={10} color={Colors.green.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreBtn} activeOpacity={0.6} onPress={openMenu}>
              <Ionicons name="ellipsis-vertical" size={18} color={Colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Message thread */}
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          <View style={styles.dateSeparatorContainer}>
            <View style={styles.dateSeparatorPill}>
              <Text style={styles.dateSeparatorText}>today</Text>
            </View>
          </View>

          {messages.map((msg, i) => {
            if (msg.role === 'user') {
              return <ChatBubble key={msg.id} message={msg.text || ''} time={formatTime(msg.createdAt)} />;
            }
            if (msg.role === 'whisper') {
              return (
                <AIMessage
                  key={msg.id}
                  message={msg.text || ''}
                  time={formatTime(msg.createdAt)}
                  showDecorativeLeaf={i === 0}
                />
              );
            }
            if (msg.role === 'scripture') {
              return (
                <ScriptureCard key={msg.id} verse={msg.meta?.verse} reference={msg.meta?.reference} />
              );
            }
            if (msg.role === 'prayer') {
              return <PrayerCard key={msg.id} prayer={msg.meta as Prayer} />;
            }
            return null;
          })}

          {isTyping && <TypingIndicator />}
        </ScrollView>

        {/* Input bar */}
        <View style={styles.footer}>
          {/* Persistent, user-initiated prayer. Whisper-initiated (discerned)
              prayer offers arrive in L2. */}
          <TouchableOpacity style={styles.prayBtn} onPress={handlePray} activeOpacity={0.8}>
            <Ionicons name="leaf" size={13} color={Colors.green.primary} />
            <Text style={styles.prayBtnText}>pray with me</Text>
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <Ionicons name="leaf-outline" size={18} color={Colors.green.secondary} style={styles.inputLeaf} />
            <TextInput
              style={styles.textInput}
              placeholder="message whisper..."
              placeholderTextColor={Colors.text.muted}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: input.trim() ? Colors.green.primary : Colors.green.muted }]}
              onPress={handleSend}
              disabled={!input.trim()}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-up" size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Past conversations menu */}
      <Modal visible={menuOpen} transparent animationType="fade" onRequestClose={() => setMenuOpen(false)}>
        <Pressable style={styles.menuOverlay} onPress={() => setMenuOpen(false)}>
          <Pressable style={styles.menuPanel} onStartShouldSetResponder={() => true}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>your conversations</Text>
              <TouchableOpacity onPress={handleNewChat} style={styles.newChatBtn} activeOpacity={0.8}>
                <Ionicons name="add" size={15} color={Colors.white} />
                <Text style={styles.newChatText}>new</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
              {pastSessions.length === 0 ? (
                <Text style={styles.menuEmpty}>No past conversations yet.</Text>
              ) : (
                pastSessions.map((s) => (
                  <TouchableOpacity
                    key={s.id}
                    style={[styles.sessionRow, session?.id === s.id && styles.sessionRowActive]}
                    onPress={() => openPast(s)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="chatbubble-ellipses-outline" size={16} color={Colors.green.secondary} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.sessionTitle} numberOfLines={1}>{s.title}</Text>
                      <Text style={styles.sessionDate}>
                        {new Date(s.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* What is Whisper? — gentle explainer */}
      <Modal visible={aboutOpen} transparent animationType="fade" onRequestClose={() => setAboutOpen(false)}>
        <Pressable style={styles.aboutOverlay} onPress={() => setAboutOpen(false)}>
          <Pressable style={styles.aboutCard} onStartShouldSetResponder={() => true}>
            <View style={styles.aboutIcon}>
              <Ionicons name="leaf" size={22} color={Colors.green.primary} />
            </View>
            <Text style={styles.aboutTitle}>what is whisper?</Text>
            <Text style={styles.aboutBody}>
              Whisper is a safe place to be heard.{'\n\n'}
              Talk about whatever's on your heart — no judgment, no rush. Whisper listens,
              offers gentle words and scripture, and prays with you in God's presence.{'\n\n'}
              Whatever you share stays here, in your sanctuary.
            </Text>
            <TouchableOpacity style={styles.aboutBtn} onPress={() => setAboutOpen(false)} activeOpacity={0.85}>
              <Text style={styles.aboutBtnText}>okay 🌿</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.soft,
    backgroundColor: Colors.bg.primary,
  },
  backBtn: { padding: 4 },
  headerTitleContainer: { alignItems: 'center' },
  logo: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 18,
    color: Colors.green.primary,
  },
  tagline: {
    fontFamily: 'Inter_500Medium',
    fontSize: 8,
    color: Colors.text.muted,
    marginTop: -2,
    letterSpacing: 0.1,
  },
  rightHeaderActions: { flexDirection: 'row', alignItems: 'center' },
  whatIsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bg.secondary,
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: Spacing.xs,
  },
  whatIsText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 9,
    color: Colors.text.secondary,
    marginRight: 4,
  },
  moreBtn: { padding: 4 },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 110,
    paddingTop: Spacing.md,
  },
  dateSeparatorContainer: { alignItems: 'center', marginVertical: Spacing.sm },
  dateSeparatorPill: {
    backgroundColor: Colors.bg.secondary,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 3,
  },
  dateSeparatorText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 9,
    color: Colors.text.muted,
  },
  prayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: Colors.green.faint,
    borderWidth: 1,
    borderColor: Colors.green.muted,
    borderRadius: Radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: Spacing.xs,
    marginLeft: 4,
  },
  prayBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.green.primary,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xs,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    backgroundColor: Colors.bg.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border.soft,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    ...Shadows.float,
  },
  inputLeaf: { marginLeft: 6, marginRight: 6 },
  textInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.text.primary,
    paddingVertical: 4,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Past chats menu
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 90 : 60,
    paddingRight: Spacing.md,
  },
  menuPanel: {
    width: 280,
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.default,
    ...Shadows.float,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  menuTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    letterSpacing: 0.5,
    color: Colors.text.primary,
  },
  newChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.green.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  newChatText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.white,
  },
  menuEmpty: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.text.muted,
    textAlign: 'center',
    paddingVertical: Spacing.lg,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: Radius.md,
  },
  sessionRowActive: {
    backgroundColor: Colors.green.faint,
  },
  sessionTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.text.primary,
  },
  sessionDate: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    color: Colors.text.muted,
    marginTop: 1,
  },

  // What is Whisper? modal
  aboutOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  aboutCard: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border.default,
    ...Shadows.float,
  },
  aboutIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.green.faint,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  aboutTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 20,
    color: Colors.green.primary,
    marginBottom: Spacing.sm,
  },
  aboutBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13.5,
    color: Colors.text.secondary,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  aboutBtn: {
    backgroundColor: Colors.green.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl,
    paddingVertical: 12,
    ...Shadows.sm,
  },
  aboutBtnText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    color: Colors.white,
  },
});

