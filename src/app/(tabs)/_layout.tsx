import { Tabs, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
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
        tabBarActiveTintColor: Colors.green.primary,
        tabBarInactiveTintColor: Colors.text.muted,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'home',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
              <Ionicons name="home" size={20} color={focused ? Colors.white : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="whispers"
        options={{
          title: 'whispers',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
              <Ionicons name="chatbubble-outline" size={20} color={focused ? Colors.white : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'journal',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
              <Ionicons name="book-outline" size={20} color={focused ? Colors.white : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="prayers"
        options={{
          title: 'prayers',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
              <Ionicons name="heart-outline" size={20} color={focused ? Colors.white : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
              <Ionicons name="person-outline" size={20} color={focused ? Colors.white : color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slight transparency for a glass look
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 20, // Raised higher to match the floating style
    left: 20,
    right: 20,
    borderRadius: Radius.pill,
    height: 72,
    borderTopWidth: 0,
    ...Shadows.float, // Stronger shadow to make it "float"
    paddingBottom: Platform.OS === 'ios' ? 0 : 4,
    paddingTop: 0,
    elevation: 10,
  },
  tabBarLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 9,
    marginTop: -4,
    letterSpacing: 0.1,
  },
  iconContainer: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  activeIconContainer: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green.primary,
    borderRadius: Radius.circle,
    marginTop: 8,
    ...Shadows.sm,
  },
});

