import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Radius, Shadows } from '../constants/theme';
import { buildNightWhisperShare, shareText } from '../lib/share';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface NightWhisperCardProps {
  title: string;
  message: string;
  whisper: string;
  onPress?: () => void;
}

export default function NightWhisperCard({ title, message, whisper, onPress }: NightWhisperCardProps) {
  const [isLoved, setIsLoved] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.in(Easing.ease),
    }).start(() => setModalVisible(false));
  };

  const handleReadPress = () => {
    if (onPress) onPress();
    else openModal();
  };

  const handleShare = () => shareText(buildNightWhisperShare({ title, message, whisper }));

  return (
    <>
      <LinearGradient
        colors={['#1C2D40', '#263347', '#1A2438']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* Stars decoration */}
        <View style={styles.starField}>
          <View style={[styles.star, { top: 12, left: 30, width: 3, height: 3 }]} />
          <View style={[styles.star, { top: 22, left: 90, width: 2, height: 2 }]} />
          <View style={[styles.star, { top: 8,  left: 160, width: 2.5, height: 2.5 }]} />
          <View style={[styles.star, { top: 30, left: 220, width: 2, height: 2 }]} />
          <View style={[styles.star, { top: 14, right: 40, width: 3, height: 3 }]} />
          <View style={[styles.star, { top: 28, right: 110, width: 2, height: 2 }]} />
        </View>

        {/* Moon icon */}
        <View style={styles.topRow}>
          <View style={styles.tagRow}>
            <Ionicons name="moon" size={12} color="#B8C5D6" style={{ marginRight: 6 }} />
            <Text style={styles.tagText}>TONIGHT'S WHISPER</Text>
          </View>
          <TouchableOpacity onPress={handleShare} activeOpacity={0.6}>
            <Ionicons name="share-social-outline" size={16} color="#7FAAD4" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Message */}
        <Text style={styles.message} numberOfLines={3}>{message}</Text>

        {/* Whisper quote */}
        <View style={styles.whisperContainer}>
          <View style={styles.whisperLeftBar} />
          <Text style={styles.whisperText}>{whisper}</Text>
        </View>

        {/* Action */}
        <TouchableOpacity style={styles.actionBtn} onPress={handleReadPress} activeOpacity={0.7}>
          <Text style={styles.actionText}>read tonight's whisper</Text>
          <Ionicons name="arrow-forward" size={14} color="#7FAAD4" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Reader modal — dark, matching the night theme */}
      <Modal visible={modalVisible} transparent animationType="none" onRequestClose={closeModal}>
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <Animated.View
            style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}
            onStartShouldSetResponder={() => true}
          >
            <LinearGradient
              colors={['#1C2D40', '#1A2438']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalGradient}
            >
              <View style={styles.modalHandle} />
              <View style={styles.tagRow}>
                <Ionicons name="moon" size={12} color="#B8C5D6" style={{ marginRight: 6 }} />
                <Text style={styles.tagText}>TONIGHT'S WHISPER</Text>
              </View>
              <Text style={styles.modalTitle}>{title}</Text>
              <Text style={styles.modalMessage}>{message}</Text>
              <View style={styles.whisperContainer}>
                <View style={styles.whisperLeftBar} />
                <Text style={styles.modalWhisper}>{whisper}</Text>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalLikeBtn} onPress={() => setIsLoved(!isLoved)}>
                  <Ionicons name={isLoved ? 'heart' : 'heart-outline'} size={24} color={isLoved ? '#E07B7B' : '#C4D5E3'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalShareBtn} onPress={handleShare} activeOpacity={0.85}>
                  <Text style={styles.modalShareText}>share whisper</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    overflow: 'hidden',
    position: 'relative',
    ...Shadows.md,
  },
  starField: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 99,
    opacity: 0.5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#7FAAD4',
  },
  title: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 22,
    color: '#EEF3F8',
    marginBottom: Spacing.sm,
    lineHeight: 28,
  },
  message: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#9AB3C8',
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  whisperContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
    paddingLeft: Spacing.xs,
  },
  whisperLeftBar: {
    width: 2,
    backgroundColor: '#4A7FAE',
    borderRadius: 1,
    marginRight: Spacing.sm,
    alignSelf: 'stretch',
    minHeight: 20,
  },
  whisperText: {
    flex: 1,
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 13,
    color: '#C4D5E3',
    lineHeight: 18,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  actionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#7FAAD4',
    marginRight: 6,
  },

  // Modal
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalBackdrop: { ...StyleSheet.absoluteFill },
  modalContent: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    overflow: 'hidden',
    minHeight: SCREEN_HEIGHT * 0.5,
  },
  modalGradient: {
    flex: 1,
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
    minHeight: SCREEN_HEIGHT * 0.5,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: Radius.pill,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 26,
    color: '#EEF3F8',
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
    lineHeight: 32,
  },
  modalMessage: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: '#9AB3C8',
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  modalWhisper: {
    flex: 1,
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 15,
    color: '#C4D5E3',
    lineHeight: 22,
  },
  modalActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 'auto',
  },
  modalLikeBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalShareBtn: {
    flex: 1,
    height: 50,
    backgroundColor: '#4A7FAE',
    borderRadius: Radius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalShareText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.white,
  },
});
