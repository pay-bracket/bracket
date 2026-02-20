import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AccountHeader } from '@/components/account-header';
import { SectionHeader } from '@/components/section-header';
import { colors, fonts, radius, spacing } from '@/constants/theme';
import { account } from '@/lib/mock-data';

export default function AccountScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.screen, { paddingTop: insets.top }]}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Account</Text>
        <View style={{ width: 24 }} />
      </View>

      <AccountHeader account={account} />

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>${account.balance.toFixed(2)}</Text>
      </View>

      {/* Account Info */}
      <SectionHeader title="Account Information" />
      <View style={styles.infoCard}>
        <InfoRow label="Account Number" value={account.accountNumber} />
        <InfoRow label="Routing Number" value={account.routingNumber} />
        <InfoRow label="Email" value={account.email} />
      </View>

      {/* Actions */}
      <SectionHeader title="Actions" />
      <View style={styles.infoCard}>
        <ActionRow icon="qr-code" label="Show QR Code" onPress={() => router.push('/qr-code')} />
        <ActionRow
          icon="copy-outline"
          label="Copy Account Details"
          onPress={() => router.push('/copy-details')}
        />
        <ActionRow
          icon="business"
          label="Employer Info"
          onPress={() => router.push('/employer')}
        />
      </View>
    </ScrollView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function ActionRow({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.actionRow, pressed && { opacity: 0.7 }]}
    >
      <View style={styles.actionRowLeft}>
        <Ionicons name={icon} size={20} color={colors.accent} />
        <Text style={styles.actionRowLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xxxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  headerTitle: {
    fontSize: fonts.lg,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  balanceCard: {
    marginHorizontal: spacing.xl,
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    padding: spacing.xxl,
    alignItems: 'center',
    gap: spacing.xs,
  },
  balanceLabel: {
    fontSize: fonts.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  balanceAmount: {
    fontSize: fonts.xxxl,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  infoCard: {
    marginHorizontal: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    padding: spacing.lg,
    gap: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  infoLabel: {
    fontSize: fonts.sm,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: fonts.sm,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  actionRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  actionRowLabel: {
    fontSize: fonts.md,
    fontWeight: '500',
    color: colors.textPrimary,
  },
});
