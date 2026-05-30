import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatYen } from '@/lib/money';
import { border, color, space, type } from '@/theme';

type Props = {
  month: number; // 1..12
  yen: number;
  isCurrent?: boolean;
  onPress: () => void;
};

// 月別の収入行。ヘアラインで静かに。タップで編集へ。
export function MonthRow({ month, yen, isCurrent = false, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${month}月の収入を編集`}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.left}>
        <Text style={[type.bodyMdStrong, styles.month]}>{month}月</Text>
        {isCurrent ? <Text style={[type.monoEyebrow, styles.badge]}>今月</Text> : null}
      </View>
      <Text style={[type.bodyMd, yen > 0 ? styles.amount : styles.empty]}>
        {yen > 0 ? formatYen(yen) : '未入力'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: space.lg,
    paddingHorizontal: space.xs,
    borderBottomWidth: border.hairline,
    borderBottomColor: color.hairline,
  },
  pressed: {
    backgroundColor: color.hairline,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  month: {
    color: color.ink,
  },
  badge: {
    color: color.body,
  },
  amount: {
    color: color.ink,
  },
  empty: {
    color: color.body,
  },
});
