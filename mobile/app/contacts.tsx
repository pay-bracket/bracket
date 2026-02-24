import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/theme';
import { Contact } from '@/lib/mock-data';
import { useContacts } from '@/lib/store';

export default function ContactsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { mode } = useLocalSearchParams<{ mode: string }>();
  const contacts = useContacts();
  const [search, setSearch] = useState('');

  const sections = useMemo(() => {
    const filtered = search.trim()
      ? contacts.filter((c) => `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()))
      : contacts;

    const groups: Record<string, Contact[]> = {};
    for (const c of filtered) {
      const letter = c.firstName.charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(c);
    }
    return Object.keys(groups)
      .sort()
      .map((letter) => ({ title: letter, data: groups[letter] }));
  }, [contacts, search]);

  const handleContactPress = (contact: Contact) => {
    if (mode === 'request') {
      router.push({ pathname: '/request-invoice', params: { contactId: contact.id } } as any);
    } else {
      router.push({ pathname: '/send-payment', params: { contactId: contact.id } } as any);
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={14}>
          <Ionicons name="chevron-back" size={28} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={17} color="#727272" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts"
            placeholderTextColor="#727272"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')} hitSlop={8}>
              <Ionicons name="close-circle" size={17} color="#727272" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Add Contact Button */}
      <View style={styles.addButtonContainer}>
        <Pressable
          style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.7 }]}
          onPress={() => router.push('/new-contact' as any)}
        >
          <Text style={styles.addButtonText}>Add Contact</Text>
        </Pressable>
      </View>

      {/* Contacts List */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.contactRow, pressed && { opacity: 0.7 }]}
            onPress={() => handleContactPress(item)}
          >
            <View style={[styles.avatar, { backgroundColor: item.color }]}>
              <Text style={styles.avatarText}>{item.initials}</Text>
            </View>
            <Text style={styles.contactName}>{item.firstName} {item.lastName}</Text>
          </Pressable>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />
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
    paddingHorizontal: spacing.xl,
    paddingTop: 6,
    paddingBottom: 4,
    gap: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(120, 120, 128, 0.16)',
    borderRadius: 100,
    paddingHorizontal: 11,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: colors.textPrimary,
    letterSpacing: -0.08,
    padding: 0,
  },
  addButtonContainer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: 12,
  },
  addButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 100,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: -0.48,
  },
  sectionHeader: {
    paddingHorizontal: spacing.xl,
    paddingTop: 12,
    paddingBottom: 4,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: -0.42,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: 8,
    backgroundColor: '#D0EDFF',
    marginHorizontal: spacing.lg,
    marginVertical: 2,
    borderRadius: 8,
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: -0.42,
  },
  contactName: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  listContent: {
    paddingBottom: 40,
  },
});
