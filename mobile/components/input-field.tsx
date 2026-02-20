import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, fonts, radius, spacing } from '@/constants/theme';

type InputFieldProps = TextInputProps & {
  label: string;
};

export function InputField({ label, ...props }: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.textTertiary}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  label: {
    fontSize: fonts.sm,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: radius.md,
    borderCurve: 'continuous',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    fontSize: fonts.md,
    color: colors.textPrimary,
  },
});
