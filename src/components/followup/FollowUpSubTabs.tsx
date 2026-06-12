import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Radius, Shadows, Spacing } from '../../constants/theme';

type SubTab = 'checkin' | 'carelog' | 'reminders';

interface Props {
  activeSubTab: SubTab;
  onTabChange: (tab: SubTab) => void;
}

export default function FollowUpSubTabs({ activeSubTab, onTabChange }: Props) {
  return (
    <View style={styles.subTabContainer}>
      <TouchableOpacity
        style={[styles.subTab, activeSubTab === 'checkin' && styles.activeSubTab]}
        onPress={() => onTabChange('checkin')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="heart-outline"
          size={16}
          color={activeSubTab === 'checkin' ? Colors.green.primary : Colors.text.muted}
          style={{ marginRight: 6 }}
        />
        <Text style={[styles.subTabText, activeSubTab === 'checkin' && styles.activeSubTabText]}>
          Check-in
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.subTab, activeSubTab === 'carelog' && styles.activeSubTab]}
        onPress={() => onTabChange('carelog')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="document-text-outline"
          size={16}
          color={activeSubTab === 'carelog' ? Colors.green.primary : Colors.text.muted}
          style={{ marginRight: 6 }}
        />
        <Text style={[styles.subTabText, activeSubTab === 'carelog' && styles.activeSubTabText]}>
          Care Log
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.subTab, activeSubTab === 'reminders' && styles.activeSubTab]}
        onPress={() => onTabChange('reminders')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="notifications-outline"
          size={16}
          color={activeSubTab === 'reminders' ? Colors.green.primary : Colors.text.muted}
          style={{ marginRight: 6 }}
        />
        <Text style={[styles.subTabText, activeSubTab === 'reminders' && styles.activeSubTabText]}>
          Reminders
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  subTabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  subTab: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: Radius.pill,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeSubTab: {
    backgroundColor: Colors.bg.card,
    borderColor: '#E8E2D8',
    ...Shadows.sm,
  },
  subTabText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.text.muted,
  },
  activeSubTabText: {
    color: Colors.text.primary,
    fontFamily: 'Inter_600SemiBold',
  },
});
