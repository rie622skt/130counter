import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
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
import { formatYen, parseYenInput } from '@/lib/money';
import { useEarningsContext } from '@/state/EarningsContext';
import { border, color, radius, space, type } from '@/theme';

export default function AddScreen() {
  const insets = useSafeAreaInsets();
  const e = useEarningsContext();
  const params = useLocalSearchParams<{ month?: string }>();
  const month = Math.min(12, Math.max(1, parseInt(params.month ?? '1', 10) || 1));

  const initial = e.data.monthsYen[month] ?? 0;
  const [text, setText] = useState(initial > 0 ? String(initial) : '');
  const value = parseYenInput(text);

  const save = () => {
    e.setMonth(month, value);
    router.back();
  };

  const clear = () => {
    e.setMonth(month, 0);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + space.lg }]}>
        <View style={styles.header}>
          <Eyebrow>収入のにゅうりょく</Eyebrow>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="とじる"
            style={styles.close}>
            <Text style={[type.bodyMd, styles.closeText]}>とじる</Text>
          </Pressable>
        </View>

        <Text style={[type.displayLg, styles.title]}>{`${month}月の収入`}</Text>
        <Text style={[type.caption, styles.help]}>
          この月にもらったお給料（手取りではなく総支給額）を入力してください。
        </Text>

        <View style={styles.inputWrap}>
          <Text style={[type.displayXl, styles.yenMark]}>￥</Text>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="0"
            placeholderTextColor={color.body}
            keyboardType="number-pad"
            inputMode="numeric"
            autoFocus
            style={[type.displayXl, styles.input]}
            accessibilityLabel={`${month}月の収入（円）`}
          />
        </View>
        {value > 0 ? (
          <Text style={[type.bodyMd, styles.preview]}>{formatYen(value)}</Text>
        ) : null}

        <View style={styles.actions}>
          <PillButton label="ほぞん する" onPress={save} />
          {initial > 0 ? (
            <Pressable onPress={clear} accessibilityRole="button" style={styles.clearBtn}>
              <Text style={[type.caption, styles.clearText]}>この月の入力をけす</Text>
            </Pressable>
          ) : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: color.canvasWhite,
  },
  content: {
    paddingHorizontal: space.lg,
    paddingBottom: space['3xl'],
    gap: space.lg,
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
  },
  help: {
    color: color.body,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    borderWidth: border.hairline,
    borderColor: color.hairline,
    borderRadius: radius.sm,
    paddingHorizontal: space.lg,
    paddingVertical: space.lg,
  },
  yenMark: {
    color: color.ink,
  },
  input: {
    flex: 1,
    color: color.ink,
    padding: 0,
  },
  preview: {
    color: color.body,
  },
  actions: {
    gap: space.md,
    marginTop: space.sm,
  },
  clearBtn: {
    alignSelf: 'center',
    paddingVertical: space.sm,
  },
  clearText: {
    color: color.body,
  },
});
