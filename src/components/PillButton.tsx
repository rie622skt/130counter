import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { color, radius, space, type } from '@/theme';

type Variant = 'primary' | 'mint' | 'white';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
};

// 黒角丸4のCTAピル。ラベルはモノ大文字。1ビューに黒ピルは原則ひとつ。
// mint/white はヒーロー文脈のセカンダリ専用。フルピル(full)にはしない。
export function PillButton({ label, onPress, variant = 'primary', style }: Props) {
  const bg =
    variant === 'mint'
      ? color.mint
      : variant === 'white'
        ? color.canvasWhite
        : color.cta;
  const fg = variant === 'primary' ? color.ctaText : color.ink;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: bg, opacity: pressed ? 0.85 : 1 },
        variant === 'white' && styles.whiteBorder,
        style,
      ]}>
      <View style={styles.inner}>
        <Text style={[type.monoButton, { color: fg }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.sm,
    minHeight: 52, // タッチターゲット ≥44px（主婦向けに余裕を持たせる）
    justifyContent: 'center',
  },
  whiteBorder: {
    borderWidth: 1,
    borderColor: color.hairline,
  },
  inner: {
    paddingVertical: space.lg,
    paddingHorizontal: space['2xl'],
    alignItems: 'center',
  },
});
