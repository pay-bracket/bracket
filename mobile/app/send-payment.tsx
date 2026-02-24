import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NumpadGrid } from '@/components/numpad-grid';
import { colors, spacing } from '@/constants/theme';
import { useApp } from '@/lib/store';

export default function SendPaymentScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { contactId } = useLocalSearchParams<{ contactId: string }>();
  const { state, dispatch } = useApp();

  const contact = state.contacts.find((c) => c.id === contactId);
  const contactName = contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown';

  const [amount, setAmount] = useState('0');
  const [memo, setMemo] = useState('');
  const [sendAsap, setSendAsap] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const amountNum = parseFloat(amount) || 0;
  const displayAmount = '$' + (amountNum === 0 ? '0.00' : amountNum.toFixed(2));

  const handlePress = (key: string) => {
    if (key === '.') {
      if (amount.includes('.')) return;
      setAmount(amount + '.');
      return;
    }
    if (amount.includes('.')) {
      const decimals = amount.split('.')[1];
      if (decimals.length >= 2) return;
    }
    if (amount === '0' && key !== '.') {
      setAmount(key);
    } else {
      setAmount(amount + key);
    }
  };

  const handleDelete = () => {
    if (amount.length <= 1) {
      setAmount('0');
    } else {
      setAmount(amount.slice(0, -1));
    }
  };

  const handleSend = () => {
    if (amountNum <= 0 || !contact) return;
    setShowConfirm(true);
  };

  const handleConfirmSend = () => {
    if (!contact) return;
    dispatch({
      type: 'SEND_MONEY',
      payload: {
        contactId: contact.id,
        contactName,
        contactInitials: contact.initials,
        contactColor: contact.color,
        amount: amountNum,
        memo,
      },
    });
    setShowConfirm(false);
    router.replace({
      pathname: '/send-confirmed',
      params: {
        amount: amountNum.toFixed(2),
        name: contactName,
        transactionId: `TXN-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 999) + 100)}`,
      },
    } as any);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={14}>
          <Ionicons name="chevron-back" size={28} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Send Money</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Contact Display */}
        {contact && (
          <View style={styles.contactSection}>
            <View style={[styles.contactAvatar, { backgroundColor: contact.color }]}>
              <Text style={styles.contactInitials}>{contact.initials}</Text>
            </View>
            <Text style={styles.contactName}>{contactName}</Text>
          </View>
        )}

        {/* Amount Display */}
        <Text style={styles.amountDisplay}>{displayAmount}</Text>

        {/* Memo Field */}
        <View style={styles.memoContainer}>
          <TextInput
            style={styles.memoInput}
            placeholder="What is this for?"
            placeholderTextColor={colors.textTertiary}
            value={memo}
            onChangeText={setMemo}
          />
        </View>

        {/* Numpad */}
        <View style={styles.numpadContainer}>
          <NumpadGrid onPress={handlePress} onDelete={handleDelete} />
        </View>

        {/* Send ASAP Toggle */}
        <Pressable
          style={styles.asapRow}
          onPress={() => setSendAsap(!sendAsap)}
        >
          <Ionicons name="time-outline" size={20} color={colors.textPrimary} />
          <Text style={styles.asapText}>Send ASAP</Text>
          <View style={{ flex: 1 }} />
          <View style={[styles.toggle, sendAsap && styles.toggleActive]}>
            <View style={[styles.toggleThumb, sendAsap && styles.toggleThumbActive]} />
          </View>
        </Pressable>

        {/* Send Button */}
        <Pressable
          style={({ pressed }) => [styles.sendButton, amountNum <= 0 && styles.sendButtonDisabled, pressed && amountNum > 0 && { opacity: 0.7 }]}
          onPress={handleSend}
          disabled={amountNum <= 0}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal visible={showConfirm} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalDialog}>
            <Text style={styles.modalTitle}>Confirm Payment</Text>
            <Text style={styles.modalMessage}>
              You are about to send ${amountNum.toFixed(2)} to {contactName}. This action cannot be undone.
            </Text>
            <Pressable
              style={({ pressed }) => [styles.modalSendButton, pressed && { opacity: 0.7 }]}
              onPress={handleConfirmSend}
            >
              <Text style={styles.modalSendText}>Send</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.modalCancelButton, pressed && { opacity: 0.7 }]}
              onPress={() => setShowConfirm(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    paddingTop: 6,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 40,
  },
  contactSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 12,
  },
  contactAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInitials: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  contactName: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.6,
    marginTop: 8,
  },
  amountDisplay: {
    fontSize: 37,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -1.1,
    textAlign: 'center',
    paddingVertical: 16,
  },
  memoContainer: {
    marginBottom: 16,
  },
  memoInput: {
    borderWidth: 1,
    borderColor: '#ACACAC',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textPrimary,
    letterSpacing: -0.48,
  },
  numpadContainer: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  asapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  asapText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.48,
  },
  toggle: {
    width: 44,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: colors.accent,
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.white,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  sendButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 100,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  sendButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: -0.6,
  },
  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  modalDialog: {
    backgroundColor: colors.white,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#737373',
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.6,
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.48,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  modalSendButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 100,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  modalSendText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: -0.54,
  },
  modalCancelButton: {
    paddingVertical: 10,
  },
  modalCancelText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E82428',
    letterSpacing: -0.54,
  },
});
