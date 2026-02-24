import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '@/lib/store';

export default function RootLayout() {
  return (
    <AppProvider>
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
        <Stack.Screen name="contacts" />
        <Stack.Screen name="new-contact" />
        <Stack.Screen name="send-payment" />
        <Stack.Screen name="send-confirmed" />
        <Stack.Screen name="request-invoice" />
        <Stack.Screen name="invoice-preview" />
        <Stack.Screen name="invoice-confirmed" />
        <Stack.Screen name="card/[id]" />
      </Stack>
    </AppProvider>
  );
}
