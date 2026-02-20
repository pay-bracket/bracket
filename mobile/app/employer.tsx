import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, spacing } from '@/constants/theme';
import { employer } from '@/lib/mock-data';

export default function EmployerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.screen, { paddingTop: insets.top }]}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Work Details</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Employer Card */}
      <View style={styles.employerCard}>
        <View style={styles.employerIcon}>
          <Ionicons name="business" size={32} color={colors.accent} />
        </View>
        <Text style={styles.employerName}>{employer.name}</Text>
        <Text style={styles.employerRole}>{employer.role}</Text>
      </View>

      {/* Pay Info */}
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Pay Information</Text>
        <InfoRow label="Pay Schedule" value={employer.paySchedule} />
        <InfoRow label="Last Pay Date" value={employer.lastPay} />
        <InfoRow label="Next Pay Date" value={employer.nextPay} />
        <InfoRow
          label="Last Pay Amount"
          value={`$${employer.lastAmount.toFixed(2)}`}
          valueColor={colors.success}
        />
      </View>

      {/* Income Summary */}
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Income Summary</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>This Month</Text>
            <Text style={styles.summaryValue}>$4,900.00</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Year to Date</Text>
            <Text style={styles.summaryValue}>$9,800.00</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function InfoRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, valueColor ? { color: valueColor } : undefined]}>
        {value}
      </Text>
    </View>
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
  employerCard: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    gap: spacing.sm,
  },
  employerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accent + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  employerName: {
    fontSize: fonts.xxl,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  employerRole: {
    fontSize: fonts.md,
    color: colors.textSecondary,
  },
  infoCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    padding: spacing.xl,
    gap: spacing.md,
  },
  cardTitle: {
    fontSize: fonts.md,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderCurve: 'continuous',
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
  },
  summaryLabel: {
    fontSize: fonts.xs,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: fonts.lg,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
