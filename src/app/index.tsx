import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Band } from '@/components/Band';
import { BigAmount } from '@/components/BigAmount';
import { Eyebrow } from '@/components/Eyebrow';
import { MonthRow } from '@/components/MonthRow';
import { PillButton } from '@/components/PillButton';
import { ProgressBar } from '@/components/ProgressBar';
import { StatTile } from '@/components/StatTile';
import { currentMonth } from '@/lib/calc';
import { formatMan, formatNumber, formatYen } from '@/lib/money';
import { useEarningsContext } from '@/state/EarningsContext';
import { border, color, layout, space, type } from '@/theme';

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const e = useEarningsContext();
  const thisMonth = currentMonth();

  if (!e.ready) {
    return <View style={styles.loading} />;
  }

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* ===== ヒーロー（ネイビー） ===== */}
        <Band tone="navy" style={[styles.hero, { paddingTop: insets.top + space.lg }]}>
          {/* 上部バー：タイトル＋設定 */}
          <View style={styles.topBar}>
            <Eyebrow tone="dark">{`${e.data.year}年 ・ ${formatMan(e.data.thresholdYen)}の壁`}</Eyebrow>
            <Pressable
              onPress={() => router.push('/settings')}
              accessibilityRole="button"
              accessibilityLabel="設定"
              hitSlop={12}
              style={styles.settingsBtn}>
              <Text style={[type.bodyMd, styles.settingsText]}>設定</Text>
            </Pressable>
          </View>

          <View style={styles.heroAmount}>
            <BigAmount amount={e.remaining} over={e.isOver} />
          </View>

          <View style={styles.progressBlock}>
            <ProgressBar ratio={e.progress} over={e.isOver} tone="dark" />
            <View style={styles.progressLabels}>
              <Text style={[type.caption, styles.progressText]}>
                {`今年の収入 ￥${formatNumber(e.total)}`}
              </Text>
              <Text style={[type.caption, styles.progressText]}>
                {`/ ${formatYen(e.data.thresholdYen)}`}
              </Text>
            </View>
          </View>
        </Band>

        {/* ===== 今年の状況（白） ===== */}
        <Band tone="white">
          <Eyebrow>今年の状況</Eyebrow>
          <View style={styles.statGrid}>
            <StatTile label="今年の収入（合計）" value={formatYen(e.total)} />
            <StatTile
              label="今月の収入"
              value={formatYen(e.data.monthsYen[thisMonth] ?? 0)}
              sub={`${thisMonth}月`}
              tinted={false}
            />
            <StatTile label="今年の残り" value={`${e.monthsLeft}ヶ月`} tinted={false} />
            <StatTile
              label="月あたりの目安"
              value={e.isOver ? '—' : formatYen(e.monthlyAllowance)}
              sub={e.isOver ? '壁を超えています' : 'この金額までなら安心'}
            />
          </View>
        </Band>

        {/* ===== 月別の入力（白） ===== */}
        <Band tone="white" style={styles.monthsBand}>
          <Eyebrow>月ごとの収入（タップで入力・修正）</Eyebrow>
          <View style={styles.monthList}>
            {MONTHS.map((m) => (
              <MonthRow
                key={m}
                month={m}
                yen={e.data.monthsYen[m] ?? 0}
                isCurrent={m === thisMonth}
                onPress={() => router.push(`/add?month=${m}`)}
              />
            ))}
          </View>
          <Text style={[type.caption, styles.disclaimer]}>
            ※この金額は目安です。正確な扶養の判定は、勤務先や年金事務所などにご確認ください。
          </Text>
        </Band>

        {/* ===== フッターのワードマーク ===== */}
        <Band tone="white" style={styles.footer}>
          <Text style={styles.wordmark} numberOfLines={1} adjustsFontSizeToFit>
            130man
          </Text>
        </Band>
      </ScrollView>

      {/* ===== 下部固定の主要アクション（スマホで親指が届く位置） ===== */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + space.md }]}>
        <View style={styles.bottomInner}>
          <PillButton
            label={`${thisMonth}月の収入を入力`}
            onPress={() => router.push(`/add?month=${thisMonth}`)}
            style={styles.bottomCta}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.canvasWhite,
  },
  screen: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    paddingBottom: 96, // 下部固定バーに隠れない余白
  },
  loading: {
    flex: 1,
    backgroundColor: color.canvasNavy,
  },
  hero: {
    gap: space.xl,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingsBtn: {
    paddingVertical: space.xs,
    paddingHorizontal: space.sm,
    borderRadius: 4,
    borderWidth: border.hairline,
    borderColor: color.hairlineDark,
  },
  settingsText: {
    color: color.inkInverse,
  },
  heroAmount: {
    marginVertical: space.xs,
  },
  progressBlock: {
    gap: space.sm,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: color.bodyInverse,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.md,
    marginTop: space.lg,
  },
  monthsBand: {
    gap: space.sm,
  },
  monthList: {
    marginTop: space.sm,
  },
  disclaimer: {
    color: color.body,
    marginTop: space.lg,
  },
  footer: {
    paddingVertical: space['3xl'],
  },
  wordmark: {
    ...type.displayXxl,
    fontSize: 72,
    lineHeight: 80,
    color: color.hairline,
    textAlign: 'center',
    maxWidth: layout.maxContentWidth,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    backgroundColor: color.canvasWhite,
    borderTopWidth: border.hairline,
    borderTopColor: color.hairline,
  },
  bottomInner: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
  },
  bottomCta: {
    width: '100%',
  },
});
