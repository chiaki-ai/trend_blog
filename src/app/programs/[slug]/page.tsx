import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatJST } from '@/lib/utils'
import { ArrowLeft, Calendar, Clock, ExternalLink, Tv, Users } from 'lucide-react'
import Link from 'next/link'

interface ProgramPageProps {
  params: {
    slug: string
  }
}

export default function ProgramPage({ params }: ProgramPageProps) {
  // Mock program data - in real app, fetch from Sanity
  const program = {
    id: '1',
    title: 'ドラマ「サンプル」',
    slug: params.slug,
    network: 'フジテレビ',
    startAt: new Date(Date.now() + 7200000).toISOString(),
    endAt: new Date(Date.now() + 10800000).toISOString(),
    episode: '第5話',
    synopsis: '主人公が重要な決断を迫られる回です。過去の秘密が明かされ、物語は大きく動き出します。視聴者からの反響も大きく、SNSでも話題となっています。',
    persons: [
      { name: '田中太郎', slug: 'tanaka-taro', role: '主演' },
      { name: '佐藤花子', slug: 'sato-hanako', role: 'ヒロイン' },
      { name: '山田監督', slug: 'yamada-director', role: '監督' }
    ],
    tags: ['ドラマ', 'フジテレビ', 'ラブストーリー'],
    watchLinks: [
      { label: 'FOD', url: 'https://fod.fujitv.co.jp' },
      { label: 'TVer', url: 'https://tver.jp' }
    ],
    relatedArticles: [
      { title: '「サンプル」第4話の感想と考察', slug: 'sample-episode-4-review' },
      { title: '田中太郎インタビュー', slug: 'tanaka-taro-interview' }
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link 
          href="/programs" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          番組表に戻る
        </Link>
      </nav>

      {/* Program Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{program.title}</h1>
            {program.episode && (
              <p className="text-lg text-muted-foreground">{program.episode}</p>
            )}
          </div>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {program.network}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {program.tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Broadcast Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                放送情報
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">放送時間</p>
                    <p className="text-sm text-muted-foreground">
                      {formatJST(program.startAt, 'yyyy年MM月dd日 HH:mm')} - {formatJST(program.endAt, 'HH:mm')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Tv className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">放送局</p>
                    <p className="text-sm text-muted-foreground">{program.network}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Synopsis */}
          <Card>
            <CardHeader>
              <CardTitle>あらすじ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">{program.synopsis}</p>
            </CardContent>
          </Card>

          {/* Cast & Crew */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                出演者・スタッフ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.persons.map((person) => (
                  <Link key={person.slug} href={`/people/${person.slug}`}>
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors">
                      <div>
                        <p className="font-medium">{person.name}</p>
                        <p className="text-sm text-muted-foreground">{person.role}</p>
                      </div>
                      <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Watch Links */}
          <Card>
            <CardHeader>
              <CardTitle>視聴方法</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {program.watchLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <span className="font-medium">{link.label}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
            </CardContent>
          </Card>

          {/* Related Articles */}
          {program.relatedArticles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>関連記事</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {program.relatedArticles.map((article) => (
                  <Link key={article.slug} href={`/blog/${article.slug}`}>
                    <div className="p-3 rounded-lg border hover:bg-accent transition-colors">
                      <p className="font-medium text-sm line-clamp-2">{article.title}</p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
