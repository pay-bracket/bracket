import { StyleSheet, Text, View } from 'react-native';

type IconCircleProps = {
  emoji: string;
  color: string;
  size?: number;
};

export function IconCircle({ emoji, color, size = 44 }: IconCircleProps) {
  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color + '20',
        },
      ]}
    >
      <Text style={{ fontSize: size * 0.45 }}>{emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
