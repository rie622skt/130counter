// 依存なしの PNG アイコン生成（zlib のみ使用）。
// ネイビー地に、ブランドグラデの角丸バー（アプリの進捗バーのエコー）を配置する。
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const NAVY = [1, 1, 32];
const STOPS = [
  [0.0, [0xfc, 0x4c, 0x02]], // orange
  [0.5, [0xef, 0x2c, 0xc1]], // magenta
  [1.0, [0xbd, 0xbb, 0xff]], // periwinkle
];

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function gradientAt(t) {
  t = Math.max(0, Math.min(1, t));
  for (let i = 0; i < STOPS.length - 1; i++) {
    const [p0, c0] = STOPS[i];
    const [p1, c1] = STOPS[i + 1];
    if (t >= p0 && t <= p1) {
      const k = (t - p0) / (p1 - p0);
      return [lerp(c0[0], c1[0], k), lerp(c0[1], c1[1], k), lerp(c0[2], c1[2], k)];
    }
  }
  return STOPS[STOPS.length - 1][1];
}

function makePng(size, { safe = false } = {}) {
  const data = Buffer.alloc(size * size * 4);
  // バーの寸法（maskable は安全ゾーン内に収める）
  const inset = safe ? 0.20 : 0.0;
  const usable = size * (1 - inset * 2);
  const originX = size * inset;
  const barW = usable * 0.74;
  const barH = Math.max(2, Math.round(usable * 0.16));
  const barX = (size - barW) / 2;
  const barY = (size - barH) / 2;
  const r = barH / 2; // 角丸（=半円のキャップ）

  function inRoundedBar(x, y) {
    if (y < barY || y > barY + barH) return false;
    if (x < barX || x > barX + barW) return false;
    const left = barX + r;
    const right = barX + barW - r;
    const cy = barY + r;
    if (x >= left && x <= right) return true;
    const cx = x < left ? left : right;
    return (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      let c = NAVY;
      let a = 255;
      if (inRoundedBar(x + 0.5, y + 0.5)) {
        const t = (x - barX) / barW;
        c = gradientAt(t);
      }
      data[idx] = c[0];
      data[idx + 1] = c[1];
      data[idx + 2] = c[2];
      data[idx + 3] = a;
    }
  }
  return encodePng(size, size, data);
}

function encodePng(width, height, rgba) {
  // 各スキャンラインにフィルタバイト0を付加
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });

  const chunks = [];
  chunks.push(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  chunks.push(chunk('IHDR', ihdr));
  chunks.push(chunk('IDAT', idat));
  chunks.push(chunk('IEND', Buffer.alloc(0)));
  return Buffer.concat(chunks);
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body) >>> 0, 0);
  return Buffer.concat([len, body, crc]);
}

const crcTable = (() => {
  const t = new Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return c ^ 0xffffffff;
}

const outDir = path.join(__dirname, '..', 'public');
fs.mkdirSync(outDir, { recursive: true });

const targets = [
  ['icon-192.png', 192, {}],
  ['icon-512.png', 512, {}],
  ['icon-maskable-512.png', 512, { safe: true }],
  ['apple-touch-icon.png', 180, {}],
  ['favicon.png', 64, {}],
];

for (const [name, size, opts] of targets) {
  fs.writeFileSync(path.join(outDir, name), makePng(size, opts));
  console.log('wrote', name, `${size}x${size}`);
}
