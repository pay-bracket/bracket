import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="new-invoice"
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="numpad"
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="copy-details"
          options={{ presentation: 'formSheet' }}
        />
        <Stack.Screen name="account" />
        <Stack.Screen name="qr-code" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="employer" />
        <Stack.Screen name="statements" />
      </Stack>
    </>
  );
}
