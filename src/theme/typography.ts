import { TextStyle } from 'react-native';

// フォントファミリ名（_layout.tsx の useFonts で読み込むキーと一致させる）
// 表示用サンセリフ=Inter / モノ見出し・ボタン=JetBrains Mono
export const fonts = {
  display: 'Inter_500Medium', // 見出し（sentence-case、weight 500）
  displayRegular: 'Inter_400Regular',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  mono: 'JetBrainsMono_500Medium', // アイブロウ/ボタン（uppercase・正トラッキング）
} as const;

// 提示の type スケールに準拠。負トラッキングは display 系のみ、mono は正トラッキング。
export const type = {
  // Hero の巨大数字（display-xxl 相当をモバイル向けに調整）
  displayXxl: {
    fontFamily: fonts.display,
    fontSize: 56,
    lineHeight: 60,
    letterSpacing: -1.4,
  } as TextStyle,
  displayXl: {
    fontFamily: fonts.display,
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: -0.7,
  } as TextStyle,
  displayLg: {
    fontFamily: fonts.display,
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.42,
  } as TextStyle,
  displayMd: {
    fontFamily: fonts.display,
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: -0.22,
  } as TextStyle,
  bodyLg: {
    fontFamily: fonts.body,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.18,
  } as TextStyle,
  bodyMd: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.16,
  } as TextStyle,
  bodyMdStrong: {
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.16,
  } as TextStyle,
  caption: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,
  // モノ系（常に uppercase・正トラッキング）
  monoButton: {
    fontFamily: fonts.mono,
    fontSize: 15,
    lineHeight: 16,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  } as TextStyle,
  monoEyebrow: {
    fontFamily: fonts.mono,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  } as TextStyle,
} as const;
