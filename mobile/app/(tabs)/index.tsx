import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TransactionList } from '@/components/transaction-list';
import { colors, spacing } from '@/constants/theme';
import { useApp } from '@/lib/store';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const { state } = useApp();
  const { account, transactions, debitCards } = state;

  const wholeDollars = '$' + Math.floor(account.balance).toLocaleString();
  const cents = '.' + account.balance.toFixed(2).split('.')[1];

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header: Logo left, Profile right */}
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

        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceDollars}>{wholeDollars}</Text>
            <Text style={styles.balanceCents}>{cents}</Text>
          </View>
          <View style={styles.changeRow}>
            <Text style={styles.lastDays}>Last 30 days</Text>
            <View style={styles.changeIndicator}>
              <Ionicons name="arrow-up" size={14} color={colors.accent} />
              <Text style={styles.changeAmount}>440.33</Text>
            </View>
            <Ionicons name="chevron-down" size={18} color={colors.textPrimary} />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <ActionButton icon="card" label={"Deposit\nCheck"} onPress={() => {}} />
          <ActionButton icon="send" label="Send" onPress={() => router.push('/contacts?mode=send' as any)} />
          <ActionButton icon="arrow-down" label="Receive" onPress={() => router.push('/qr-code')} />
          <ActionButton icon="document-outline" label="Documents" onPress={() => setDocumentsOpen(true)} />
        </View>

        {/* Documents Popover */}
        <Modal
          visible={documentsOpen}
          transparent
          animationType="none"
          onRequestClose={() => setDocumentsOpen(false)}
        >
          <Pressable style={styles.popoverBackdrop} onPress={() => setDocumentsOpen(false)}>
            <View style={styles.popoverAnchor}>
              <View style={styles.popover}>
                <Pressable style={styles.popoverItem} onPress={() => { setDocumentsOpen(false); router.push('/statements'); }}>
                  <Text style={styles.popoverText}>Statements</Text>
                </Pressable>
                <Pressable style={styles.popoverItem} onPress={() => setDocumentsOpen(false)}>
                  <Text style={styles.popoverText}>Tax documents</Text>
                </Pressable>
                <Pressable style={styles.popoverItem} onPress={() => setDocumentsOpen(false)}>
                  <Text style={styles.popoverText}>Bank letters</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <Pressable onPress={() => router.push('/(tabs)/transactions')} hitSlop={8}>
            <Ionicons name="chevron-forward" size={22} color={colors.textPrimary} />
          </Pressable>
        </View>

        <TransactionList transactions={transactions} />

        {/* Cards Section */}
        <View style={[styles.sectionHeader, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>Cards</Text>
          <Pressable onPress={() => router.push('/(tabs)/cards')} hitSlop={8}>
            <Ionicons name="chevron-forward" size={22} color={colors.textPrimary} />
          </Pressable>
        </View>

        {debitCards.map((card) => (
          <View key={card.id} style={styles.cardItem}>
            <Text style={styles.cardName}>{card.name}</Text>
            <View style={styles.cardDot} />
            <View style={styles.cardLast4Row}>
              <Ionicons name="card-outline" size={14} color={colors.textPrimary} />
              <Text style={styles.cardLast4}>{card.last4}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <Text style={styles.cardSpent}>
              ${card.spentToday.toFixed(2)} spent today
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function ActionButton({
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 10,
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
    paddingTop: 10,
  },
  balanceLabel: {
    fontSize: 26,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.78,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  balanceDollars: {
    fontSize: 25,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.75,
  },
  balanceCents: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.48,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  lastDays: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: -0.48,
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    gap: 3,
  },
  changeAmount: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.48,
  },

  // Action Buttons
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.xl,
    paddingTop: 28,
    paddingBottom: 16,
  },
  actionBtn: {
    alignItems: 'center',
    gap: 8,
  },
  actionIconWrap: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.5,
  },

  // Documents Popover
  popoverBackdrop: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  popoverAnchor: {
    position: 'absolute',
    right: spacing.xl,
    top: 280,
  },
  popover: {
    backgroundColor: colors.tabBarBg,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  popoverItem: {
    paddingVertical: 2,
  },
  popoverText: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.4,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.textSecondary,
    marginHorizontal: 9,
  },

  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: 14,
    paddingBottom: 6,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.75,
  },

  // Card Items
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    gap: 6,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  cardDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.textPrimary,
  },
  cardLast4Row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardLast4: {
    fontSize: 11,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.33,
  },
  cardSpent: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.36,
  },
});
