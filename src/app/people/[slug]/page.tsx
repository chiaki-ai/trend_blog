import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatJST } from '@/lib/utils'
import { ArrowLeft, ExternalLink, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface PersonPageProps {
  params: {
    slug: string
  }
}

export default function PersonPage({ params }: PersonPageProps) {
  // Mock person data - in real app, fetch from Sanity
  const person = {
    id: '1',
    name: '田中太郎',
    slug: params.slug,
    bio: '1985年生まれ。数多くのドラマや映画に出演し、幅広い役柄を演じる実力派俳優。特にシリアスな役柄での演技力が高く評価されている。',
    roles: ['俳優', '声優'],
    social: {
      x: 'https://x.com/tanaka_taro',
      instagram: 'https://instagram.com/tanaka_taro',
      site: 'https://tanaka-taro.com'
    },
    programs: [
      {
        id: '1',
        title: 'ドラマ「サンプル」',
        slug: 'drama-sample',
        network: 'フジテレビ',
        startAt: new Date(Date.now() + 7200000).toISOString(),
        role: '主演'
      },
      {
        id: '2',
        title: 'バラエティ「トーク番組」',
        slug: 'talk-show',
        network: 'TBS',
        startAt: new Date(Date.now() - 86400000).toISOString(),
        role: 'ゲスト'
      }
    ],
    articles: [
      {
        title: '田中太郎インタビュー：新作ドラマへの想い',
        slug: 'tanaka-taro-interview',
        publishedAt: new Date(Date.now() - 172800000).toISOString()
      },
      {
        title: '「サンプル」田中太郎の演技力が話題',
        slug: 'tanaka-acting-skills',
        publishedAt: new Date(Date.now() - 259200000).toISOString()
      }
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Person Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{person.name}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {person.roles.map((role) => (
                      <Badge key={role} variant="secondary">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">{person.bio}</p>
            </CardContent>
          </Card>

          {/* Programs */}
          <Card>
            <CardHeader>
              <CardTitle>出演番組</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {person.programs.map((program) => (
                  <Link key={program.id} href={`/programs/${program.slug}`}>
                    <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium">{program.title}</h3>
                          <Badge variant="outline">{program.network}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{formatJST(program.startAt, 'yyyy/MM/dd HH:mm')}</span>
                          <span>{program.role}</span>
                        </div>
                      </div>
                      <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground ml-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <Card>
            <CardHeader>
              <CardTitle>関連記事</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {person.articles.map((article) => (
                  <Link key={article.slug} href={`/blog/${article.slug}`}>
                    <div className="p-4 rounded-lg border hover:bg-accent transition-colors">
                      <h3 className="font-medium mb-1 line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatJST(article.publishedAt, 'yyyy年MM月dd日')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>SNS・公式サイト</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {person.social.site && (
                <a
                  href={person.social.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <span className="font-medium">公式サイト</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {person.social.x && (
                <a
                  href={person.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <span className="font-medium">X (Twitter)</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {person.social.instagram && (
                <a
                  href={person.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <span className="font-medium">Instagram</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
