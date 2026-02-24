import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/theme';

export default function InvoiceConfirmedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { amount, name } = useLocalSearchParams<{
    amount: string;
    name: string;
  }>();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {/* Checkmark */}
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={48} color={colors.white} />
        </View>

        {/* Message */}
        <Text style={styles.title}>
          Invoice for ${amount} sent to {name}
        </Text>
      </View>

      {/* Close Button */}
      <View style={[styles.bottomSection, { paddingBottom: insets.bottom + 20 }]}>
        <Pressable
          style={({ pressed }) => [styles.closeButton, pressed && { opacity: 0.7 }]}
          onPress={() => router.replace('/(tabs)/send-receive')}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.72,
    textAlign: 'center',
  },
  bottomSection: {
    paddingHorizontal: spacing.xl,
  },
  closeButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 100,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: -0.6,
  },
});
