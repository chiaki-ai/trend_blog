import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatJST } from '@/lib/utils'
import { ArrowLeft, Clock, User } from 'lucide-react'
import Link from 'next/link'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // Mock article data - in real app, fetch from Sanity
  const article = {
    id: '1',
    title: '今話題のドラマ「○○」の見どころを解説',
    slug: params.slug,
    excerpt: 'SNSで話題沸騰中のドラマについて詳しく解説します。',
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['ドラマ', 'エンタメ', 'テレビ'],
    persons: [
      { name: '田中太郎', slug: 'tanaka-taro' },
      { name: '佐藤花子', slug: 'sato-hanako' }
    ],
    programs: [
      { title: 'ドラマ「サンプル」', slug: 'drama-sample' }
    ],
    body: `
# ${params.slug} とは？今日のポイント3行要約

このドラマは現代社会の問題を扱った話題作です。主演の演技力と脚本の完成度が高く評価されています。視聴者からの反響も大きく、SNSでも連日話題となっています。

## 放送・配信の基本情報

| 項目 | 詳細 |
|------|------|
| 放送局 | フジテレビ |
| 放送時間 | 毎週火曜日 21:00-21:54 |
| 出演者 | 田中太郎、佐藤花子 |

## 話題の理由

検索トレンドでも上位にランクインしており、特に以下の要因が話題を呼んでいます：

- 主演俳優の演技力の高さ
- 現代社会の問題を扱った脚本
- SNSでの口コミ拡散

## 視聴方法

- **地上波**: フジテレビ系列
- **配信**: FOD、TVer（見逃し配信）
- **再放送**: 土曜日 15:00-

## 関連人物と過去回

出演者の田中太郎は過去にも話題作に出演しており、今回の役柄でも注目を集めています。

## まとめ

このドラマは現代のテレビドラマの新しい可能性を示す作品です。今後の展開にも注目が集まります。
    `
  }

  // Generate table of contents from headings
  const tableOfContents = [
    { id: 'overview', title: 'とは？今日のポイント3行要約' },
    { id: 'broadcast-info', title: '放送・配信の基本情報' },
    { id: 'trending-reasons', title: '話題の理由' },
    { id: 'how-to-watch', title: '視聴方法' },
    { id: 'related-people', title: '関連人物と過去回' },
    { id: 'summary', title: 'まとめ' }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          記事一覧に戻る
        </Link>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            公開: {formatJST(article.publishedAt, 'yyyy年MM月dd日')}
          </div>
          <div className="flex items-center">
            <User className="mr-1 h-4 w-4" />
            更新: {formatJST(article.updatedAt, 'yyyy年MM月dd日')}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>

        <p className="text-lg text-muted-foreground">{article.excerpt}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Table of Contents */}
        <aside className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-lg">目次</CardTitle>
            </CardHeader>
            <CardContent>
              <nav id="toc">
                <ul className="space-y-2 text-sm">
                  {tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a 
                        href={`#${item.id}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* Article Content */}
        <article className="lg:col-span-3">
          <div className="prose prose-gray max-w-none">
            <div className="whitespace-pre-line leading-relaxed">
              {article.body}
            </div>
          </div>

          {/* Related Content */}
          <div className="mt-12 space-y-6">
            {/* Related Persons */}
            {article.persons.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">関連人物</h3>
                <div className="flex flex-wrap gap-2">
                  {article.persons.map((person) => (
                    <Link key={person.slug} href={`/people/${person.slug}`}>
                      <Badge variant="outline" className="hover:bg-accent">
                        {person.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Programs */}
            {article.programs.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">関連番組</h3>
                <div className="flex flex-wrap gap-2">
                  {article.programs.map((program) => (
                    <Link key={program.slug} href={`/programs/${program.slug}`}>
                      <Badge variant="outline" className="hover:bg-accent">
                        {program.title}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>

      {/* Navigation */}
      <nav className="mt-12 flex justify-between">
        <Link 
          href="/blog/previous-article" 
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          前の記事
        </Link>
        <Link 
          href="/blog/next-article"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          次の記事
          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
        </Link>
      </nav>
    </div>
  )
}
