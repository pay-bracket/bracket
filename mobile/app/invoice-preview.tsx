import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/theme';
import { InvoiceLineItem } from '@/lib/mock-data';
import { useApp } from '@/lib/store';

export default function InvoicePreviewScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { contactId, lineItems: lineItemsJson } = useLocalSearchParams<{
    contactId: string;
    lineItems: string;
  }>();
  const { state, dispatch } = useApp();

  const contact = state.contacts.find((c) => c.id === contactId);
  const contactName = contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown';
  const lineItems: InvoiceLineItem[] = lineItemsJson ? JSON.parse(lineItemsJson) : [];
  const total = lineItems.reduce((sum, item) => sum + item.amount, 0);

  const handleSend = () => {
    if (!contact) return;
    dispatch({
      type: 'CREATE_INVOICE',
      payload: {
        contactId: contact.id,
        contactName,
        contactInitials: contact.initials,
        contactColor: contact.color,
        amount: total,
        lineItems,
      },
    });
    router.replace({
      pathname: '/invoice-confirmed',
      params: {
        amount: total.toFixed(2),
        name: contactName,
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
        <Text style={styles.headerTitle}>Invoice Preview</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Invoice Card */}
        <View style={styles.invoiceCard}>
          <Text style={styles.invoiceTitle}>Invoice</Text>

          {/* From / To */}
          <View style={styles.partiesRow}>
            <View style={styles.partyBlock}>
              <Text style={styles.partyLabel}>From</Text>
              <Text style={styles.partyName}>{state.account.name}</Text>
              <Text style={styles.partyDetail}>{state.account.email}</Text>
            </View>
            <View style={styles.partyBlock}>
              <Text style={styles.partyLabel}>To</Text>
              <Text style={styles.partyName}>{contactName}</Text>
              {contact?.email && <Text style={styles.partyDetail}>{contact.email}</Text>}
            </View>
          </View>

          {/* Bank Details */}
          <View style={styles.bankDetails}>
            <Text style={styles.bankLabel}>Account: {state.account.accountNumber}</Text>
            <Text style={styles.bankLabel}>Routing: {state.account.routingNumber}</Text>
          </View>

          {/* Line Items Table */}
          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>Item</Text>
              <Text style={[styles.tableHeaderText, { width: 80, textAlign: 'right' }]}>Amount</Text>
            </View>
            {lineItems.map((item, index) => (
              <View key={item.id || index} style={styles.tableDataRow}>
                <Text style={[styles.tableDataText, { flex: 1 }]}>{item.description}</Text>
                <Text style={[styles.tableDataText, { width: 80, textAlign: 'right' }]}>
                  ${item.amount.toFixed(2)}
                </Text>
              </View>
            ))}
            <View style={styles.tableTotalRow}>
              <Text style={[styles.tableTotalText, { flex: 1 }]}>Total</Text>
              <Text style={[styles.tableTotalText, { width: 80, textAlign: 'right' }]}>
                ${total.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Signature Line */}
          <View style={styles.signatureLine}>
            <View style={styles.signatureBar} />
            <Text style={styles.signatureLabel}>Signature</Text>
          </View>
        </View>

        {/* Send Button */}
        <Pressable
          style={({ pressed }) => [styles.sendButton, pressed && { opacity: 0.7 }]}
          onPress={handleSend}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </ScrollView>
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
  invoiceCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    marginTop: 16,
    marginBottom: 24,
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.84,
    marginBottom: 20,
  },
  partiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  partyBlock: {
    flex: 1,
  },
  partyLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: -0.36,
    marginBottom: 4,
  },
  partyName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    letterSpacing: -0.48,
  },
  partyDetail: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: -0.39,
  },
  bankDetails: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginBottom: 16,
  },
  bankLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: -0.39,
    marginVertical: 1,
  },
  table: {
    marginBottom: 20,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.textPrimary,
  },
  tableHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: -0.39,
  },
  tableDataRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableDataText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.45,
  },
  tableTotalRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: colors.textPrimary,
    marginTop: 2,
  },
  tableTotalText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.48,
  },
  signatureLine: {
    marginTop: 20,
  },
  signatureBar: {
    height: 1,
    backgroundColor: colors.textSecondary,
    marginBottom: 4,
  },
  signatureLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: -0.36,
  },
  sendButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 100,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: -0.6,
  },
});
