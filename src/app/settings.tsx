import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Eyebrow } from '@/components/Eyebrow';
import { PillButton } from '@/components/PillButton';
import { formatMan, formatYen, parseYenInput } from '@/lib/money';
import { useEarningsContext } from '@/state/EarningsContext';
import { border, color, radius, space, type } from '@/theme';

const PRESETS = [
  { yen: 1_030_000, label: '103万円' },
  { yen: 1_060_000, label: '106万円' },
  { yen: 1_300_000, label: '130万円' },
  { yen: 1_500_000, label: '150万円' },
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const e = useEarningsContext();
  const [custom, setCustom] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  const applyCustom = () => {
    const v = parseYenInput(custom);
    if (v > 0) {
      e.setThreshold(v);
      setCustom('');
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + space.lg }]}>
      <View style={styles.header}>
        <Eyebrow>設定</Eyebrow>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="閉じる"
          hitSlop={12}
          style={styles.close}>
          <Text style={[type.bodyMd, styles.closeText]}>閉じる</Text>
        </Pressable>
      </View>

      {/* 壁の金額 */}
      <Text style={[type.displayLg, styles.title]}>壁の金額</Text>
      <Text style={[type.caption, styles.help]}>
        現在の設定：{formatMan(e.data.thresholdYen)}（{formatYen(e.data.thresholdYen)}）
      </Text>
      <View style={styles.presets}>
        {PRESETS.map((p) => {
          const active = e.data.thresholdYen === p.yen;
          return (
            <Pressable
              key={p.yen}
              onPress={() => e.setThreshold(p.yen)}
              accessibilityRole="button"
              style={[styles.preset, active && styles.presetActive]}>
              <Text
                style={[
                  type.bodyMdStrong,
                  active ? styles.presetTextActive : styles.presetText,
                ]}>
                {p.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={[type.caption, styles.help]}>その他の金額を設定する</Text>
      <View style={styles.row}>
        <View style={styles.inputWrap}>
          <Text style={[type.bodyMd, styles.yenMark]}>￥</Text>
          <TextInput
            value={custom}
            onChangeText={setCustom}
            placeholder="例: 1300000"
            placeholderTextColor={color.body}
            keyboardType="number-pad"
            inputMode="numeric"
            style={[type.bodyMd, styles.input]}
            accessibilityLabel="かべの金額（円）"
          />
        </View>
        <PillButton label="適用" onPress={applyCustom} style={styles.applyBtn} />
      </View>

      {/* 年 */}
      <Text style={[type.displayLg, styles.title]}>対象の年</Text>
      <View style={styles.yearRow}>
        <Pressable
          onPress={() => e.setYear(e.data.year - 1)}
          accessibilityRole="button"
          accessibilityLabel="前の年"
          style={styles.yearBtn}>
          <Text style={type.displayMd}>‹</Text>
        </Pressable>
        <Text style={[type.displayMd, styles.yearText]}>{e.data.year}年</Text>
        <Pressable
          onPress={() => e.setYear(e.data.year + 1)}
          accessibilityRole="button"
          accessibilityLabel="次の年"
          style={styles.yearBtn}>
          <Text style={type.displayMd}>›</Text>
        </Pressable>
      </View>

      {/* リセット */}
      <Text style={[type.displayLg, styles.title]}>データのリセット</Text>
      {!confirmReset ? (
        <Pressable
          onPress={() => setConfirmReset(true)}
          accessibilityRole="button"
          style={styles.resetBtn}>
          <Text style={[type.bodyMdStrong, styles.resetText]}>
            入力した収入をすべて削除
          </Text>
        </Pressable>
      ) : (
        <View style={styles.confirmBox}>
          <Text style={[type.bodyMd, styles.confirmText]}>
            本当に削除しますか？この操作は元に戻せません。
          </Text>
          <View style={styles.confirmActions}>
            <PillButton
              label="削除する"
              onPress={() => {
                e.reset();
                setConfirmReset(false);
                router.back();
              }}
            />
            <Pressable
              onPress={() => setConfirmReset(false)}
              accessibilityRole="button"
              style={styles.cancelBtn}>
              <Text style={[type.caption, styles.cancelText]}>キャンセル</Text>
            </Pressable>
          </View>
        </View>
      )}

      <Text style={[type.caption, styles.disclaimer]}>
        ※この金額は目安です。正確な扶養の判定は、勤務先や年金事務所などにご確認ください。
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: color.canvasWhite,
  },
  content: {
    paddingHorizontal: space.lg,
    paddingBottom: space['5xl'],
    gap: space.md,
    maxWidth: 560,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  close: {
    paddingVertical: space.xs,
    paddingHorizontal: space.sm,
  },
  closeText: {
    color: color.body,
  },
  title: {
    color: color.ink,
    marginTop: space.lg,
  },
  help: {
    color: color.body,
  },
  presets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.sm,
  },
  preset: {
    borderWidth: border.hairline,
    borderColor: color.hairline,
    borderRadius: radius.sm,
    paddingVertical: space.md,
    paddingHorizontal: space.lg,
    backgroundColor: color.canvasWhite,
    flexGrow: 1,
    alignItems: 'center',
    minWidth: 120,
  },
  presetActive: {
    backgroundColor: color.cta,
    borderColor: color.cta,
  },
  presetText: {
    color: color.ink,
  },
  presetTextActive: {
    color: color.ctaText,
  },
  row: {
    flexDirection: 'row',
    gap: space.sm,
    alignItems: 'stretch',
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    borderWidth: border.hairline,
    borderColor: color.hairline,
    borderRadius: radius.sm,
    paddingHorizontal: space.lg,
  },
  yenMark: {
    color: color.ink,
  },
  input: {
    flex: 1,
    color: color.ink,
    paddingVertical: space.md,
    padding: 0,
  },
  applyBtn: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  yearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: border.hairline,
    borderColor: color.hairline,
    borderRadius: radius.sm,
    paddingHorizontal: space.lg,
  },
  yearBtn: {
    paddingVertical: space.md,
    paddingHorizontal: space.lg,
  },
  yearText: {
    color: color.ink,
  },
  resetBtn: {
    borderWidth: border.hairline,
    borderColor: color.hairline,
    borderRadius: radius.sm,
    paddingVertical: space.lg,
    alignItems: 'center',
  },
  resetText: {
    color: color.accentOrange,
  },
  confirmBox: {
    borderWidth: border.hairline,
    borderColor: color.accentOrange,
    borderRadius: radius.sm,
    padding: space.lg,
    gap: space.md,
  },
  confirmText: {
    color: color.ink,
  },
  confirmActions: {
    gap: space.sm,
  },
  cancelBtn: {
    alignSelf: 'center',
    paddingVertical: space.sm,
  },
  cancelText: {
    color: color.body,
  },
  disclaimer: {
    color: color.body,
    marginTop: space.xl,
  },
});
