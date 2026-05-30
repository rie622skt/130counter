// 円表記のユーティリティ（ja-JP, 小数なし）
const yenFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
  maximumFractionDigits: 0,
});

const numFormatter = new Intl.NumberFormat('ja-JP', { maximumFractionDigits: 0 });

/** 例: 1300000 -> "￥1,300,000" */
export function formatYen(value: number): string {
  return yenFormatter.format(Math.round(value));
}

/** 記号なしのカンマ区切り。例: 1300000 -> "1,300,000" */
export function formatNumber(value: number): string {
  return numFormatter.format(Math.round(value));
}

/** 「万円」表記。例: 1300000 -> "130万円", 1305000 -> "130.5万円" */
export function formatMan(value: number): string {
  const man = value / 10000;
  const rounded = Math.round(man * 10) / 10;
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return `${text}万円`;
}

/** 入力文字列から数値だけを取り出す（全角数字・カンマ・円記号などを除去） */
export function parseYenInput(input: string): number {
  const normalized = input
    .replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0))
    .replace(/[^0-9]/g, '');
  if (!normalized) return 0;
  return parseInt(normalized, 10);
}
