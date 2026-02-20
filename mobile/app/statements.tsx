import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/theme';
import { account, statementSections } from '@/lib/mock-data';

export default function StatementsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={32} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={17} color="#727272" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#727272"
          />
        </View>
        <View style={styles.profileCircle}>
          <Text style={styles.profileText}>{account.avatar}</Text>
        </View>
      </View>

      {/* Generate Custom Statement */}
      <View style={styles.customRow}>
        <Pressable>
          <Text style={styles.customLink}>Generate Custom Statement</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {statementSections.map((section) => (
          <View key={section.title}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.title === '2025' && (
                <Ionicons name="chevron-down" size={20} color={colors.textPrimary} style={{ marginLeft: 4 }} />
              )}
            </View>
            {section.data.map((statement) => (
              <Pressable key={statement.id} style={styles.statementRow}>
                <View style={styles.fileIconWrap}>
                  <Ionicons name="document-outline" size={16} color={colors.textPrimary} />
                </View>
                <Text style={styles.statementLabel}>{statement.label}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(120, 120, 128, 0.16)',
    borderRadius: 100,
    paddingHorizontal: 12,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: colors.textPrimary,
    padding: 0,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: -0.45,
  },
  customRow: {
    paddingHorizontal: spacing.xl,
    paddingTop: 16,
    paddingBottom: 12,
    alignItems: 'flex-end',
  },
  customLink: {
    fontSize: 14,
    fontWeight: '400',
    color: '#001EE0',
    letterSpacing: -0.08,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl + 2,
    paddingTop: 20,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.textPrimary,
    letterSpacing: -0.08,
  },
  statementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl - 3,
    paddingVertical: 6,
    gap: 9,
  },
  fileIconWrap: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: colors.tabBarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statementLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.08,
  },
});
