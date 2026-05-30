import { Link, router } from 'expo-router';
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
import { color, layout, space, type } from '@/theme';

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const e = useEarningsContext();
  const thisMonth = currentMonth();

  if (!e.ready) {
    return <View style={styles.loading} />;
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      {/* ===== ヒーロー（ネイビー） ===== */}
      <Band tone="navy" style={[styles.hero, { paddingTop: insets.top + space['2xl'] }]}>
        <Eyebrow tone="dark">{`${e.data.year}年 ・ ${formatMan(e.data.thresholdYen)}の壁`}</Eyebrow>

        <View style={styles.heroAmount}>
          <BigAmount amount={e.remaining} over={e.isOver} />
        </View>

        <View style={styles.progressBlock}>
          <ProgressBar ratio={e.progress} over={e.isOver} tone="dark" />
          <View style={styles.progressLabels}>
            <Text style={[type.caption, styles.progressText]}>
              {`今年 ￥${formatNumber(e.total)}`}
            </Text>
            <Text style={[type.caption, styles.progressText]}>
              {`／ ${formatYen(e.data.thresholdYen)}`}
            </Text>
          </View>
        </View>

        <PillButton
          label="収入を ついか する"
          onPress={() => router.push(`/add?month=${thisMonth}`)}
        />
        <Link href="/settings" asChild>
          <Pressable accessibilityRole="link" style={styles.settingsLink}>
            <Text style={[type.caption, styles.settingsText]}>
              ⚙︎ かべの金額・設定をかえる
            </Text>
          </Pressable>
        </Link>
      </Band>

      {/* ===== 今年のじょうきょう（白） ===== */}
      <Band tone="white">
        <Eyebrow>今年のじょうきょう</Eyebrow>
        <View style={styles.statGrid}>
          <StatTile label="今年の累計" value={formatYen(e.total)} />
          <StatTile
            label="今月分"
            value={formatYen(e.data.monthsYen[thisMonth] ?? 0)}
            sub={`${thisMonth}月`}
            tinted={false}
          />
          <StatTile label="残り月数" value={`${e.monthsLeft}ヶ月`} tinted={false} />
          <StatTile
            label="月あたりの目安"
            value={e.isOver ? '—' : formatYen(e.monthlyAllowance)}
            sub={e.isOver ? '壁をこえています' : 'このペースまでOK'}
          />
        </View>
      </Band>

      {/* ===== 月別の入力（白） ===== */}
      <Band tone="white" style={styles.monthsBand}>
        <Eyebrow>月ごとの収入（タップでにゅうりょく）</Eyebrow>
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
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: color.canvasWhite,
  },
  content: {
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    backgroundColor: color.canvasNavy,
  },
  hero: {
    gap: space['2xl'],
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
  settingsLink: {
    alignSelf: 'center',
    paddingVertical: space.sm,
  },
  settingsText: {
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
});
