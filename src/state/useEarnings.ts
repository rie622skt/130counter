import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  monthlyAllowance,
  monthsLeftInYear,
  progressRatio,
  remaining,
  totalEarned,
} from '@/lib/calc';
import {
  createDefaultEarnings,
  Earnings,
  loadEarnings,
  saveEarnings,
} from '@/lib/storage';

export type UseEarnings = {
  ready: boolean;
  data: Earnings;
  // 導出値
  total: number;
  remaining: number;
  progress: number; // 0..1
  monthsLeft: number;
  monthlyAllowance: number;
  isOver: boolean;
  // 操作
  setMonth: (month: number, yen: number) => void;
  setThreshold: (yen: number) => void;
  setYear: (year: number) => void;
  reset: () => void;
};

export function useEarnings(): UseEarnings {
  const [data, setData] = useState<Earnings>(() => createDefaultEarnings());
  const [ready, setReady] = useState(false);

  // 初回ロード
  useEffect(() => {
    let active = true;
    loadEarnings().then((loaded) => {
      if (active) {
        setData(loaded);
        setReady(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // 変更ごとに永続化（ロード完了後のみ）
  useEffect(() => {
    if (ready) saveEarnings(data);
  }, [data, ready]);

  const setMonth = useCallback((month: number, yen: number) => {
    setData((prev) => {
      const monthsYen = { ...prev.monthsYen };
      if (yen > 0) monthsYen[month] = yen;
      else delete monthsYen[month];
      return { ...prev, monthsYen, updatedAt: new Date().toISOString() };
    });
  }, []);

  const setThreshold = useCallback((yen: number) => {
    setData((prev) => ({
      ...prev,
      thresholdYen: yen,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const setYear = useCallback((year: number) => {
    setData((prev) => ({ ...prev, year, updatedAt: new Date().toISOString() }));
  }, []);

  const reset = useCallback(() => {
    setData((prev) => ({
      ...createDefaultEarnings(prev.year),
      thresholdYen: prev.thresholdYen,
    }));
  }, []);

  const derived = useMemo(() => {
    const total = totalEarned(data.monthsYen);
    const rem = remaining(data.thresholdYen, data.monthsYen);
    return {
      total,
      remaining: rem,
      progress: progressRatio(data.thresholdYen, data.monthsYen),
      monthsLeft: monthsLeftInYear(),
      monthlyAllowance: monthlyAllowance(data.thresholdYen, data.monthsYen),
      isOver: rem < 0,
    };
  }, [data]);

  return {
    ready,
    data,
    ...derived,
    setMonth,
    setThreshold,
    setYear,
    reset,
  };
}
