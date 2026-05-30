import { StyleSheet, Text, View } from 'react-native';

import { formatYen } from '@/lib/money';
import { color, space, type } from '@/theme';

type Props = {
  amount: number; // 残額（円）。マイナスは超過。
  over: boolean;
};

// ヒーローの主役。「あと ¥XXX,XXX 稼げます」を大きく。
// 超過時はオレンジで警告し、文言を切り替える。
export function BigAmount({ amount, over }: Props) {
  const display = formatYen(Math.abs(amount));
  const numberColor = over ? color.accentOrange : color.inkInverse;

  return (
    <View style={styles.wrap}>
      <Text style={[type.bodyLg, styles.lead]}>
        {over ? '壁を超えています' : 'あと'}
      </Text>
      <Text
        style={[type.displayXxl, { color: numberColor }]}
        numberOfLines={1}
        adjustsFontSizeToFit>
        {over ? `+${display}` : display}
      </Text>
      <Text style={[type.bodyLg, styles.lead]}>
        {over ? 'オーバーした金額です' : '稼げます'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: space.xs,
  },
  lead: {
    color: color.bodyInverse,
  },
});
