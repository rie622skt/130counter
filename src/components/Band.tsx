import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { color, layout, space } from '@/theme';

type Props = {
  children: ReactNode;
  tone?: 'navy' | 'white';
  style?: StyleProp<ViewStyle>;
};

// 全幅の交互バンド（navy↔white）。中間グレーは置かず、面のコントラストで区切る。
// 色はedge-to-edge、コンテンツは中央寄せ＆最大幅でセンタリング。
export function Band({ children, tone = 'white', style }: Props) {
  const bg = tone === 'navy' ? color.canvasNavy : color.canvasWhite;
  return (
    <View style={[styles.band, { backgroundColor: bg }]}>
      <View style={[styles.inner, style]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  band: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: space['5xl'],
    paddingHorizontal: space.lg,
  },
  inner: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
  },
});
