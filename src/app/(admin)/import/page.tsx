'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react'

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null)
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile)
      setError(null)
    } else {
      setError('CSVファイルを選択してください')
    }
  }

  const handleImport = async () => {
    if (!file) return

    setImporting(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/import/programs', {
        method: 'POST',
        headers: {
          'X-Import-Token': process.env.NEXT_PUBLIC_IMPORT_TOKEN || 'demo-token'
        },
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'インポートに失敗しました')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">番組データインポート</h1>
        <p className="text-muted-foreground">
          CSVファイルから番組データをSanityにインポートできます
        </p>
      </div>

      {/* CSV Format Info */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            CSVフォーマット
          </CardTitle>
          <CardDescription>
            以下の形式でCSVファイルを作成してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <div className="mb-2 font-semibold">ヘッダー行:</div>
            <div className="mb-4">title,network,startAt,endAt,episode,synopsis,persons,watchLinks</div>
            
            <div className="mb-2 font-semibold">データ例:</div>
            <div className="text-xs break-all">
              {`"ドラマ「サンプル」","フジテレビ","2025-08-18T21:00:00+09:00","2025-08-18T21:54:00+09:00","第1話","新作ドラマの第1話","田中太郎,佐藤花子","[{\\"label\\":\\"FOD\\",\\"url\\":\\"https://fod.fujitv.co.jp\\"}]"`}
            </div>
          </div>
          
          <div className="mt-4 space-y-2 text-sm">
            <div><strong>title:</strong> 番組タイトル（必須）</div>
            <div><strong>network:</strong> 放送局（必須）</div>
            <div><strong>startAt/endAt:</strong> 開始・終了時刻（ISO8601形式、必須）</div>
            <div><strong>episode:</strong> エピソード番号（任意）</div>
            <div><strong>synopsis:</strong> あらすじ（任意）</div>
            <div><strong>persons:</strong> 出演者（カンマ区切り、任意）</div>
            <div><strong>watchLinks:</strong> 視聴リンク（JSON形式、任意）</div>
          </div>
        </CardContent>
      </Card>

      {/* Import Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            ファイルアップロード
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
          </div>

          {file && (
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm">{file.name}</span>
              <Badge variant="secondary">{(file.size / 1024).toFixed(1)} KB</Badge>
            </div>
          )}

          <button
            onClick={handleImport}
            disabled={!file || importing}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-md font-medium"
          >
            {importing ? 'インポート中...' : 'インポート開始'}
          </button>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="mb-8 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">エラー</span>
            </div>
            <p className="mt-2 text-sm text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Result Display */}
      {result && (
        <Card className="border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-green-600 mb-4">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">インポート完了</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{result.results.created}</div>
                <div className="text-sm text-muted-foreground">作成</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{result.results.updated}</div>
                <div className="text-sm text-muted-foreground">更新</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{result.results.failed.length}</div>
                <div className="text-sm text-muted-foreground">失敗</div>
              </div>
            </div>

            {result.results.failed.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">失敗した行:</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {result.results.failed.map((failure: any, index: number) => (
                    <div key={index} className="text-sm bg-red-50 p-2 rounded">
                      <div className="font-medium">行 {failure.row}: {failure.error}</div>
                      <div className="text-muted-foreground">{failure.data}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
