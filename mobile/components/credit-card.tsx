import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, spacing } from '@/constants/theme';
import { Card } from '@/lib/mock-data';

type CreditCardProps = {
  card: Card;
  width?: number;
};

const gradientMap = {
  blue: colors.cardBlueGradient,
  red: colors.cardRedGradient,
  black: colors.cardBlackGradient,
} as const;

export function CreditCard({ card, width = 300 }: CreditCardProps) {
  const gradient = gradientMap[card.color];

  return (
    <LinearGradient
      colors={[...gradient]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, { width }]}
    >
      <View style={styles.top}>
        <Text style={styles.brandText}>Bracket</Text>
        <Text style={styles.typeText}>{card.type.toUpperCase()}</Text>
      </View>
      <Text style={styles.number}>•••• •••• •••• {card.last4}</Text>
      <View style={styles.bottom}>
        <View>
          <Text style={styles.label}>CARD HOLDER</Text>
          <Text style={styles.value}>{card.holder}</Text>
        </View>
        <View>
          <Text style={styles.label}>EXPIRES</Text>
          <Text style={styles.value}>{card.expiry}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 1.586,
    borderRadius: radius.xl,
    borderCurve: 'continuous',
    padding: spacing.xxl,
    justifyContent: 'space-between',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandText: {
    fontSize: fonts.xl,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  typeText: {
    fontSize: fonts.xs,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
  },
  number: {
    fontSize: fonts.xxl,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1,
    marginBottom: 2,
  },
  value: {
    fontSize: fonts.sm,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
