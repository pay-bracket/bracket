import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { Animated, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import { colors, fonts, radius, spacing } from '@/constants/theme';
import { MenuItem } from '@/components/menu-item';

type MenuDrawerProps = {
  visible: boolean;
  onClose: () => void;
};

export function MenuDrawer({ visible, onClose }: MenuDrawerProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const drawerWidth = width * 0.75;
  const translateX = useRef(new Animated.Value(-drawerWidth)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -drawerWidth,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  const navigate = (route: Href) => {
    onClose();
    setTimeout(() => router.push(route), 300);
  };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View style={[styles.overlay, { opacity }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      <Animated.View
        style={[
          styles.drawer,
          {
            width: drawerWidth,
            paddingTop: insets.top + spacing.lg,
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.brand}>Bracket</Text>
          <Pressable onPress={onClose} hitSlop={8}>
            <Ionicons name="close" size={24} color={colors.textSecondary} />
          </Pressable>
        </View>
        <View style={styles.menu}>
          <MenuItem icon="compass" label="Browse" onPress={onClose} />
          <MenuItem icon="person" label="Accounts" onPress={() => navigate('/account')} />
          <MenuItem icon="people" label="Recipients" onPress={onClose} />
          <MenuItem
            icon="notifications"
            label="Notifications"
            onPress={() => navigate('/notifications')}
          />
          <MenuItem icon="settings" label="Settings" onPress={onClose} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderTopRightRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    borderCurve: 'continuous',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  brand: {
    fontSize: fonts.xxl,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  menu: {
    gap: spacing.xs,
  },
});
