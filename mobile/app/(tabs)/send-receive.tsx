import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/theme';
import { PaymentRequest } from '@/lib/mock-data';
import { useApp } from '@/lib/store';

export default function SendReceiveScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { state } = useApp();
  const { account, paymentRequests, scheduledPayments } = state;

  const wholeDollars = '$' + Math.floor(account.balance).toLocaleString();
  const cents = '.' + account.balance.toFixed(2).split('.')[1];

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoIconText}>B</Text>
            </View>
            <Text style={styles.logoText}>Bracket</Text>
          </View>
          <Pressable onPress={() => router.push('/account')} hitSlop={8}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileText}>{account.avatar}</Text>
            </View>
          </Pressable>
        </View>

        {/* Balance */}
        <View style={styles.balanceSection}>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceDollars}>{wholeDollars}</Text>
            <Text style={styles.balanceCents}>{cents}</Text>
          </View>
        </View>

        {/* Link External Account */}
        <Pressable
          style={({ pressed }) => [styles.linkButton, pressed && { opacity: 0.8 }]}
          onPress={() => {}}
        >
          <Text style={styles.linkButtonText}>Link External Account</Text>
        </Pressable>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <ActionIcon icon="card-outline" label={'Deposit\nCheck'} onPress={() => {}} />
          <ActionIcon icon="arrow-down-outline" label="Request" onPress={() => router.push('/contacts?mode=request' as any)} />
          <ActionIcon icon="send-outline" label="Send" onPress={() => router.push('/contacts?mode=send' as any)} />
          <ActionIcon icon="swap-horizontal" label="Transfer" onPress={() => {}} />
        </View>

        {/* Requests */}
        <Text style={styles.sectionTitle}>Requests</Text>
        {paymentRequests.map((item) => (
          <RequestRow key={item.id} item={item} />
        ))}

        {/* Scheduled Payments */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Scheduled payments</Text>
        {scheduledPayments.map((item) => (
          <RequestRow key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

function ActionIcon({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.actionBtn} onPress={onPress}>
      <View style={styles.actionIconWrap}>
        <Ionicons name={icon} size={28} color={colors.textPrimary} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

function RequestRow({ item }: { item: PaymentRequest }) {
  const statusColor =
    item.status === 'filled'
      ? colors.success
      : item.status === 'declined'
        ? colors.danger
        : colors.textSecondary;

  const statusLabel = item.status.charAt(0).toUpperCase() + item.status.slice(1);

  return (
    <View style={styles.requestRow}>
      <View style={[styles.avatar, { backgroundColor: item.color }]}>
        <Text style={styles.avatarText}>{item.initials}</Text>
      </View>
      <Text style={styles.requestName}>{item.name}</Text>
      <Text style={styles.requestAmount}>${item.amount}</Text>
      <Text style={[styles.requestStatus, { color: statusColor }]}>{statusLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: 6,
    paddingBottom: 4,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 49,
    height: 49,
    borderRadius: 12,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIconText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
  },
  logoText: {
    fontSize: 26,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.4,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: -0.45,
  },

  // Balance
  balanceSection: {
    paddingHorizontal: 26,
    paddingTop: 80,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  balanceDollars: {
    fontSize: 40,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -1.2,
  },
  balanceCents: {
    fontSize: 26,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.78,
  },

  // Link External Account
  linkButton: {
    marginHorizontal: spacing.lg,
    marginTop: 24,
    height: 48,
    borderRadius: 100,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkButtonText: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.72,
  },

  // Action Buttons
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.xl,
    paddingTop: 28,
    paddingBottom: 20,
  },
  actionBtn: {
    alignItems: 'center',
    gap: 6,
  },
  actionIconWrap: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.48,
  },

  // Section Title
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.textPrimary,
    letterSpacing: -0.54,
    paddingHorizontal: spacing.xl + 12,
    marginTop: 8,
    marginBottom: 8,
  },

  // Request Rows
  requestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl + 4,
    paddingVertical: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.36,
  },
  requestName: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    marginLeft: 10,
    flex: 1,
  },
  requestAmount: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.48,
    marginRight: 16,
  },
  requestStatus: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.48,
    textAlign: 'right',
    minWidth: 65,
  },
});
