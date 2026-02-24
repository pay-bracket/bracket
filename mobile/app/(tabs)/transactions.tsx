import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TransactionList } from '@/components/transaction-list';
import { colors, spacing } from '@/constants/theme';
import { TransactionSection } from '@/lib/mock-data';
import { useApp, groupTransactionsByDate, getTransactionSummary } from '@/lib/store';

export default function TransactionsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { state } = useApp();
  const { account, transactions } = state;
  const [search, setSearch] = useState('');
  const [collapsedDates, setCollapsedDates] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    if (!search.trim()) return transactions;
    const q = search.toLowerCase();
    return transactions.filter((t) => t.name.toLowerCase().includes(q));
  }, [search]);

  const sections = useMemo(() => groupTransactionsByDate(filtered), [filtered]);
  const summary = useMemo(() => getTransactionSummary(filtered), [filtered]);

  const toggleSection = (date: string) => {
    setCollapsedDates((prev) => {
      const next = new Set(prev);
      if (next.has(date)) next.delete(date);
      else next.add(date);
      return next;
    });
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header: Search + Avatar */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={17} color="#727272" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#727272"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')} hitSlop={8}>
              <Ionicons name="close-circle" size={17} color="#727272" />
            </Pressable>
          )}
        </View>
        <Pressable onPress={() => router.push('/account')} hitSlop={8}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>{account.avatar}</Text>
          </View>
        </Pressable>
      </View>

      {/* Title */}
      <Text style={styles.title}>Transactions</Text>

      {/* Summary Row */}
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Last 30 days</Text>
        <View style={styles.summaryIndicator}>
          <View style={styles.arrowCircleGreen}>
            <Ionicons name="arrow-up" size={14} color={colors.accent} />
          </View>
          <Text style={styles.summaryAmount}>{summary.income.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryIndicator}>
          <View style={styles.arrowCircleRed}>
            <Ionicons name="arrow-up" size={14} color={colors.danger} />
          </View>
          <Text style={styles.summaryAmount}>{summary.expenses.toFixed(2)}</Text>
        </View>
      </View>

      {/* Transaction Sections */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {sections.map((section) => (
          <DateSection
            key={section.date}
            section={section}
            collapsed={collapsedDates.has(section.date)}
            onToggle={() => toggleSection(section.date)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function DateSection({
  section,
  collapsed,
  onToggle,
}: {
  section: TransactionSection;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const totalColor = section.dailyTotal >= 0 ? colors.success : colors.danger;
  const totalPrefix = section.dailyTotal >= 0 ? '+' : '';
  const totalStr = totalPrefix + section.dailyTotal.toFixed(2);

  return (
    <View style={styles.section}>
      <Pressable style={styles.sectionHeader} onPress={onToggle}>
        <View style={styles.sectionHeaderLeft}>
          <Text style={styles.sectionDate}>{section.label}</Text>
          <Ionicons
            name={collapsed ? 'chevron-down' : 'chevron-up'}
            size={20}
            color={colors.textPrimary}
          />
        </View>
        <Text style={[styles.sectionTotal, { color: totalColor }]}>{totalStr}</Text>
      </Pressable>

      {!collapsed && <TransactionList transactions={section.data} />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 6,
    paddingBottom: 4,
    gap: 11,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(120, 120, 128, 0.16)',
    borderRadius: 100,
    paddingHorizontal: 11,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: colors.textPrimary,
    letterSpacing: -0.08,
    padding: 0,
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

  // Title
  title: {
    fontSize: 30,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.9,
    paddingHorizontal: 6,
    paddingTop: 14,
  },

  // Summary
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 4,
    paddingBottom: 12,
    gap: 8,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: -0.48,
  },
  summaryIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  arrowCircleGreen: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowCircleRed: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.48,
  },

  // Scroll content
  scrollContent: {
    paddingBottom: 40,
  },

  // Section
  section: {
    marginBottom: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl + 3,
    paddingVertical: 8,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
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
});
