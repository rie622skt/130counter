import { createContext, ReactNode, useContext } from 'react';

import { useEarnings, UseEarnings } from '@/state/useEarnings';

const EarningsContext = createContext<UseEarnings | null>(null);

// 全画面で単一のストアを共有する（モーダルでの保存をホームへ即時反映）。
export function EarningsProvider({ children }: { children: ReactNode }) {
  const value = useEarnings();
  return <EarningsContext.Provider value={value}>{children}</EarningsContext.Provider>;
}

export function useEarningsContext(): UseEarnings {
  const ctx = useContext(EarningsContext);
  if (!ctx) throw new Error('useEarningsContext must be used within EarningsProvider');
  return ctx;
}
