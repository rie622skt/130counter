import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

// Web のルートHTML（Node上でビルド時に実行される）。
// PWA のための manifest リンク・theme-color・apple メタ・viewport をここで注入する。
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#010120" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="130万カウンター" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />

        <title>130万円カウンター</title>

        {/* RN Web の縦スクロール挙動をリセット */}
        <ScrollViewStyleReset />

        {/* light面/dark面どちらでも下地が白に見えるよう body 背景を固定 */}
        <style dangerouslySetInnerHTML={{ __html: rawBaseStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const rawBaseStyles = `
html, body { margin: 0; padding: 0; background-color: #ffffff; }
body { overscroll-behavior-y: none; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
#root, #root > div { min-height: 100%; }
`;
