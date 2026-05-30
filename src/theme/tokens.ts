// 130万円の壁カウンター — デザイントークン
// 提示の「Together AI」風トークンに忠実。主婦向けに親しみを持たせつつ運用する。

export const color = {
  // Surface（ダーク↔白の交互バンド。中間グレーは置かない）
  canvasNavy: '#010120',
  canvasWhite: '#ffffff',
  // ダークバンド内のやや明るい面・区切り
  surfaceDarkSoft: '#313641',
  hairlineDark: '#26263a',
  // Text
  ink: '#000000',
  inkInverse: '#ffffff',
  body: '#999999', // 補助テキスト＆モノ・アイブロウ色（light面）
  bodyInverse: 'rgba(255,255,255,0.66)',
  // 唯一のCTA色（黒ピル）
  cta: '#000000',
  ctaText: '#ffffff',
  // ヒーロー専用のセカンダリ（ミント）
  mint: '#c8f6f9',
  // ヘアライン（light面の1px区切り）
  hairline: '#ebebeb',
  // ブランドグラデの各色（単色UIフィルには使わない）
  accentOrange: '#fc4c02',
  accentMagenta: '#ef2cc1',
  accentPeriwinkle: '#bdbbff',
} as const;

// 唯一の装飾。orange→magenta→periwinkle、順序固定・3stop固定。縮小してアイコンにしない。
export const brandGradient = [
  color.accentOrange,
  color.accentMagenta,
  color.accentPeriwinkle,
] as const;

// 角丸スケール（canonical = 4px。fullは浮遊チャットオーブ等の例外のみ）
export const radius = {
  none: 0,
  xs: 3.25,
  sm: 4, // canonical: ボタン/カード/タイル/行
  md: 8,
  full: 9999,
} as const;

// 4pxベースのスペーシング
export const space = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 44,
  '5xl': 48,
  section: 80,
} as const;

export const border = { hairline: 1 } as const;

// 浮遊要素のみのソフトドロップ（light面カードには影を付けない）
export const shadowSoft = {
  shadowColor: '#010120',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 10,
  elevation: 4,
} as const;

export const layout = {
  maxContentWidth: 720, // 単一カラムの読みやすい上限（主婦向けに広げすぎない）
} as const;
