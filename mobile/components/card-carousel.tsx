import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { spacing } from '@/constants/theme';
import { CreditCard } from '@/components/credit-card';
import { Card } from '@/lib/mock-data';

type CardCarouselProps = {
  cards: Card[];
};

export function CardCarousel({ cards }: CardCarouselProps) {
  const { width } = useWindowDimensions();
  const cardWidth = width - spacing.xl * 4;

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={cardWidth + spacing.lg}
      contentContainerStyle={[styles.container, { paddingHorizontal: spacing.xl }]}
    >
      {cards.map((card) => (
        <CreditCard key={card.id} card={card} width={cardWidth} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
});
