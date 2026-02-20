import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, spacing } from '@/constants/theme';
import { account } from '@/lib/mock-data';

export default function QrCodeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>QR Code</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.subtitle}>Scan to pay {account.name}</Text>

        {/* QR Code Placeholder */}
        <View style={styles.qrContainer}>
          <View style={styles.qrCode}>
            {/* Generate a visual grid pattern as QR placeholder */}
            {Array.from({ length: 9 }).map((_, row) => (
              <View key={row} style={styles.qrRow}>
                {Array.from({ length: 9 }).map((_, col) => (
                  <View
                    key={col}
                    style={[
                      styles.qrCell,
                      {
                        backgroundColor:
                          (row + col) % 3 === 0 || (row * col) % 5 === 0
                            ? colors.primary
                            : 'transparent',
                      },
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.accountName}>{account.name}</Text>
        <Text style={styles.accountEmail}>{account.email}</Text>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Pressable style={styles.shareBtn}>
          <Ionicons name="share-outline" size={20} color={colors.accent} />
          <Text style={styles.shareBtnText}>Share QR Code</Text>
        </Pressable>
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
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  subtitle: {
    fontSize: fonts.md,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  qrContainer: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    borderCurve: 'continuous',
    padding: spacing.xxl,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  qrCode: {
    width: 220,
    height: 220,
    gap: 2,
  },
  qrRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 2,
  },
  qrCell: {
    flex: 1,
    borderRadius: 2,
  },
  accountName: {
    fontSize: fonts.xl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.lg,
  },
  accountEmail: {
    fontSize: fonts.sm,
    color: colors.textSecondary,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  shareBtnText: {
    fontSize: fonts.md,
    fontWeight: '600',
    color: colors.accent,
  },
});
