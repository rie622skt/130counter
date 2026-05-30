# 130万円カウンター

パート勤務の方が「130万円の壁」まで **あといくら稼げるか** を、ひと目でわかるように管理する PWA アプリです。各月の収入を入力すると、年間累計・残額・進捗・月あたりの目安を自動で計算します。

- 対象の「壁」は **130万円が既定**。設定画面で 103 / 106 / 150 万円や任意の金額に変更できます。
- 入力方式は **各月の収入を入力 → 年間累計** で残額を計算。
- データは端末内（AsyncStorage / Web では localStorage）に保存され、リロードしても残ります。
- **PWA**：スマホのホーム画面に追加して、アプリのように使えます（オフライン対応）。

## 技術スタック

- Expo SDK 56 + expo-router（`web.output: "static"`）+ TypeScript
- react-native-web による Web 出力
- デザイン：「Together AI」風トークン（ネイビー↔白の交互バンド、黒CTAピル、モノ大文字ラベル、ブランドグラデ、ミントタイル、ヘアライン）に準拠

## 開発

```bash
npm install
npm run web        # http://localhost:8081 で開発（Web）
```

## PWA ビルド

```bash
npm run build:web  # expo export -p web → dist/ + workbox で service-worker.js を生成
npx serve dist     # 静的出力を配信して、インストール/オフラインを確認
```

> Service Worker は localhost か HTTPS でのみ動作し、`expo export` 後にのみ生成されます。

## アイコン

`public/` のアイコンは依存なしのスクリプトで生成しています（ネイビー地にブランドグラデのバー）。

```bash
npm run generate-icons
```

## ディレクトリ構成

```
src/
  app/            画面（index=ホーム / add=収入入力 / settings=設定）と +html.tsx（PWA head）
  components/     デザインシステムの再利用部品（Band, PillButton, StatTile, ProgressBar など）
  lib/            money（円表記）, calc（残額計算）, storage（永続化）
  state/          useEarnings（状態）, EarningsContext（全画面共有）
  theme/          tokens / typography（デザイントークン）
public/           manifest.json と PWA アイコン（ビルド時に dist/ へコピー）
```

## 注意

この金額はあくまで目安です。正確な扶養の判定は、勤務先や年金事務所などにご確認ください。
