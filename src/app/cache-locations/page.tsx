import {
  CACHE_LOCATIONS,
  getCacheDirectoryInfo,
} from "@/app/utils/cache-utils";

/**
 * キャッシュの保存場所確認ページ
 */
export default function CacheLocationsPage() {
  const cacheInfo = getCacheDirectoryInfo();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        📍 Next.jsキャッシュの保存場所
      </h1>

      <div className="space-y-8">
        {/* 概要 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
            🔍 キャッシュの確認方法
          </h2>
          <div className="space-y-3 text-blue-800 dark:text-blue-200">
            <p>
              Next.jsのキャッシュは複数の層に分かれており、それぞれ異なる場所に保存されます。
              以下の方法でキャッシュの状態を確認できます：
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <strong>ファイルシステムキャッシュ</strong>:{" "}
                <code>.next/cache/</code> ディレクトリを確認
              </li>
              <li>
                <strong>メモリキャッシュ</strong>:
                開発者ツールのNetworkタブで確認
              </li>
              <li>
                <strong>サーバーログ</strong>:
                コンソールでAPI呼び出しの詳細を確認
              </li>
            </ul>
          </div>
        </div>

        {/* キャッシュの種類と保存場所 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            🗂️ キャッシュの種類と保存場所
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(CACHE_LOCATIONS).map(([key, cache]) => (
              <div
                key={key}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      cache.type === "メモリベース"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {cache.name}
                  </h3>
                </div>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div>
                    <span className="font-medium">保存場所:</span>{" "}
                    {cache.location}
                  </div>
                  <div>
                    <span className="font-medium">タイプ:</span> {cache.type}
                  </div>
                  <div>
                    <span className="font-medium">永続性:</span>{" "}
                    {cache.persistence}
                  </div>
                  <div>
                    <span className="font-medium">スコープ:</span> {cache.scope}
                  </div>
                  <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    {cache.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 確認方法 */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-4">
            🔧 キャッシュの確認方法
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                1. ファイルシステムキャッシュの確認
              </h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                <div># キャッシュディレクトリの確認</div>
                <div>ls -la .next/cache/</div>
                <div>ls -la .next/server/app/data-cache/</div>
                <div>ls -la .next/server/app/full-route-cache/</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                2. メモリキャッシュの確認
              </h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                <div># 開発者ツール → Networkタブ</div>
                <div># レスポンスヘッダーの確認</div>
                <div># Cache-Control, ETag, Last-Modified</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                3. サーバーログの確認
              </h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                <div># ターミナルでサーバーログを確認</div>
                <div>npm run dev</div>
                <div># API呼び出しの詳細が表示される</div>
              </div>
            </div>
          </div>
        </div>

        {/* キャッシュディレクトリ情報 */}
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4">
            📁 キャッシュディレクトリ情報
          </h2>

          <div className="space-y-3">
            {Object.entries(cacheInfo.paths).map(([key, path]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="font-medium text-purple-800 dark:text-purple-200">
                    {
                      cacheInfo.description[
                        key as keyof typeof cacheInfo.description
                      ]
                    }
                  </span>
                </div>
                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {path}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* ヒント */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-4">
            💡 重要なポイント
          </h2>
          <ul className="space-y-2 text-yellow-800 dark:text-yellow-200">
            <li>
              • <strong>ファイルシステムキャッシュ</strong>
              は永続的で、サーバー再起動後も保持されます
            </li>
            <li>
              • <strong>メモリキャッシュ</strong>
              は高速ですが、サーバー再起動でクリアされます
            </li>
            <li>
              •
              開発環境では、キャッシュの動作を確認するために開発者ツールを使用してください
            </li>
            <li>
              •
              本番環境では、キャッシュの設定を適切に行い、パフォーマンスを最適化してください
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
