import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/constants/theme';
import { Transaction } from '@/lib/mock-data';

type TransactionItemProps = {
  transaction: Transaction;
  onPress?: () => void;
};

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  coffee: 'cafe',
  subway: 'train',
  uber: 'car',
  employer: 'business',
};

export function TransactionItem({ transaction, onPress }: TransactionItemProps) {
  const isCredit = transaction.type === 'credit';
  const amountPrefix = isCredit ? '+' : '-';
  const amountColor = isCredit ? colors.success : colors.danger;

  const wholeAmount = Math.floor(transaction.amount);
  const cents = '.' + transaction.amount.toFixed(2).split('.')[1];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.7 }]}
    >
      <View style={[styles.iconCircle, { backgroundColor: transaction.color }]}>
        {transaction.iconType === 'initials' ? (
          <Text style={styles.initialsText}>{transaction.icon}</Text>
        ) : (
          <Ionicons
            name={iconMap[transaction.icon] || 'receipt'}
            size={14}
            color={transaction.color === '#000000' ? '#FFFFFF' : '#1E1E1E'}
          />
        )}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {transaction.name}
      </Text>
      <View style={styles.amountRow}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {amountPrefix}{wholeAmount}
        </Text>
        <Text style={[styles.cents, { color: amountColor }]}>
          {cents}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: 7,
    gap: 14,
  },
  iconCircle: {
    width: 31,
    height: 31,
    borderRadius: 15.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.4,
  },
  name: {
    flex: 1,
    fontSize: 17,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  amount: {
    fontSize: 21,
    fontWeight: '400',
    letterSpacing: -0.6,
  },
  cents: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.4,
  },
});
