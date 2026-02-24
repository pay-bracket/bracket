import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TransactionList } from '@/components/transaction-list';
import { colors, fonts, spacing } from '@/constants/theme';
import { groupTransactionsByDate, TransactionSection } from '@/lib/mock-data';
import { useApp } from '@/lib/store';

export default function CardDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state } = useApp();

  const card = state.debitCards.find((c) => c.id === id);

  const cardTransactions = useMemo(() => {
    if (!card) return [];
    return state.transactions.filter((t) => t.cardLast4 === card.last4);
  }, [state.transactions, card]);

  const sections = useMemo(() => groupTransactionsByDate(cardTransactions), [cardTransactions]);

  if (!card) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <Text style={styles.notFound}>Card not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={14}>
          <Ionicons name="chevron-back" size={28} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>{card.name}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Card Visual */}
        <View style={styles.cardVisualContainer}>
          <View style={styles.cardVisual}>
            <View style={styles.cardVisualInner} />
          </View>
          <View style={styles.cardInfoRow}>
            <Ionicons name="card-outline" size={18} color={colors.textPrimary} />
            <View style={styles.dot} />
            <Text style={styles.cardLast4}>{card.last4}</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.cardSpent}>${card.spentToday.toFixed(2)} spent today</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsRow}>
          <QuickAction icon="eye-outline" label="View Details" />
          <QuickAction icon="lock-closed-outline" label="Lock Card" />
          <QuickAction icon="create-outline" label="Change PIN" />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Transactions */}
        <Text style={styles.txnTitle}>Transactions</Text>
        {sections.map((section: TransactionSection) => (
          <View key={section.date} style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionDate}>{section.label}</Text>
              <Text style={[styles.sectionTotal, { color: section.dailyTotal >= 0 ? colors.success : colors.danger }]}>
                {section.dailyTotal >= 0 ? '+' : ''}{section.dailyTotal.toFixed(2)}
              </Text>
            </View>
            <TransactionList transactions={section.data} />
          </View>
        ))}

        {cardTransactions.length === 0 && (
          <Text style={styles.emptyText}>No transactions for this card</Text>
        )}
      </ScrollView>
    </View>
  );
}

function QuickAction({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <Pressable style={({ pressed }) => [styles.quickAction, pressed && { opacity: 0.7 }]}>
      <Ionicons name={icon} size={26} color={colors.textPrimary} />
      <Text style={styles.quickActionLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  notFound: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: 6,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  cardVisualContainer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  cardVisual: {
    aspectRatio: 1.586,
    borderRadius: 20,
    borderCurve: 'continuous',
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  cardVisualInner: {
    flex: 1,
    backgroundColor: '#D1D5DB',
    borderRadius: 20,
    borderCurve: 'continuous',
  },
  cardInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textPrimary,
  },
  cardLast4: {
    fontSize: fonts.md,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.48,
  },
  cardSpent: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.42,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  quickAction: {
    alignItems: 'center',
    gap: 6,
  },
  quickActionLabel: {
    fontSize: fonts.xs,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.textSecondary,
    marginHorizontal: 9,
    marginVertical: spacing.md,
  },
  txnTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.66,
    paddingHorizontal: spacing.xl,
    paddingTop: 8,
    paddingBottom: 4,
  },
  sectionContainer: {
    marginBottom: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl + 3,
    paddingVertical: 8,
  },
  sectionDate: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.48,
  },
  sectionTotal: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.48,
    textAlign: 'right',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 32,
  },
});
