export interface ArticleTemplate {
  title: string
  excerpt: string
  body: any[]
}

export function generateArticleTemplate(keyword: string, programTitle?: string, persons?: string[]): ArticleTemplate {
  const title = programTitle 
    ? `${programTitle} ${keyword} とは？今日のポイント3行要約`
    : `${keyword} とは？今日のポイント3行要約`

  const excerpt = `${keyword}について詳しく解説します。${programTitle ? `番組「${programTitle}」の` : ''}最新情報をお届けします。`

  const body = [
    {
      _type: 'block',
      _key: 'intro',
      style: 'h1',
      children: [{ _type: 'span', text: title }]
    },
    {
      _type: 'block',
      _key: 'summary',
      style: 'normal',
      children: [{
        _type: 'span',
        text: `${keyword}は現在注目を集めているトピックです。\n\n【3行要約】\n• ポイント1: ${programTitle ? `番組「${programTitle}」で` : ''}話題となっている理由\n• ポイント2: SNSや検索トレンドでの反響状況\n• ポイント3: 今後の展開や注目すべき点`
      }]
    },
    {
      _type: 'block',
      _key: 'broadcast-info',
      style: 'h2',
      children: [{ _type: 'span', text: '放送・配信の基本情報' }]
    },
    {
      _type: 'block',
      _key: 'broadcast-table',
      style: 'normal',
      children: [{
        _type: 'span',
        text: programTitle 
          ? `番組名: ${programTitle}\n放送局: [放送局名を記入]\n放送時間: [放送時間を記入]\n出演者: ${persons?.join(', ') || '[出演者を記入]'}`
          : '番組名: [関連番組があれば記入]\n放送局: [放送局名を記入]\n放送時間: [放送時間を記入]\n出演者: [出演者を記入]'
      }]
    },
    {
      _type: 'block',
      _key: 'trending-reason',
      style: 'h2',
      children: [{ _type: 'span', text: '話題の理由（検索トレンド/ニュース要因）' }]
    },
    {
      _type: 'block',
      _key: 'trending-content',
      style: 'normal',
      children: [{
        _type: 'span',
        text: `${keyword}が話題になっている背景について分析します。\n\n【検索トレンド】\n• Googleトレンドでの検索急上昇\n• SNS（X、Instagram）での言及数増加\n• 関連キーワードの検索ボリューム\n\n【ニュース要因】\n• 報道された内容や発表事項\n• 社会的な背景や時事性\n• 他のメディアでの取り上げ状況`
      }]
    },
    {
      _type: 'block',
      _key: 'how-to-watch',
      style: 'h2',
      children: [{ _type: 'span', text: '視聴方法（地上波/配信/見逃し）' }]
    },
    {
      _type: 'block',
      _key: 'watch-info',
      style: 'normal',
      children: [{
        _type: 'span',
        text: programTitle
          ? `【地上波】\n• ${programTitle}: [放送局・時間を記入]\n\n【配信サービス】\n• [配信サービス名]: [URL]\n• [見逃し配信]: [URL]\n\n【その他】\n• 再放送予定: [あれば記入]\n• DVD/Blu-ray: [発売予定があれば記入]`
          : '【地上波】\n• 関連番組: [番組名・放送局・時間]\n\n【配信サービス】\n• [配信サービス名]: [URL]\n• [見逃し配信]: [URL]\n\n【その他】\n• 関連コンテンツ: [あれば記入]'
      }]
    },
    {
      _type: 'block',
      _key: 'related-people',
      style: 'h2',
      children: [{ _type: 'span', text: '関連人物と過去回' }]
    },
    {
      _type: 'block',
      _key: 'people-info',
      style: 'normal',
      children: [{
        _type: 'span',
        text: persons?.length 
          ? `【主要人物】\n${persons.map(person => `• ${person}: [役割・プロフィール]`).join('\n')}\n\n【過去の関連回】\n• [過去のエピソードや出演歴]\n• [関連する番組や作品]`
          : '【関連人物】\n• [人物名]: [役割・プロフィール]\n• [人物名]: [役割・プロフィール]\n\n【過去の関連回】\n• [過去のエピソードや出演歴]\n• [関連する番組や作品]'
      }]
    },
    {
      _type: 'block',
      _key: 'summary-section',
      style: 'h2',
      children: [{ _type: 'span', text: 'まとめ（読者の次アクション）' }]
    },
    {
      _type: 'block',
      _key: 'summary-content',
      style: 'normal',
      children: [{
        _type: 'span',
        text: `${keyword}について詳しく解説しました。\n\n【読者へのおすすめアクション】\n• ${programTitle ? `「${programTitle}」の視聴` : '関連番組の視聴'}\n• SNSでの最新情報チェック\n• 関連記事の読み込み\n\n【今後の展開予想】\n• [今後の放送予定や展開]\n• [関連するイベントや発表]\n• [注目すべきポイント]`
      }]
    }
  ]

  return { title, excerpt, body }
}

export const ARTICLE_COMPONENTS = {
  InfoBox: {
    _type: 'object',
    name: 'infoBox',
    title: 'Info Box',
    fields: [
      { name: 'title', type: 'string', title: 'Title' },
      { name: 'content', type: 'text', title: 'Content' },
      { name: 'type', type: 'string', title: 'Type', options: { list: ['info', 'warning', 'success'] } }
    ]
  },
  Alert: {
    _type: 'object',
    name: 'alert',
    title: 'Alert',
    fields: [
      { name: 'message', type: 'string', title: 'Message' },
      { name: 'type', type: 'string', title: 'Type', options: { list: ['info', 'warning', 'error'] } }
    ]
  },
  Table: {
    _type: 'object',
    name: 'table',
    title: 'Table',
    fields: [
      { name: 'caption', type: 'string', title: 'Caption' },
      { name: 'rows', type: 'array', title: 'Rows', of: [{ type: 'array', of: [{ type: 'string' }] }] }
    ]
  }
}
