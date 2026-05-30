import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { border, color, radius, space } from '@/theme';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

// 白面カード。ヘアライン枠・影なし（light面の立体感はsurface contrastで出す）。
export function Card({ children, style }: Props) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.canvasWhite,
    borderRadius: radius.sm,
    borderWidth: border.hairline,
    borderColor: color.hairline,
    padding: space['2xl'],
  },
});
