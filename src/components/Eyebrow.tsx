import { StyleProp, Text, TextStyle } from 'react-native';

import { color, type } from '@/theme';

type Props = {
  children: string;
  tone?: 'light' | 'dark'; // 背景がlight面かdark面か
  style?: StyleProp<TextStyle>;
};

// モノ大文字の小ラベル。section見出し・タイル見出しに。本文には使わない。
export function Eyebrow({ children, tone = 'light', style }: Props) {
  return (
    <Text
      style={[
        type.monoEyebrow,
        { color: tone === 'dark' ? color.bodyInverse : color.body },
        style,
      ]}>
      {children}
    </Text>
  );
}
