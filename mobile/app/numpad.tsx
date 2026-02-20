import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActionButton } from '@/components/action-button';
import { NumpadGrid } from '@/components/numpad-grid';
import { colors, fonts, spacing } from '@/constants/theme';

export default function NumpadScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [value, setValue] = useState('0');

  const handlePress = (key: string) => {
    if (key === '.' && value.includes('.')) return;
    if (value === '0' && key !== '.') {
      setValue(key);
    } else {
      setValue(value + key);
    }
  };

  const handleDelete = () => {
    if (value.length <= 1) {
      setValue('0');
    } else {
      setValue(value.slice(0, -1));
    }
  };

  const displayAmount = value.includes('.')
    ? `$${value}`
    : `$${value}.00`;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="close" size={28} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Enter Amount</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.display}>
        <Text style={styles.amount}>{displayAmount}</Text>
      </View>

      <View style={styles.padContainer}>
        <NumpadGrid onPress={handlePress} onDelete={handleDelete} />
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <ActionButton title="Continue" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
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
  display: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    fontSize: 56,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  padContainer: {
    paddingHorizontal: spacing.xl,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
});
