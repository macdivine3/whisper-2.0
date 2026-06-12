import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Radius, Shadows, Spacing } from '../../constants/theme';

export default function JournalHeader() {
  return (
    <View style={styles.headerRow}>
      <View>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>journal</Text>
          <Ionicons name="leaf" size={16} color={Colors.green.primary} style={styles.logoIcon} />
        </View>
        <Text style={styles.tagline}>a space for your heart</Text>
      </View>

      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search-outline" size={20} color={Colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.addBtnContainer}>
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add" size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.addBtnText}>new entry</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logo: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 32,
    color: Colors.green.primary,
    letterSpacing: -0.5,
  },
  logoIcon: {
    marginLeft: 4,
  },
  tagline: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors.text.muted,
    marginTop: -2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  searchBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.circle,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  addBtnContainer: {
    alignItems: 'center',
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.circle,
    backgroundColor: Colors.green.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
  },
  addBtnText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: Colors.text.muted,
    marginTop: 4,
  },
});
