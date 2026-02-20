import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActionButton } from '@/components/action-button';
import { InputField } from '@/components/input-field';
import { colors, fonts, spacing } from '@/constants/theme';

export default function NewInvoiceScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="close" size={28} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>New Invoice</Text>
        <View style={{ width: 28 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
        >
          <InputField
            label="Amount"
            placeholder="$0.00"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />
          <InputField
            label="Recipient"
            placeholder="Enter name or email"
            value={recipient}
            onChangeText={setRecipient}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InputField
            label="Description"
            placeholder="What's this for?"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
          <ActionButton title="Send Invoice" onPress={() => router.back()} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
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
  form: {
    padding: spacing.xl,
    gap: spacing.xl,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
});
