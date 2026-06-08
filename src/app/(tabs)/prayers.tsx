import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Radius, Shadows, CommonStyles } from '../../constants/theme';

interface PrayerItem {
  id: string;
  category: 'personal' | 'family' | 'healing' | 'guidance';
  request: string;
  count: number;
  isPrayed: boolean;
  time: string;
}

export default function PrayersScreen() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [newPrayer, setNewPrayer] = useState('');
  const [prayers, setPrayers] = useState<PrayerItem[]>([
    {
      id: 'p1',
      category: 'personal',
      request: 'For strength and clarity as I transition into a new work role next week.',
      count: 4,
      isPrayed: false,
      time: '2h ago',
    },
    {
      id: 'p2',
      category: 'healing',
      request: 'My grandmother is undergoing surgery tomorrow morning. Praying for steady hands and peace.',
      count: 12,
      isPrayed: true,
      time: '5h ago',
    },
    {
      id: 'p3',
      category: 'guidance',
      request: 'Trusting God for the next steps in my relationship and path forward.',
      count: 8,
      isPrayed: false,
      time: 'Yesterday',
    },
  ]);

  const handlePrayPress = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPrayers((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isPrayed: !item.isPrayed,
            count: item.isPrayed ? item.count - 1 : item.count + 1,
          };
        }
        return item;
      })
    );
  };

  const handleAddPrayer = () => {
    if (!newPrayer.trim()) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const newItem: PrayerItem = {
      id: `p-${Date.now()}`,
      category: 'personal',
      request: newPrayer.trim(),
      count: 1,
      isPrayed: true,
      time: 'Just now',
    };
    setPrayers([newItem, ...prayers]);
    setNewPrayer('');
  };

  const filteredPrayers = activeCategory === 'all' 
    ? prayers 
    : prayers.filter(p => p.category === activeCategory);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>prayers.</Text>
          <Text style={styles.tagline}>lift your heart in unity</Text>
        </View>
        <View style={styles.prayIndicator}>
          <Ionicons name="heart" size={16} color={Colors.mood.grateful} />
          <Text style={styles.prayIndicatorText}>
            {prayers.reduce((sum, item) => sum + item.count, 0)} prayers
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner with Sunset Gradient */}
        <LinearGradient
          colors={['#F6D0A7', '#DF8964']} // Warm peach sunset gradients
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.bannerTextCol}>
            <Text style={styles.bannerSub}>GENTLE HOUR OF PRAYER</Text>
            <Text style={styles.bannerTitle}>He hears the softest sigh of your heart.</Text>
          </View>
          <Ionicons name="sunny" size={38} color={Colors.white} opacity={0.8} />
        </LinearGradient>

        {/* Input box */}
        <View style={styles.inputCard}>
          <TextInput
            style={styles.textInput}
            placeholder="Write a prayer or petition..."
            placeholderTextColor={Colors.text.muted}
            multiline
            value={newPrayer}
            onChangeText={setNewPrayer}
          />
          <View style={styles.inputFooter}>
            <Text style={styles.charCount}>{newPrayer.length}/200</Text>
            <TouchableOpacity 
              style={[
                styles.submitBtn,
                { backgroundColor: newPrayer.trim() ? Colors.green.primary : Colors.green.muted }
              ]} 
              onPress={handleAddPrayer}
              disabled={!newPrayer.trim()}
              activeOpacity={0.8}
            >
              <Text style={styles.submitBtnText}>add petition</Text>
              <Ionicons name="leaf-outline" size={12} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Pills */}
        <View style={styles.categoryScroll}>
          {['all', 'personal', 'healing', 'guidance'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catPill, activeCategory === cat && styles.activeCatPill]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.7}
            >
              <Text style={[styles.catText, activeCategory === cat && styles.activeCatText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Prayer List */}
        <View style={styles.prayerList}>
          <Text style={styles.sectionTitle}>COMMUNITY PETITIONS</Text>
          
          {filteredPrayers.map((item) => (
            <View key={item.id} style={styles.prayerCard}>
              <View style={styles.cardHeader}>
                <View style={[styles.categoryTag, { backgroundColor: Colors.green.faint }]}>
                  <Text style={styles.categoryTagText}>{item.category}</Text>
                </View>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>

              <Text style={styles.requestText}>{item.request}</Text>

              <View style={styles.cardFooter}>
                <Text style={styles.supportCount}>
                  {item.count} {item.count === 1 ? 'person is' : 'people are'} praying
                </Text>

                <TouchableOpacity
                  style={[styles.prayBtn, item.isPrayed && styles.prayedBtn]}
                  onPress={() => handlePrayPress(item.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={item.isPrayed ? 'heart' : 'heart-outline'}
                    size={14}
                    color={item.isPrayed ? Colors.white : Colors.mood.grateful}
                  />
                  <Text style={[styles.prayBtnText, item.isPrayed && styles.prayedBtnText]}>
                    {item.isPrayed ? 'praying' : 'pray'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Quiet Scripture End */}
        <View style={styles.scriptureEnd}>
          <Text style={styles.endText}>"For where two or three gather in my name, there am I with them."</Text>
          <Text style={styles.endRef}>MATTHEW 18:20</Text>
        </View>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  logo: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 26,
    color: Colors.green.primary,
  },
  tagline: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: Colors.text.muted,
    marginTop: -2,
  },
  prayIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bg.secondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  prayIndicatorText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.text.secondary,
    marginLeft: 6,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  banner: {
    flexDirection: 'row',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadows.md,
  },
  bannerTextCol: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  bannerSub: {
    ...CommonStyles.smallCaps,
    color: Colors.white,
    fontSize: 9,
    opacity: 0.8,
    marginBottom: 4,
  },
  bannerTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 18,
    color: Colors.white,
    lineHeight: 24,
  },
  inputCard: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border.default,
    ...Shadows.sm,
  },
  textInput: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.text.primary,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border.soft,
    paddingTop: Spacing.xs,
  },
  charCount: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: Colors.text.muted,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  submitBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.white,
    marginRight: 4,
  },
  categoryScroll: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
    gap: Spacing.xs,
  },
  catPill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.soft,
  },
  activeCatPill: {
    backgroundColor: Colors.green.primary,
    borderColor: Colors.green.primary,
  },
  catText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.text.secondary,
    textTransform: 'lowercase',
  },
  activeCatText: {
    color: Colors.white,
  },
  prayerList: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    ...CommonStyles.smallCaps,
    color: Colors.text.muted,
    fontSize: 10,
    marginBottom: Spacing.sm,
  },
  prayerCard: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.soft,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  categoryTag: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  categoryTagText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 9,
    color: Colors.green.primary,
    textTransform: 'lowercase',
  },
  timeText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: Colors.text.muted,
  },
  requestText: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  supportCount: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: Colors.text.muted,
  },
  prayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.mood.grateful,
  },
  prayedBtn: {
    backgroundColor: Colors.mood.grateful,
    borderColor: Colors.mood.grateful,
  },
  prayBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.mood.grateful,
    marginLeft: 4,
    textTransform: 'lowercase',
  },
  prayedBtnText: {
    color: Colors.white,
  },
  scriptureEnd: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  endText: {
    fontFamily: 'NotoSerif_400Regular_Italic',
    fontSize: 13,
    color: Colors.text.muted,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 4,
  },
  endRef: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    color: Colors.text.muted,
    letterSpacing: 0.5,
  },
  bottomSpacer: {
    height: 100,
  },
});
