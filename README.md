# トレンドブログ - 番組表×SEO

テレビ番組とトレンドを組み合わせたSEOブログシステム

## 技術スタック

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **CMS**: Sanity (Headless CMS)
- **Deployment**: Vercel
- **Utilities**: date-fns-tz, zod, clsx, lucide-react

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成し、必要な値を設定してください：

```bash
cp .env.example .env.local
```

必要な環境変数：
- `SANITY_PROJECT_ID`: SanityプロジェクトID
- `SANITY_DATASET`: production (デフォルト)
- `SANITY_READ_TOKEN`: Sanity読み取りトークン
- `SANITY_WRITE_TOKEN`: Sanity書き込みトークン

### 3. Sanityプロジェクトの作成

1. [Sanity.io](https://www.sanity.io/) でアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトIDを `.env.local` に設定
4. API トークンを生成して設定

### 4. ローカル起動

```bash
# Next.js開発サーバー
npm run dev

# Sanity Studio (別ターミナル)
npm run sanity:dev
```

- Next.js: http://localhost:3000
- Sanity Studio: http://localhost:3333

## Sanityデータ投入

### スキーマ構成

- **Article**: ブログ記事
- **Program**: 番組/放送回
- **Person**: 出演者・関係者
- **Tag**: タグ
- **SourceFeed**: データソース

### 初期データの作成

Sanity Studioで以下のダミーデータを作成してください：

1. **Person** (3件): 俳優/声優/司会者
2. **Program** (3件): 今日放送2件、明日1件
3. **Article** (5件): tags/persons/programsを紐付け
4. **Tag** (5件): カテゴリタグ
5. **SourceFeed** (2件): RSS、CSV用

## デプロイ

### Vercelデプロイ

1. GitHubリポジトリにプッシュ
2. Vercelでプロジェクトをインポート
3. 環境変数を設定
4. デプロイ実行

### 環境変数 (Vercel)

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01
SANITY_READ_TOKEN=your-read-token
SANITY_WRITE_TOKEN=your-write-token
DEFAULT_TIMEZONE=Asia/Tokyo
X_IMPORT_TOKEN=your-import-token
```

### Cron設定

Vercel Cronを設定して毎日04:00 JSTに実行：

```json
{
  "crons": [
    {
      "path": "/api/revalidate/daily",
      "schedule": "0 19 * * *"
    }
  ]
}
```

## API エンドポイント

### 番組CSV インポート

```bash
POST /api/import/programs
Content-Type: multipart/form-data
X-Import-Token: your-token

# CSVヘッダ例
title,network,startAt,endAt,episode,synopsis,persons,watchLinks
```

### トレンド下書き起票

```bash
POST /api/trends/draft
Content-Type: application/json

{
  "keywords": ["キーワード1", "キーワード2"]
}
```

## ページ構成

- `/` - トップページ（最新記事、今日の番組）
- `/blog` - 記事一覧
- `/blog/[slug]` - 記事詳細
- `/programs` - 番組一覧
- `/programs/[slug]` - 番組詳細
- `/people/[slug]` - 人物詳細
- `/tags/[slug]` - タグ別一覧
- `/sitemap.xml` - サイトマップ
- `/robots.txt` - ロボッツ
- `/feed.xml` - RSS2.0

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# リント
npm run lint

# フォーマット
npm run format

# 型チェック
npm run type-check

# Sanity Studio
npm run sanity:dev
npm run sanity:build
npm run sanity:deploy
```

## ライセンス

MIT
