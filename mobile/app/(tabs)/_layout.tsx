import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.textPrimary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="send-receive"
        options={{
          title: 'Send & Receive',
          tabBarIcon: ({ color }) => (
            <View style={styles.sendReceiveIcon}>
              <Ionicons name="swap-horizontal" size={20} color={color} />
            </View>
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]} numberOfLines={2}>
              Send{'\n'}& Receive
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="card-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Help',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBarBg,
    borderTopWidth: 0,
    height: 77,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.42,
    textAlign: 'center',
  },
  sendReceiveIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
