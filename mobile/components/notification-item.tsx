import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { Notification } from '@/lib/mock-data';

type NotificationItemProps = {
  notification: Notification;
  onPress?: () => void;
};

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        !notification.read && styles.unread,
        pressed && { opacity: 0.7 },
      ]}
    >
      <View style={[styles.dot, { opacity: notification.read ? 0 : 1 }]} />
      <View style={styles.content}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message} numberOfLines={2}>
          {notification.message}
        </Text>
      </View>
      <Text style={styles.time}>{notification.time}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  unread: {
    backgroundColor: colors.accent + '08',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: fonts.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  message: {
    fontSize: fonts.sm,
    color: colors.textSecondary,
  },
  time: {
    fontSize: fonts.xs,
    color: colors.textTertiary,
  },
});
