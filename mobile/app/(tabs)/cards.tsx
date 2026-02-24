import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, spacing } from '@/constants/theme';
import { useApp } from '@/lib/store';

export default function CardsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { state } = useApp();
  const { account, debitCards } = state;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header: Search + Profile */}
        <View style={styles.header}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={17} color={colors.textSecondary} />
            <Text style={styles.searchPlaceholder}>Search</Text>
          </View>
          <Pressable onPress={() => router.push('/account')} hitSlop={8}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileText}>{account.avatar}</Text>
            </View>
          </Pressable>
        </View>

        {/* First Card */}
        <Pressable
          style={({ pressed }) => [pressed && { opacity: 0.7 }]}
          onPress={() => router.push({ pathname: '/card/[id]', params: { id: debitCards[0].id } } as any)}
        >
          <View style={styles.cardSection}>
            <Text style={styles.cardName}>{debitCards[0].name}</Text>
            <View style={styles.cardInfoRow}>
              <Ionicons name="card-outline" size={18} color={colors.textPrimary} />
              <View style={styles.dot} />
              <Text style={styles.cardLast4}>{debitCards[0].last4}</Text>
            </View>
            <View style={styles.cardVisual}>
              <View style={styles.cardVisualInner} />
            </View>
          </View>
        </Pressable>

        {/* Add to Apple Pay */}
        <Pressable style={({ pressed }) => [styles.applePayButton, pressed && { opacity: 0.8 }]}>
          <Text style={styles.applePayText}>Add to  Pay</Text>
        </Pressable>

        {/* Quick Actions */}
        <View style={styles.quickActionsRow}>
          <QuickAction icon="eye-outline" label="View Details" />
          <QuickAction icon="lock-closed-outline" label="Lock Card" />
          <QuickAction icon="create-outline" label="Change PIN" />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Second Card */}
        <Pressable
          style={({ pressed }) => [pressed && { opacity: 0.7 }]}
          onPress={() => router.push({ pathname: '/card/[id]', params: { id: debitCards[1].id } } as any)}
        >
          <View style={styles.cardSection}>
            <Text style={styles.cardName}>{debitCards[1].name}</Text>
            <View style={styles.cardInfoRow}>
              <Ionicons name="card-outline" size={18} color={colors.textPrimary} />
              <View style={styles.dot} />
              <Text style={styles.cardLast4}>{debitCards[1].last4}</Text>
            </View>
            <View style={styles.cardVisual}>
              <View style={styles.cardVisualInner} />
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function QuickAction({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <Pressable style={({ pressed }) => [styles.quickAction, pressed && { opacity: 0.7 }]}>
      <Ionicons name={icon} size={26} color={colors.textPrimary} />
      <Text style={styles.quickActionLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: 6,
    paddingBottom: 4,
    gap: spacing.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(120, 120, 128, 0.16)',
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  searchPlaceholder: {
    fontSize: 17,
    color: colors.textSecondary,
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

  // Card Section
  cardSection: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  cardName: {
    fontSize: fonts.xl,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  cardInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    marginBottom: spacing.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textPrimary,
  },
  cardLast4: {
    fontSize: fonts.md,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.48,
  },
  cardVisual: {
    aspectRatio: 1.586,
    borderRadius: radius.xl,
    borderCurve: 'continuous',
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  cardVisualInner: {
    flex: 1,
    backgroundColor: '#D1D5DB',
    borderRadius: radius.xl,
    borderCurve: 'continuous',
  },

  // Apple Pay
  applePayButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 100,
    paddingVertical: 14,
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  applePayText: {
    fontSize: fonts.display,
    fontWeight: '700',
    color: colors.white,
  },

  // Quick Actions
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  quickAction: {
    alignItems: 'center',
    gap: 6,
  },
  quickActionLabel: {
    fontSize: fonts.xs,
    fontWeight: '400',
    color: colors.textPrimary,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.textSecondary,
    marginHorizontal: 9,
    marginVertical: spacing.md,
  },
});
