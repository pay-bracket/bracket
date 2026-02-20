import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';

type SectionHeaderProps = {
  title: string;
  action?: string;
  onAction?: () => void;
};

export function SectionHeader({ title, action, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {action && (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={styles.action}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: fonts.lg,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  action: {
    fontSize: fonts.sm,
    fontWeight: '500',
    color: colors.accent,
  },
});
