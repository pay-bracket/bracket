import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NumpadGrid } from '@/components/numpad-grid';
import { colors, spacing } from '@/constants/theme';
import { useApp } from '@/lib/store';

type LineItem = {
  id: string;
  description: string;
  amount: string;
};

let nextItemId = 1;

export default function RequestInvoiceScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { contactId } = useLocalSearchParams<{ contactId: string }>();
  const { state } = useApp();

  const contact = state.contacts.find((c) => c.id === contactId);
  const contactName = contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown';

  const [items, setItems] = useState<LineItem[]>([
    { id: String(nextItemId++), description: '', amount: '0' },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  const handlePress = (key: string) => {
    setItems((prev) => {
      const updated = [...prev];
      const current = updated[activeIndex];
      let amt = current.amount;

      if (key === '.') {
        if (amt.includes('.')) return prev;
        amt = amt + '.';
      } else {
        if (amt.includes('.')) {
          const decimals = amt.split('.')[1];
          if (decimals.length >= 2) return prev;
        }
        if (amt === '0') {
          amt = key;
        } else {
          amt = amt + key;
        }
      }

      updated[activeIndex] = { ...current, amount: amt };
      return updated;
    });
  };

  const handleDelete = () => {
    setItems((prev) => {
      const updated = [...prev];
      const current = updated[activeIndex];
      let amt = current.amount;
      if (amt.length <= 1) {
        amt = '0';
      } else {
        amt = amt.slice(0, -1);
      }
      updated[activeIndex] = { ...current, amount: amt };
      return updated;
    });
  };

  const addItem = () => {
    const newItem = { id: String(nextItemId++), description: '', amount: '0' };
    setItems((prev) => [...prev, newItem]);
    setActiveIndex(items.length);
  };

  const updateDescription = (index: number, text: string) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], description: text };
      return updated;
    });
  };

  const handleNext = () => {
    const lineItems = items.map((item) => ({
      id: item.id,
      description: item.description || 'Item',
      amount: parseFloat(item.amount) || 0,
    }));
    router.push({
      pathname: '/invoice-preview',
      params: {
        contactId: contactId,
        lineItems: JSON.stringify(lineItems),
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
        <Text style={styles.headerTitle}>Request Invoice</Text>
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

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Item</Text>
          <Text style={[styles.tableHeaderText, { width: 100, textAlign: 'right' }]}>Price</Text>
        </View>

        {/* Line Items */}
        {items.map((item, index) => (
          <Pressable
            key={item.id}
            style={[styles.tableRow, activeIndex === index && styles.tableRowActive]}
            onPress={() => setActiveIndex(index)}
          >
            <TextInput
              style={[styles.itemDescription, { flex: 1 }]}
              placeholder="Item description"
              placeholderTextColor={colors.textTertiary}
              value={item.description}
              onChangeText={(text) => updateDescription(index, text)}
              onFocus={() => setActiveIndex(index)}
            />
            <Text style={styles.itemAmount}>
              ${(parseFloat(item.amount) || 0).toFixed(2)}
            </Text>
          </Pressable>
        ))}

        {/* Total Row */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>

        {/* Add Item Button */}
        <Pressable
          style={({ pressed }) => [styles.addItemButton, pressed && { opacity: 0.7 }]}
          onPress={addItem}
        >
          <Text style={styles.addItemText}>Add Item</Text>
        </Pressable>

        {/* Numpad */}
        <View style={styles.numpadContainer}>
          <NumpadGrid onPress={handlePress} onDelete={handleDelete} />
        </View>

        {/* Next Button */}
        <Pressable
          style={({ pressed }) => [styles.nextButton, total <= 0 && styles.nextButtonDisabled, pressed && total > 0 && { opacity: 0.7 }]}
          onPress={handleNext}
          disabled={total <= 0}
        >
          <Text style={styles.nextButtonText}>Next</Text>
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
  contactSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
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
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: -0.42,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableRowActive: {
    backgroundColor: '#EAF6FF',
    marginHorizontal: -4,
    paddingHorizontal: 4,
    borderRadius: 6,
  },
  itemDescription: {
    fontSize: 16,
    color: colors.textPrimary,
    letterSpacing: -0.48,
    padding: 0,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.48,
    width: 100,
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 2,
    borderTopColor: colors.textPrimary,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.54,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.54,
  },
  addItemButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 100,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 12,
  },
  addItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: -0.48,
  },
  numpadContainer: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 100,
    paddingVertical: 14,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    opacity: 0.4,
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: -0.6,
  },
});
