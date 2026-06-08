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
      duration: 800, // Slower, elegant rise (800ms)
      useNativeDriver: true,
      easing: Easing.out(Easing.exp), // Smooth deceleration
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 400, // Faster close
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
        {/* Leaf Branch Watermark — increased, slanting, stem from bottom */}
        <View style={styles.watermarkContainer}>
          <Image
            source={LEAF_BG}
            style={styles.watermarkImage}
            resizeMode="contain"
          />
        </View>

        {/* Top Row: tag + heart (full width) */}
        <View style={styles.topRow}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{type} whisper</Text>
            <Ionicons
              name={type === 'morning' ? 'leaf' : 'moon'}
              size={13}
              color={Colors.green.primary}
              style={styles.tagIcon}
            />
          </View>
          <TouchableOpacity onPress={() => setIsLoved(!isLoved)} activeOpacity={0.6}>
            <Ionicons
              name={isLoved ? 'heart' : 'heart-outline'}
              size={20}
              color={isLoved ? '#E07B7B' : Colors.text.muted}
            />
          </TouchableOpacity>
        </View>

        {/* Text Content constrained to the left side */}
        <View style={styles.textContent}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.verse}>
            {verse}
            {reference ? <Text style={styles.reference}> {reference}.</Text> : null}
          </Text>

          {/* Read link */}
          <TouchableOpacity style={styles.actionRow} onPress={handleReadPress} activeOpacity={0.6}>
            <Text style={styles.actionText}>read whisper</Text>
            <Ionicons name="arrow-forward-outline" size={14} color={Colors.green.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Sheet Modal for Full Whisper */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none" // Turn off OS animation so our custom one runs
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          {/* Backdrop (closes modal on press) */}
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={closeModal}
          />

          {/* Bottom Sheet - Now wrapped in Animated.View */}
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <View style={styles.tagContainer}>
                <Text style={styles.tagText}>{type} whisper</Text>
                <Ionicons name={type === 'morning' ? 'leaf' : 'moon'} size={13} color={Colors.green.primary} style={styles.tagIcon} />
              </View>
            </View>

            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalVerse}>"{verse}" — {reference}</Text>

            {/* The full whisper reflection */}
            <View style={styles.reflectionBox}>
              <Text style={styles.modalReflection}>{reflection}</Text>
            </View>

            {/* Actions (Like & Share) */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalLikeBtn}
                onPress={() => setIsLoved(!isLoved)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={isLoved ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isLoved ? '#E07B7B' : Colors.text.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalShareBtn} activeOpacity={0.8}>
                <Text style={styles.modalShareText}>share whisper</Text>
                <Ionicons name="share-social-outline" size={16} color={Colors.white} />
              </TouchableOpacity>
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
    borderRadius: Radius.lg,
    padding: 18, // Reduced to make the box smaller
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border.default,
    position: 'relative',
    overflow: 'hidden',
    ...Shadows.sm,
  },
  watermarkContainer: {
    position: 'absolute',
    bottom: -110, // Pulled down so the stem comes directly from the bottom edge
    right: -45, // Shifted right slightly
    zIndex: 0,
    opacity: 0.3,
    transform: [{ rotate: '-0.9deg' }], // Slight slant
  },
  watermarkImage: {
    width: 210, // Increased size significantly
    height: 335,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    zIndex: 1,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.green.primary,
  },
  tagIcon: {
    marginLeft: 5,
  },
  textContent: {
    width: '72%', // Constrains text strictly to the left side, exposing the right side leaf
    zIndex: 1,
  },
  title: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  verse: {
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 21,
    marginBottom: Spacing.md,
  },
  reference: {
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 13,
    color: Colors.text.muted,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  actionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.green.primary,
    marginRight: 4,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFill,
  },
  modalContent: {
    backgroundColor: Colors.bg.primary,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
    minHeight: SCREEN_HEIGHT * 0.5, // Rises up from the bottom
    ...Shadows.md, // Changed from lg
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border.default, // Changed from strong
    borderRadius: Radius.pill,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  modalHeader: {
    marginBottom: Spacing.md,
  },
  modalTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 28,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  modalVerse: {
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 15,
    color: Colors.text.muted,
    marginBottom: Spacing.lg,
  },
  reflectionBox: {
    backgroundColor: Colors.bg.card,
    padding: Spacing.lg,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border.soft,
    marginBottom: Spacing.xl,
  },
  modalReflection: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  modalActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalLikeBtn: {
    width: 54,
    height: 54,
    borderRadius: Radius.circle,
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.soft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalShareBtn: {
    flex: 1,
    marginLeft: Spacing.md,
    height: 54,
    backgroundColor: Colors.green.primary,
    borderRadius: Radius.pill,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  modalShareText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.white,
  },
});
