import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing } from '@/constants/theme';

type NumpadGridProps = {
  onPress: (value: string) => void;
  onDelete: () => void;
};

const keys = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'delete'],
];

export function NumpadGrid({ onPress, onDelete }: NumpadGridProps) {
  return (
    <View style={styles.grid}>
      {keys.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.row}>
          {row.map((key) => (
            <Pressable
              key={key}
              onPress={() => (key === 'delete' ? onDelete() : onPress(key))}
              style={({ pressed }) => [styles.key, pressed && { opacity: 0.5 }]}
            >
              {key === 'delete' ? (
                <Ionicons name="backspace-outline" size={28} color={colors.textPrimary} />
              ) : (
                <Text style={styles.keyText}>{key}</Text>
              )}
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  key: {
    flex: 1,
    aspectRatio: 1.6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderCurve: 'continuous',
  },
  keyText: {
    fontSize: fonts.xxxl,
    fontWeight: '500',
    color: colors.textPrimary,
  },
});
