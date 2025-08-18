import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatJST } from '@/lib/utils'
import Link from 'next/link'

export default function BlogPage() {
  // Mock data for development
  const articles = [
    {
      id: '1',
      title: '今話題のドラマ「○○」の見どころを解説',
      slug: 'drama-highlights-analysis',
      excerpt: 'SNSで話題沸騰中のドラマについて詳しく解説します。キャストの魅力や注目シーンを紹介。',
      publishedAt: new Date().toISOString(),
      tags: ['ドラマ', 'エンタメ', 'テレビ']
    },
    {
      id: '2', 
      title: 'バラエティ番組「△△」の人気の秘密',
      slug: 'variety-show-popularity-secret',
      excerpt: '視聴率好調なバラエティ番組の魅力に迫ります。出演者の絶妙なトークが話題。',
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      tags: ['バラエティ', 'テレビ', 'お笑い']
    },
    {
      id: '3',
      title: 'アニメ「□□」第1話の感想と今後の展開予想',
      slug: 'anime-first-episode-review',
      excerpt: '注目の新作アニメの第1話を詳しくレビュー。原作との違いや今後の展開を予想します。',
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      tags: ['アニメ', 'レビュー', '感想']
    },
    {
      id: '4',
      title: 'ドキュメンタリー「◇◇」が話題の理由',
      slug: 'documentary-trending-reasons',
      excerpt: 'SNSで拡散されているドキュメンタリー番組について分析。社会問題への関心が高まる。',
      publishedAt: new Date(Date.now() - 259200000).toISOString(),
      tags: ['ドキュメンタリー', '社会', 'トレンド']
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">記事一覧</h1>
        <p className="text-muted-foreground">
          テレビ番組やトレンドに関する最新記事をお届けします
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.id} href={`/blog/${article.slug}`}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2 hover:text-primary">
                  {article.title}
                </CardTitle>
                <CardDescription>
                  {formatJST(article.publishedAt, 'yyyy年MM月dd日')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination placeholder */}
      <div className="mt-12 flex justify-center">
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm border rounded-md hover:bg-accent">
            前へ
          </button>
          <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md">
            1
          </button>
          <button className="px-4 py-2 text-sm border rounded-md hover:bg-accent">
            2
          </button>
          <button className="px-4 py-2 text-sm border rounded-md hover:bg-accent">
            次へ
          </button>
        </div>
      </div>
    </div>
  )
}
