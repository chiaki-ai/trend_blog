import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatJST } from '@/lib/utils'

export default function Home() {
  // Mock data for development
  const latestArticles = [
    {
      id: '1',
      title: '今話題のドラマ「○○」の見どころを解説',
      excerpt: 'SNSで話題沸騰中のドラマについて詳しく解説します。',
      publishedAt: new Date().toISOString(),
      tags: ['ドラマ', 'エンタメ']
    },
    {
      id: '2', 
      title: 'バラエティ番組「△△」の人気の秘密',
      excerpt: '視聴率好調なバラエティ番組の魅力に迫ります。',
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      tags: ['バラエティ', 'テレビ']
    }
  ]

  const todayPrograms = [
    {
      id: '1',
      title: 'ニュース番組',
      network: 'NHK',
      startAt: new Date(Date.now() + 3600000).toISOString(),
      endAt: new Date(Date.now() + 7200000).toISOString()
    },
    {
      id: '2',
      title: 'ドラマ「サンプル」',
      network: 'フジテレビ',
      startAt: new Date(Date.now() + 14400000).toISOString(),
      endAt: new Date(Date.now() + 18000000).toISOString()
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          トレンドブログ - 番組表×SEO
        </h1>
        <p className="text-xl text-muted-foreground">
          テレビ番組とトレンドを組み合わせたSEOブログシステム
        </p>
      </section>

      {/* Latest Articles */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">最新記事</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                <CardDescription>
                  {formatJST(article.publishedAt, 'yyyy/MM/dd')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Today's Programs */}
      <section>
        <h2 className="text-2xl font-bold mb-6">今日の放送</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {todayPrograms.map((program) => (
            <Card key={program.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span className="line-clamp-1">{program.title}</span>
                  <Badge variant="outline">{program.network}</Badge>
                </CardTitle>
                <CardDescription>
                  {formatJST(program.startAt, 'HH:mm')} - {formatJST(program.endAt, 'HH:mm')}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
