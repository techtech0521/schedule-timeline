# デイリースケジュールタイムライン Web アプリ

React 19、TypeScript、Vite 6で構築された美しくレスポンシブな垂直タイムラインコンポーネント。デイリースケジュール、イベント履歴、時系列データの表示に最適です。

![Daily Schedule Timeline](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Vite](https://img.shields.io/badge/Vite-6.3-646cff)

## 特徴

- 🎨 **美しいデザイン**: 青(#00a8cc)と赤(#e60000)の交互ノードと中央の垂直線
- 📱 **フルレスポンシブ**: モバイル、タブレット、デスクトップに最適化されたレイアウト
- ♿ **アクセシビリティ**: ARIAラベル付きのセマンティックHTML
- 🎯 **TypeScript**: 包括的型定義による完全な型安全
- ⚡ **高速**: Vite 6 + React SWCによる超高速開発
- 🧪 **十分なテスト**: Vitest + React Testing Library セッップ完了
- 🎭 **CSS Modules**: ランタイムコストなしのスコープ付きスタイリング

## デザインインスピレーション

垂直履歴タイムラインにインスピレされたデザイン：
- 中央の黒色垂直線
- 青と赤の交互円形ノード
- 交互サイドに配置されるコンテンツ（青 → 右、赤 → 左）
- 適切なタイポグラフィと視覚階層

## インストール

```bash
# リポジトリをクローン
git clone https://github.com/techtech0521/schedule-timeline.git
cd schedule-timeline

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

アプリは [http://localhost:3000](http://localhost:3000) で開きます。

## 使用方法

### 基本的なタイムライン

```tsx
import { Timeline } from '@/components/timeline';
import type { ScheduleEvent } from '@/types/schedule.types';

const events: ScheduleEvent[] = [
  {
    id: '1',
    time: '08:00-09:00',
    title: '朝の運動',
    description: '有酸素運動と筋力トレーニング',
    category: 'exercise'
  },
  {
    id: '2',
    time: '09:30-10:30',
    title: 'チーム会議',
    description: 'チームとの毎日の同期',
    category: 'meeting'
  }
];

function App() {
  return (
    <Timeline
      events={events}
      title="デイリースケジュール"
      subtitle="本日のアクティビティ"
      showFooter={true}
    />
  );
}
```

### カスタムコンポーネント

```tsx
import { TimelineNode, TimelineContent, TimelineItem } from '@/components/timeline';

function CustomItem() {
  return (
    <TimelineItem
      event={eventData}
      nodeColor="blue"
      position="right"
    />
  );
}
```

### レイアウトフックの使用

```tsx
import { useTimelineLayout } from '@/hooks/useTimelineLayout';

function CustomTimeline({ events }: { events: ScheduleEvent[] }) {
  const { layouts, getNodeColor } = useTimelineLayout(events);

  return (
    <div>
      {layouts.map((layout, index) => (
        <div key={layout.event.id}>
          ノード色: {getNodeColor(index)}
        </div>
      ))}
    </div>
  );
}
```

## API リファレンス

### Timeline プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|---------|------|----------|------|
| `events` | `ScheduleEvent[]` | *必須* | 表示するイベントの配列 |
| `title` | `string` | `undefined` | タイムラインのメインタイトル |
| `subtitle` | `string` | `undefined` | オプションのサブタイトル |
| `showFooter` | `boolean` | `false` | フッターセクションを表示 |

### ScheduleEvent 型

```typescript
interface ScheduleEvent {
  id: string;              // 一意識別子
  time: TimeSlot;          // "HH:MM-HH:MM" または "HH:MM"
  title: string;           // イベントタイトル
  description?: string;    // オプションの説明
  category?: EventCategory; // オプションのカテゴリー
}
```

### イベントカテゴリー

- `work` - 仕事関連タスク
- `personal` - 個人アクティビティ
- `meeting` - 会議と通話
- `break` - 休憩と休息時間
- `exercise` - 運動アクティビティ
- `other` - その他のイベント

## 利用可能なスクリプト

| スクリプト | 説明 |
|----------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | プロダクション用ビルド |
| `npm run preview` | プロダクションビルドをプレビュー |
| `npm run lint` | ESLint 実行 |
| `npm run lint:fix` | リント問題を修正 |
| `npm run format` | Prettier でフォーマット |
| `npm run type-check` | TypeScript 型チェック実行 |
| `npm run test` | Vitest でテスト実行 |
| `npm run test:ui` | UI でテスト実行 |
| `npm run test:coverage` | テストカバレージレポート生成 |

## プロジェクト構造

```
schedule-timeline/
├── src/
│   ├── components/
│   │   ├── timeline/          # タイムラインコンポーネント
│   │   │   ├── Timeline.tsx
│   │   │   ├── TimelineItem.tsx
│   │   │   ├── TimelineNode.tsx
│   │   │   ├── TimelineContent.tsx
│   │   │   ├── TimelineHeader.tsx
│   │   │   ├── TimelineFooter.tsx
│   │   │   └── Timeline.module.css
│   │   └── ui/               # UIコンポーネント
│   │       └── Icon.tsx
│   ├── hooks/
│   │   └── useTimelineLayout.ts
│   ├── types/
│   │   └── schedule.types.ts
│   ├── utils/
│   │   ├── time.utils.ts
│   │   └── constants.ts
│   ├── data/
│   │   └── mockEvents.ts
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   ├── test/
│   │   ├── setup.ts
│   │   └── test-utils.tsx
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 時間ユーティリティ

時間操作のためのユーティリティ関数：

```typescript
import { formatTime, parseTimeSlot, getDurationMinutes, isValidTimeSlot } from '@/utils/time.utils';

// 表示用時間フォーマット
formatTime("08:00-09:00"); // "8:00 AM - 9:00 AM"

// 時間スロット解析
parseTimeSlot("08:00-09:00");
// { startTime: "08:00", endTime: "09:00", startHour: 8, ... }

// 期間取得
getDurationMinutes("08:00-09:30"); // 90 (分)

// フォーマット検証
isValidTimeSlot("08:00-09:00"); // true
```

## レスポンシブレイクポイント

- **デスクトップ**: > 768px - 交互ノード付き両サイドレイアウト
- **タブレット**: 481px - 768px - 調整された間隔
- **モバイル**: ≤ 480px - 左側に配置された単サイドレイアウト

## コントリビューション

コントリビューションを歓迎します！以下の手順に従ってください：

1. リポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを開く

### コミットメッセージ規約

このプロジェクトは [Conventional Commits](https://www.conventionalcommits.org/ja/) に従っています：

- `feat:` - 新機能
- `fix:` - バグ修正
- `docs:` - ドキュメント変更
- `style:` - コードスタイル変更（フォーマット）
- `refactor:` - コードリファクタリング
- `test:` - テスト関連変更
- `chore:` - ビルドプロセスまたはツーリング変更

## ライセンス

MIT ライセンス - 個人または商業目的でこのプロジェクトを自由に使用できます。

## 今後の拡張

- [ ] ドラッグ&ドロップによるイベント並べ替え
- [ ] 追加/編集/削除フォーム
- [ ] LocalStorage による永続化
- [ ] PDF/画像エクスポート
- [ ] カテゴリー別カラーココーディング
- [ ] 検索とフィルタリング
- [ ] ダークモードトグル
- [ ] 複数ビューモード（デイリー/週次/月次）
- [ ] 国際化 (i18n)
- [ ] カレンダー統合

## 謢辞

デザインは履歴およびポートフォリオサイトで一般的に使用されている垂直タイムラインパターンにインスピレされています。

---

**🌐 公開URL:** https://schedule-timeline.vercel.app
