import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/theme';

export default function SendConfirmedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { amount, name, transactionId } = useLocalSearchParams<{
    amount: string;
    name: string;
    transactionId: string;
  }>();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (transactionId) {
      await Clipboard.setStringAsync(transactionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {/* Checkmark */}
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={48} color={colors.white} />
        </View>

        {/* Message */}
        <Text style={styles.title}>Sent ${amount} to {name}</Text>

        {/* Transaction ID */}
        {transactionId && (
          <Pressable style={styles.txnIdRow} onPress={handleCopy}>
            <Text style={styles.txnIdLabel}>Transaction ID</Text>
            <View style={styles.txnIdValueRow}>
              <Text style={styles.txnIdValue}>{transactionId}</Text>
              <Ionicons
                name={copied ? 'checkmark-circle' : 'copy-outline'}
                size={18}
                color={copied ? colors.success : colors.textSecondary}
              />
            </View>
          </Pressable>
        )}
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
    marginBottom: 16,
  },
  txnIdRow: {
    alignItems: 'center',
    gap: 4,
  },
  txnIdLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: -0.42,
  },
  txnIdValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  txnIdValue: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.42,
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
