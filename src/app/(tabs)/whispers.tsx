import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import TypingIndicator from '../../components/TypingIndicator';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radius, Shadows } from '../../constants/theme';

// Import Components
import ChatBubble from '../../components/ChatBubble';
import AIMessage from '../../components/AIMessage';
import ScriptureCard from '../../components/ScriptureCard';
import ReactionBar from '../../components/ReactionBar';

interface Message {
  id: string;
  type: 'ai' | 'user' | 'scripture' | 'reaction';
  text?: string;
  time: string;
  senderName?: string;
  showLeaf?: boolean;
  verse?: string;
  reference?: string;
}

export default function WhispersScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Set up the exact visual conversation mock from your UI design
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      type: 'ai',
      text: "good morning, David 🌿\n\nI'm here for you.\nHow are you feeling today?",
      time: '9:41 AM',
      showLeaf: true,
    },
    {
      id: 'm2',
      type: 'user',
      text: 'Honestly, overwhelmed.',
      time: '9:42 AM',
    },
    {
      id: 'm3',
      type: 'ai',
      text: "Thank you for being honest.\nIt takes courage to say that.\n\nWould you like to talk about what's been on your mind? I'm listening.",
      time: '9:42 AM',
    },
    {
      id: 'm4',
      type: 'user',
      text: "Everything just feels like too much.\nI feel like I'm failing in so many areas of my life.",
      time: '9:43 AM',
    },
    {
      id: 'm5',
      type: 'ai',
      text: "I hear you, David.\nYou are not failing. You're human.\nAnd even on your hardest days, you are still showing up. That matters.\n\nRemember: God sees your heart, not your highlights.",
      time: '9:43 AM',
    },
    {
      id: 'm6',
      type: 'scripture',
      verse: 'Cast all your anxiety on Him because He cares for you.',
      reference: '1 Peter 5:7',
      time: '9:43 AM',
    },
    {
      id: 'm7',
      type: 'reaction',
      time: '9:43 AM',
    }
  ]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsgId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: newMsgId,
      type: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

    // Simulate AI response after typing delay
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        text: "I hear you completely. Take a deep breath. You don't have to walk this mile alone. Whisper is here, and so is His grace.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 1600);


  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.6}>
            <Ionicons name="chevron-back" size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
          
          <View style={styles.headerTitleContainer}>
            <Text style={styles.logo}>whisper.</Text>
            <Text style={styles.tagline}>your safe sanctuary</Text>
          </View>

          <View style={styles.rightHeaderActions}>
            <TouchableOpacity style={styles.whatIsBtn} activeOpacity={0.7}>
              <Text style={styles.whatIsText}>what is whisper?</Text>
              <Ionicons name="leaf" size={10} color={Colors.green.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreBtn} activeOpacity={0.6}>
              <Ionicons name="ellipsis-vertical" size={18} color={Colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Message Thread */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
        >
          {/* Centered Date Separator */}
          <View style={styles.dateSeparatorContainer}>
            <View style={styles.dateSeparatorPill}>
              <Text style={styles.dateSeparatorText}>Today, May 18</Text>
            </View>
          </View>

          {messages.map((msg) => {
            if (msg.type === 'ai') {
              return (
                <AIMessage
                  key={msg.id}
                  message={msg.text || ''}
                  time={msg.time}
                  showDecorativeLeaf={msg.showLeaf}
                />
              );
            } else if (msg.type === 'user') {
              return (
                <ChatBubble
                  key={msg.id}
                  message={msg.text || ''}
                  time={msg.time}
                />
              );
            } else if (msg.type === 'scripture') {
              return (
                <ScriptureCard
                  key={msg.id}
                  verse={msg.verse}
                  reference={msg.reference}
                />
              );
            } else if (msg.type === 'reaction') {
              return <ReactionBar key={msg.id} />;
            }
            return null;
          })}

          {/* Typing indicator — shown while AI is composing */}
          {isTyping && <TypingIndicator />}
        </ScrollView>

        {/* Input Footer Bar */}
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <Ionicons name="leaf-outline" size={18} color={Colors.green.secondary} style={styles.inputLeaf} />
            <TextInput
              style={styles.textInput}
              placeholder="message whisper..."
              placeholderTextColor={Colors.text.muted}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity 
              style={[
                styles.sendButton,
                { backgroundColor: inputText.trim() ? Colors.green.primary : Colors.green.muted }
              ]} 
              onPress={handleSend}
              disabled={!inputText.trim()}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-up" size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  backBtn: {
    padding: 4,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 20,
    color: Colors.green.primary,
  },
  tagline: {
    fontFamily: 'Inter_500Medium',
    fontSize: 9,
    color: Colors.text.muted,
    marginTop: -2,
    letterSpacing: 0.1,
  },
  rightHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whatIsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bg.secondary,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    marginRight: Spacing.xs,
  },
  whatIsText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: Colors.text.secondary,
    marginRight: 4,
  },
  moreBtn: {
    padding: 4,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 110, // Avoid overlapping the input bar and tabs
    paddingTop: Spacing.md,
  },
  dateSeparatorContainer: {
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  dateSeparatorPill: {
    backgroundColor: Colors.bg.secondary,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
  },
  dateSeparatorText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: Colors.text.muted,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16, // Reduced since tab bar is hidden
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
    paddingVertical: 8,
    ...Shadows.float, // Outward feeling shadow
  },
  inputLeaf: {
    marginLeft: 6,
    marginRight: 6,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.text.primary,
    paddingVertical: 6,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
