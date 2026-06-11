import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Animated, Dimensions, Easing, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Radius, Shadows, Spacing } from '../constants/theme';

const LEAF_BG = require('../../assets/images/leaf-transparent.png');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface WhisperCardProps {
  type?: 'morning' | 'night';
  title?: string;
  verse?: string;
  reference?: string;
  reflection?: string;
  onReadPress?: () => void;
}

export default function WhisperCard({
  type = 'morning',
  title = 'He Heals',
  verse = 'He heals the brokenhearted and binds up their wounds.',
  reference = 'Psalm 147:3',
  reflection = 'Sometimes the broken pieces of our lives are exactly what God uses to let His light shine through. Be patient with your healing today.',
  onReadPress,
}: WhisperCardProps) {
  const [isLoved, setIsLoved] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;

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
    }).start(() => {
      setModalVisible(false);
    });
  };

  const handleReadPress = () => {
    if (onReadPress) {
      onReadPress();
    } else {
      openModal();
    }
  };

  return (
    <>
      <View style={styles.card}>
        {/* Leaf stays exactly as it was */}
        <View style={styles.watermarkContainer}>
          <Image
            source={LEAF_BG}
            style={styles.watermarkImage}
            resizeMode="contain"
          />
        </View>

        {/* Top Row */}
        <View style={styles.topRow}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{type} whisper</Text>
            <Ionicons
              name={type === 'morning' ? 'leaf' : 'moon'}
              size={12}
              color={Colors.green.primary}
              style={styles.tagIcon}
            />
          </View>
          <TouchableOpacity onPress={() => setIsLoved(!isLoved)} activeOpacity={0.6}>
            <Ionicons
              name={isLoved ? 'heart' : 'heart-outline'}
              size={18}
              color={isLoved ? '#E07B7B' : Colors.text.muted}
            />
          </TouchableOpacity>
        </View>

        {/* Text Content - Title straight line, Verse on left */}
        <View style={styles.textContent}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>

          <View style={styles.verseWrapper}>
            <Text style={styles.verse}>
              {verse}
              {reference ? <Text style={styles.reference}> {reference}.</Text> : null}
            </Text>
          </View>

          {/* Read link */}
          <TouchableOpacity style={styles.actionRow} onPress={handleReadPress} activeOpacity={0.6}>
            <Text style={styles.actionText}>read whisper</Text>
            <Ionicons name="arrow-forward-outline" size={13} color={Colors.green.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal remains the same */}
      <Modal visible={modalVisible} transparent={true} animationType="none" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={closeModal} />
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalVerse}>"{verse}" — {reference}</Text>
            <View style={styles.reflectionBox}><Text style={styles.modalReflection}>{reflection}</Text></View>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalLikeBtn} onPress={() => setIsLoved(!isLoved)}>
                <Ionicons name={isLoved ? 'heart' : 'heart-outline'} size={24} color={isLoved ? '#E07B7B' : Colors.text.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalShareBtn}><Text style={styles.modalShareText}>share whisper</Text></TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bg.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xs,
    marginBottom: 16, // Increased gap between whisper card and story card
    borderWidth: 1,
    borderColor: Colors.border.default,
    position: 'relative',
    overflow: 'hidden',
    ...Shadows.sm,
  },
  watermarkContainer: {
    position: 'absolute',
    bottom: -110,
    right: -45,
    zIndex: 0,
    opacity: 0.3,
    transform: [{ rotate: '-0.9deg' }],
  },
  watermarkImage: {
    width: 210,
    height: 335,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    zIndex: 1,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11, // Shrink font
    color: Colors.green.primary,
  },
  tagIcon: {
    marginLeft: 4,
  },
  textContent: {
    zIndex: 1,
  },
  title: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 20, // Shrink font
    color: Colors.text.primary,
    marginBottom: 4,
  },
  verseWrapper: {
    width: '68%', // Force verse to left side
  },
  verse: {
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 13, // Shrink font
    color: Colors.text.secondary,
    lineHeight: 18,
    marginBottom: 8,
  },
  reference: {
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 12,
    color: Colors.text.muted,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  actionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.green.primary,
    marginRight: 4,
  },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  modalBackdrop: { ...StyleSheet.absoluteFill },
  modalContent: { backgroundColor: Colors.bg.primary, borderTopLeftRadius: Radius.xl, borderTopRightRadius: Radius.xl, padding: Spacing.lg, paddingBottom: Spacing.xxl, minHeight: SCREEN_HEIGHT * 0.5 },
  modalHandle: { width: 40, height: 4, backgroundColor: Colors.border.default, borderRadius: Radius.pill, alignSelf: 'center', marginBottom: Spacing.lg },
  modalTitle: { fontFamily: 'NotoSerif_700Bold', fontSize: 24, color: Colors.text.primary, marginBottom: 8 },
  modalVerse: { fontFamily: 'NotoSerif_400Regular_Italic', fontSize: 14, color: Colors.text.muted, marginBottom: 16 },
  reflectionBox: { backgroundColor: Colors.bg.card, padding: 16, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border.soft, marginBottom: 20 },
  modalReflection: { fontFamily: 'Inter_400Regular', fontSize: 14, color: Colors.text.secondary, lineHeight: 22 },
  modalActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  modalLikeBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.bg.card, borderWidth: 1, borderColor: Colors.border.soft, justifyContent: 'center', alignItems: 'center' },
  modalShareBtn: { flex: 1, height: 50, backgroundColor: Colors.green.primary, borderRadius: Radius.pill, justifyContent: 'center', alignItems: 'center' },
  modalShareText: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: Colors.white },
});
