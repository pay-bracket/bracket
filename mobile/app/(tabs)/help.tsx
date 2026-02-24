import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/theme';

export default function HelpScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Logo */}
      <View style={styles.logoSection}>
        <View style={styles.logoIcon}>
          <Text style={styles.logoIconText}>B</Text>
        </View>
        <Text style={styles.logoText}>Bracket</Text>
      </View>

      {/* Contact Info */}
      <View style={styles.contactSection}>
        <ContactRow icon="call-outline" label="Phone" value="+1 (555) 555-5555" />
        <ContactRow icon="print-outline" label="Fax" value="+1 (555) 000-0000" />
        <ContactRow icon="mail-outline" label="Email" value="support@bracketcard.com" />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsSection}>
        <Pressable style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.7 }]}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.white} />
          <Text style={styles.actionButtonText}>Lock a Card</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.actionButton, styles.actionButtonDanger, pressed && { opacity: 0.7 }]}>
          <Ionicons name="flag-outline" size={20} color={colors.white} />
          <Text style={styles.actionButtonText}>Report a Fraudulent Transaction</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.contactRow}>
      <View style={styles.contactIconWrap}>
        <Ionicons name={icon} size={22} color={colors.textPrimary} />
      </View>
      <View>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
    gap: 10,
  },
  logoIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIconText: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.white,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.84,
  },
  contactSection: {
    paddingHorizontal: spacing.xl + 8,
    gap: 20,
    marginBottom: 32,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  contactIconWrap: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: -0.39,
  },
  contactValue: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  actionsSection: {
    paddingHorizontal: spacing.xl,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.textPrimary,
    borderRadius: 100,
    paddingVertical: 14,
  },
  actionButtonDanger: {
    backgroundColor: '#E82428',
  },
  actionButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: -0.5,
  },
});
