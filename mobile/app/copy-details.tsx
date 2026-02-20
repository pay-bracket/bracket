import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fonts, radius, spacing } from '@/constants/theme';
import { account } from '@/lib/mock-data';

export default function CopyDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (label: string) => {
    setCopied(label);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account Details</Text>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="close-circle" size={28} color="rgba(255,255,255,0.6)" />
        </Pressable>
      </View>

      <View style={styles.card}>
        <CopyRow
          label="Account Number"
          value={account.accountNumber}
          copied={copied === 'Account Number'}
          onCopy={() => handleCopy('Account Number')}
        />
        <View style={styles.divider} />
        <CopyRow
          label="Routing Number"
          value={account.routingNumber}
          copied={copied === 'Routing Number'}
          onCopy={() => handleCopy('Routing Number')}
        />
      </View>

      <Text style={styles.hint}>Tap to copy to clipboard</Text>
    </View>
  );
}

function CopyRow({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <Pressable onPress={onCopy} style={styles.row}>
      <View>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
      <Ionicons
        name={copied ? 'checkmark-circle' : 'copy-outline'}
        size={22}
        color={copied ? '#34D399' : 'rgba(255,255,255,0.5)'}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  headerTitle: {
    fontSize: fonts.xl,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    padding: spacing.xl,
    marginTop: spacing.xxl,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: fonts.xs,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 4,
  },
  rowValue: {
    fontSize: fonts.lg,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  hint: {
    fontSize: fonts.sm,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
