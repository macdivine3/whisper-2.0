import { Tabs, useSegments } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet, Platform } from 'react-native';
import { Colors, Radius, Shadows, Spacing } from '../../constants/theme';

export default function TabLayout() {
  const segments = useSegments();
  
  // Hide tab bar on the whispers chat screen
  const isWhisperChat = segments.includes('whispers');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: isWhisperChat ? { display: 'none' } : styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.green.secondary,
        tabBarInactiveTintColor: Colors.text.muted,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Feather name="home" size={20} color={focused ? Colors.white : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="whispers"
        options={{
          title: 'whispers',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Feather name="message-circle" size={20} color={focused ? Colors.white : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'journal',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Feather name="book-open" size={20} color={focused ? Colors.white : color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="follow-up"
        options={{
          title: 'profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Feather name="user" size={20} color={focused ? Colors.white : color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.bg.card,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 20,
    left: 20,
    right: 20,
    borderRadius: Radius.pill,
    height: 72,
    borderTopWidth: 0,
    ...Shadows.float,
    paddingBottom: Platform.OS === 'ios' ? 0 : 4,
    paddingTop: 0,
    elevation: 10,
    borderWidth: 1,
    borderColor: Colors.border.default,
  },
  tabBarLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    marginTop: -4,
  },
  iconContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 14,
  },
  activeIconContainer: {
    backgroundColor: Colors.green.secondary,
    ...Shadows.sm,
  },
});

