import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { Account } from '@/lib/mock-data';

type AccountHeaderProps = {
  account: Account;
};

export function AccountHeader({ account }: AccountHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{account.avatar}</Text>
      </View>
      <Text style={styles.name}>{account.name}</Text>
      <Text style={styles.email}>{account.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xxl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: fonts.xxl,
    fontWeight: '700',
    color: colors.white,
  },
  name: {
    fontSize: fonts.xl,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  email: {
    fontSize: fonts.sm,
    color: colors.textSecondary,
  },
});
