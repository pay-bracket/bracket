import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors, fonts, radius, spacing } from '@/constants/theme';
import { Category } from '@/lib/mock-data';

type FilterPillsProps = {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
};

export function FilterPills({ categories, selected, onSelect }: FilterPillsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => {
        const isSelected = cat.id === selected;
        return (
          <Pressable
            key={cat.id}
            onPress={() => onSelect(cat.id)}
            style={[
              styles.pill,
              {
                backgroundColor: isSelected ? cat.color : colors.white,
                borderColor: isSelected ? cat.color : colors.border,
              },
            ]}
          >
            <Text style={styles.emoji}>{cat.emoji}</Text>
            <Text
              style={[
                styles.label,
                { color: isSelected ? colors.white : colors.textSecondary },
              ]}
            >
              {cat.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderCurve: 'continuous',
    borderWidth: 1,
  },
  emoji: {
    fontSize: 14,
  },
  label: {
    fontSize: fonts.sm,
    fontWeight: '500',
  },
});
