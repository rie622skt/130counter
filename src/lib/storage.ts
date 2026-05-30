import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@130counter/earnings/v1';

export type Earnings = {
  year: number;
  thresholdYen: number; // 既定 1,300,000（130万円の壁）
  monthsYen: Record<number, number>; // 1..12 -> 円
  updatedAt: string;
};

export const DEFAULT_THRESHOLD = 1_300_000;

export function createDefaultEarnings(year = new Date().getFullYear()): Earnings {
  return {
    year,
    thresholdYen: DEFAULT_THRESHOLD,
    monthsYen: {},
    updatedAt: new Date().toISOString(),
  };
}

export async function loadEarnings(): Promise<Earnings> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultEarnings();
    const parsed = JSON.parse(raw) as Partial<Earnings>;
    return {
      year: parsed.year ?? new Date().getFullYear(),
      thresholdYen: parsed.thresholdYen ?? DEFAULT_THRESHOLD,
      monthsYen: parsed.monthsYen ?? {},
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return createDefaultEarnings();
  }
}

export async function saveEarnings(data: Earnings): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // 永続化失敗時は黙って続行（UIはメモリ上の状態で動作する）
  }
}
