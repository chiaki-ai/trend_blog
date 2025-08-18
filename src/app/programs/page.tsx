import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatJST, isToday, isTomorrow } from '@/lib/utils'
import { Calendar, Clock, Tv } from 'lucide-react'
import Link from 'next/link'

export default function ProgramsPage() {
  // Mock data for development
  const programs = [
    {
      id: '1',
      title: 'ニュース番組',
      slug: 'news-program',
      network: 'NHK',
      startAt: new Date().toISOString(),
      endAt: new Date(Date.now() + 3600000).toISOString(),
      episode: '',
      synopsis: '最新のニュースをお届けします。',
      persons: [{ name: 'アナウンサー田中', slug: 'announcer-tanaka' }]
    },
    {
      id: '2',
      title: 'ドラマ「サンプル」',
      slug: 'drama-sample',
      network: 'フジテレビ',
      startAt: new Date(Date.now() + 7200000).toISOString(),
      endAt: new Date(Date.now() + 10800000).toISOString(),
      episode: '第5話',
      synopsis: '主人公が重要な決断を迫られる回です。',
      persons: [
        { name: '田中太郎', slug: 'tanaka-taro' },
        { name: '佐藤花子', slug: 'sato-hanako' }
      ]
    },
    {
      id: '3',
      title: 'バラエティ「お笑い大賞」',
      slug: 'comedy-award',
      network: 'テレビ朝日',
      startAt: new Date(Date.now() + 86400000).toISOString(),
      endAt: new Date(Date.now() + 90000000).toISOString(),
      episode: '',
      synopsis: '人気芸人が集結する特別番組です。',
      persons: [{ name: 'MC山田', slug: 'mc-yamada' }]
    }
  ]

  const todayPrograms = programs.filter(p => isToday(p.startAt))
  const tomorrowPrograms = programs.filter(p => isTomorrow(p.startAt))
  const upcomingPrograms = programs.filter(p => !isToday(p.startAt) && !isTomorrow(p.startAt))

  const ProgramCard = ({ program }: { program: typeof programs[0] }) => (
    <Link href={`/programs/${program.slug}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex justify-between items-start">
            <span className="line-clamp-2">{program.title}</span>
            <Badge variant="outline">{program.network}</Badge>
          </CardTitle>
          <CardDescription className="flex items-center gap-4">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {formatJST(program.startAt, 'HH:mm')} - {formatJST(program.endAt, 'HH:mm')}
            </div>
            {program.episode && (
              <div className="flex items-center">
                <Tv className="mr-1 h-4 w-4" />
                {program.episode}
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {program.synopsis}
          </p>
          {program.persons.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {program.persons.slice(0, 3).map((person) => (
                <Badge key={person.slug} variant="secondary" className="text-xs">
                  {person.name}
                </Badge>
              ))}
              {program.persons.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{program.persons.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">番組表</h1>
        <p className="text-muted-foreground">
          テレビ番組の放送予定をチェックできます
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b">
          <nav className="-mb-px flex space-x-8">
            <button className="border-b-2 border-primary py-2 px-1 text-sm font-medium text-primary">
              今日の放送
            </button>
            <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-muted-foreground hover:text-foreground">
              明日の放送
            </button>
            <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-muted-foreground hover:text-foreground">
              今週の放送
            </button>
          </nav>
        </div>
      </div>

      {/* Today's Programs */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Calendar className="mr-2 h-6 w-6" />
          今日の放送 ({formatJST(new Date(), 'MM月dd日')})
        </h2>
        {todayPrograms.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {todayPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">今日の放送予定はありません</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Tomorrow's Programs */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Calendar className="mr-2 h-6 w-6" />
          明日の放送 ({formatJST(new Date(Date.now() + 86400000), 'MM月dd日')})
        </h2>
        {tomorrowPrograms.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tomorrowPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">明日の放送予定はありません</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Upcoming Programs */}
      {upcomingPrograms.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Calendar className="mr-2 h-6 w-6" />
            今後の放送予定
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
