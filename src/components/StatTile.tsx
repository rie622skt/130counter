import { StyleSheet, Text, View } from 'react-native';

import { Eyebrow } from '@/components/Eyebrow';
import { border, color, radius, space, type } from '@/theme';

type Props = {
  label: string;
  value: string;
  sub?: string;
  tinted?: boolean; // ミント地（stats-card-tinted）
};

// 統計タイル。大きな数字＋モノ・アイブロウ。ミント地はアクセントに。
export function StatTile({ label, value, sub, tinted = true }: Props) {
  return (
    <View
      style={[
        styles.tile,
        { backgroundColor: tinted ? color.mint : color.canvasWhite },
      ]}>
      <Eyebrow>{label}</Eyebrow>
      <Text style={[type.displayLg, styles.value]} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      {sub ? <Text style={[type.caption, styles.sub]}>{sub}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: radius.sm,
    borderWidth: border.hairline,
    borderColor: color.hairline,
    padding: space['3xl'],
    gap: space.sm,
    flexGrow: 1,
    flexBasis: 150,
    minWidth: 140,
  },
  value: {
    color: color.ink,
  },
  sub: {
    color: color.body,
  },
});
