import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatJST } from '@/lib/utils'
import { ArrowLeft, Hash, Calendar, Tv } from 'lucide-react'
import Link from 'next/link'

interface TagPageProps {
  params: {
    slug: string
  }
}

export default function TagPage({ params }: TagPageProps) {
  // Mock tag data - in real app, fetch from Sanity
  const tag = {
    id: '1',
    title: 'ドラマ',
    slug: params.slug,
    description: 'テレビドラマに関する記事や番組情報をまとめています。',
    articles: [
      {
        id: '1',
        title: '今話題のドラマ「○○」の見どころを解説',
        slug: 'drama-highlights-analysis',
        excerpt: 'SNSで話題沸騰中のドラマについて詳しく解説します。',
        publishedAt: new Date().toISOString(),
        tags: ['ドラマ', 'エンタメ']
      },
      {
        id: '2',
        title: 'ドラマ「サンプル」第4話の感想と考察',
        slug: 'sample-episode-4-review',
        excerpt: '物語が大きく動いた第4話について詳しく分析します。',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        tags: ['ドラマ', 'レビュー']
      }
    ],
    programs: [
      {
        id: '1',
        title: 'ドラマ「サンプル」',
        slug: 'drama-sample',
        network: 'フジテレビ',
        startAt: new Date(Date.now() + 7200000).toISOString(),
        endAt: new Date(Date.now() + 10800000).toISOString(),
        episode: '第5話'
      },
      {
        id: '2',
        title: 'ドラマ「テスト」',
        slug: 'drama-test',
        network: 'TBS',
        startAt: new Date(Date.now() + 86400000).toISOString(),
        endAt: new Date(Date.now() + 90000000).toISOString(),
        episode: '第1話'
      }
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
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

      {/* Tag Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Hash className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">{tag.title}</h1>
        </div>
        <p className="text-lg text-muted-foreground">{tag.description}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Articles */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Calendar className="mr-2 h-6 w-6" />
            関連記事 ({tag.articles.length}件)
          </h2>
          <div className="space-y-4">
            {tag.articles.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="line-clamp-2 hover:text-primary">
                      {article.title}
                    </CardTitle>
                    <CardDescription>
                      {formatJST(article.publishedAt, 'yyyy年MM月dd日')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tagName) => (
                        <Badge 
                          key={tagName} 
                          variant={tagName === tag.title ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {tagName}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Programs */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Tv className="mr-2 h-6 w-6" />
            関連番組 ({tag.programs.length}件)
          </h2>
          <div className="space-y-4">
            {tag.programs.map((program) => (
              <Link key={program.id} href={`/programs/${program.slug}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span className="line-clamp-2 hover:text-primary">
                        {program.title}
                      </span>
                      <Badge variant="outline">{program.network}</Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span>
                        {formatJST(program.startAt, 'MM/dd HH:mm')} - {formatJST(program.endAt, 'HH:mm')}
                      </span>
                      {program.episode && (
                        <span>{program.episode}</span>
                      )}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Related Tags */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">関連タグ</h2>
        <div className="flex flex-wrap gap-2">
          {['エンタメ', 'テレビ', 'レビュー', 'フジテレビ', 'TBS'].map((relatedTag) => (
            <Link key={relatedTag} href={`/tags/${relatedTag}`}>
              <Badge variant="outline" className="hover:bg-accent">
                {relatedTag}
              </Badge>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
