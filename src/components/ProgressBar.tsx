import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { brandGradient, color, radius } from '@/theme';

type Props = {
  ratio: number; // 0..1
  over?: boolean; // 超過時
  tone?: 'light' | 'dark';
};

// 進捗バー。フィルはブランドグラデ（orange→magenta→periwinkle）— 唯一の装飾。
// 超過時はトラックをオレンジ寄りで強調。
export function ProgressBar({ ratio, over = false, tone = 'dark' }: Props) {
  const clamped = Math.max(0, Math.min(ratio, 1));
  const trackColor = tone === 'dark' ? color.surfaceDarkSoft : color.hairline;

  return (
    <View
      style={[styles.track, { backgroundColor: over ? color.accentOrange : trackColor }]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}>
      <LinearGradient
        colors={[...brandGradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.fill, { width: `${clamped * 100}%` }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 16,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.sm,
    minWidth: 4,
  },
});
