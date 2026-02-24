import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/theme';
import { useApp } from '@/lib/store';

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  coffee: 'cafe',
  subway: 'train',
  uber: 'car',
  employer: 'business',
};

const categoryLabels: Record<string, string> = {
  food: 'Food & Drink',
  transport: 'Transportation',
  transfer: 'Transfer',
  income: 'Income',
};

function formatDetailDate(dateStr: string, time?: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const str = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  return time ? `${str} at ${time}` : str;
}

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [noteText, setNoteText] = useState('');
  const { state } = useApp();
  const { account } = state;

  const txn = state.transactions.find((t) => t.id === id);

  if (!txn) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <Text style={styles.notFound}>Transaction not found</Text>
      </View>
    );
  }

  const isCredit = txn.type === 'credit';
  const amountPrefix = isCredit ? '+' : '-';
  const amountColor = isCredit ? colors.success : colors.danger;
  const wholeAmount = Math.floor(txn.amount);
  const cents = '.' + txn.amount.toFixed(2).split('.')[1];

  const copyTransactionId = async () => {
    if (txn.transactionId) {
      await Clipboard.setStringAsync(txn.transactionId);
      Alert.alert('Copied', 'Transaction ID copied to clipboard');
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header: Back + Profile */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={14}>
          <Ionicons name="chevron-back" size={28} color={colors.textPrimary} />
        </Pressable>
        <Pressable onPress={() => router.push('/account')} hitSlop={8}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>{account.avatar}</Text>
          </View>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Merchant Icon */}
        <View style={styles.merchantSection}>
          <View style={[styles.merchantIcon, { backgroundColor: txn.color }]}>
            {txn.iconType === 'initials' ? (
              <Text style={styles.merchantInitials}>{txn.icon}</Text>
            ) : (
              <Ionicons
                name={iconMap[txn.icon] || 'receipt'}
                size={28}
                color={txn.color === '#000000' ? '#FFFFFF' : '#1E1E1E'}
              />
            )}
          </View>

          {/* Merchant Name */}
          <Text style={styles.merchantName}>{txn.name}</Text>

          {/* Category */}
          <Text style={styles.categoryText}>{categoryLabels[txn.category] || txn.category}</Text>

          {/* Amount */}
          <View style={styles.amountRow}>
            <Text style={[styles.amountWhole, { color: amountColor }]}>
              {amountPrefix}{wholeAmount}
            </Text>
            <Text style={[styles.amountCents, { color: amountColor }]}>
              {cents}
            </Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          {/* User + Card Row */}
          <View style={styles.userRow}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>{account.avatar}</Text>
            </View>
            <View style={styles.userDetails}>
              <View style={styles.userNameRow}>
                <Text style={styles.userName}>{account.name}</Text>
                {txn.cardLast4 && (
                  <>
                    <View style={styles.dot} />
                    <Ionicons name="card" size={14} color={colors.textPrimary} />
                    <Text style={styles.cardInfo}>{txn.cardLast4}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.cardInfo} numberOfLines={1}>{txn.cardName}</Text>
                  </>
                )}
              </View>
              <Text style={styles.dateText}>{formatDetailDate(txn.date, txn.time)}</Text>
              {txn.transactionId && (
                <View style={styles.txnIdRow}>
                  <Text style={styles.txnIdText}>Transaction ID</Text>
                  <Pressable onPress={copyTransactionId} hitSlop={8}>
                    <Ionicons name="copy-outline" size={14} color={colors.textSecondary} />
                  </Pressable>
                </View>
              )}
            </View>
          </View>

          {/* Separator */}
          <View style={styles.separator} />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <ActionButton icon="alert-circle-outline" label="Report an error" />
          <ActionButton icon="flag-outline" label="Dispute" />
          <ActionButton icon="document-attach-outline" label="Attach receipt" />
        </View>

        {/* Receipt Section */}
        <View style={styles.receiptSection}>
          <Text style={styles.receiptTitle}>Receipt</Text>
          {txn.receipt ? (
            <View style={styles.receiptFileRow}>
              <Ionicons name="document-outline" size={16} color={colors.textPrimary} />
              <Text style={styles.receiptFileName}>{txn.receipt}</Text>
            </View>
          ) : (
            <Text style={styles.noReceiptText}>No receipt attached</Text>
          )}
        </View>

        {/* Notes Section */}
        <View style={styles.notesSection}>
          <Text style={styles.notesLabel}>Notes</Text>
          {txn.notes && <Text style={styles.notesText}>{txn.notes}</Text>}
          <TextInput
            style={styles.noteInput}
            placeholder="Add a note"
            placeholderTextColor={colors.textSecondary}
            value={noteText}
            onChangeText={setNoteText}
            multiline
          />
          <View style={styles.addButtonRow}>
            <Pressable
              style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.7 }]}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function ActionButton({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <Pressable style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.7 }]}>
      <Ionicons name={icon} size={22} color={colors.textPrimary} />
      <Text style={styles.actionLabel}>{label}</Text>
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
  scrollContent: {
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 6,
    paddingBottom: 4,
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

  // Merchant
  merchantSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
  },
  merchantIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  merchantInitials: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  merchantName: {
    fontSize: 32,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.96,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: spacing.xxxl,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: -0.6,
    marginTop: 4,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 12,
  },
  amountWhole: {
    fontSize: 32.5,
    fontWeight: '400',
    letterSpacing: -0.98,
  },
  amountCents: {
    fontSize: 20.8,
    fontWeight: '400',
    letterSpacing: -0.62,
  },

  // Info
  infoSection: {
    paddingHorizontal: spacing.xl,
    paddingTop: 8,
  },
  userRow: {
    flexDirection: 'row',
    gap: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: -0.45,
  },
  userDetails: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.54,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.textPrimary,
  },
  cardInfo: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.42,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: -0.42,
    marginTop: 2,
  },
  txnIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  txnIdText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: -0.42,
  },
  separator: {
    height: 1,
    backgroundColor: colors.textSecondary,
    marginTop: 14,
    marginLeft: 50,
    width: 111,
  },

  // Actions
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.xl,
    paddingTop: 24,
    paddingBottom: 20,
  },
  actionBtn: {
    alignItems: 'center',
    gap: 6,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.42,
    textAlign: 'center',
  },

  // Receipt
  receiptSection: {
    marginHorizontal: spacing.xl - 5,
    backgroundColor: colors.tabBarBg,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  receiptTitle: {
    fontSize: 16.25,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.49,
  },
  receiptFileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  receiptFileName: {
    fontSize: 16.25,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.49,
  },
  noReceiptText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    marginTop: 4,
  },

  // Notes
  notesSection: {
    paddingHorizontal: spacing.xl + 9,
    paddingTop: 20,
  },
  notesLabel: {
    fontSize: 16.25,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.49,
  },
  notesText: {
    fontSize: 16.25,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.49,
    marginTop: 4,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ACACAC',
    borderRadius: 8,
    paddingHorizontal: 17,
    paddingVertical: 14,
    fontSize: 17,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.43,
    marginTop: 14,
    minHeight: 63,
  },
  addButtonRow: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#B3B3B3',
    borderRadius: 59,
    paddingHorizontal: 22,
    paddingVertical: 8,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.background,
    letterSpacing: -0.05,
  },
});
