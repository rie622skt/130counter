// 130万円の壁の計算ロジック

export type MonthsYen = Record<number, number>; // 1..12 -> 円

/** 年間累計（入力済みの全月の合計） */
export function totalEarned(months: MonthsYen): number {
  return Object.values(months).reduce((sum, v) => sum + (v || 0), 0);
}

/** あといくら稼げるか（マイナスなら超過） */
export function remaining(threshold: number, months: MonthsYen): number {
  return threshold - totalEarned(months);
}

/** 進捗率 0..1（超過時も1で頭打ち。表示用） */
export function progressRatio(threshold: number, months: MonthsYen): number {
  if (threshold <= 0) return 0;
  return Math.min(totalEarned(months) / threshold, 1);
}

/** 当月（1..12） */
export function currentMonth(): number {
  return new Date().getMonth() + 1;
}

/** 今年の残り月数（当月を含む）。例: 5月なら 8 */
export function monthsLeftInYear(): number {
  return 12 - new Date().getMonth();
}

/**
 * 残りの月で「月いくらまで」稼げるかの目安。
 * 残り月数（当月含む）で残額を割る。超過済みなら 0。
 */
export function monthlyAllowance(threshold: number, months: MonthsYen): number {
  const rem = remaining(threshold, months);
  if (rem <= 0) return 0;
  const left = monthsLeftInYear();
  if (left <= 0) return rem;
  return Math.floor(rem / left);
}
