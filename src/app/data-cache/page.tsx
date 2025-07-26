import Link from "next/link";
import DataCacheDemo from "./DataCacheDemo";

/**
 * Data Cache 学習ページ
 *
 * Data Cacheは、Next.jsのfetch()やデータベースクエリの結果を
 * キャッシュする機能です。設定可能なTTLでキャッシュ期間を制御できます。
 *
 * このページでは、Data Cacheの動作を実際に確認できます。
 */
export default function DataCachePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* ナビゲーション */}
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
          >
            ← ホームに戻る
          </Link>
        </nav>

        {/* ヘッダー */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            💾 Data Cache
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            データフェッチの結果をキャッシュし、API呼び出しを最適化する機能です。
            設定可能なTTL（Time To Live）でキャッシュ期間を制御できます。
          </p>
        </header>

        {/* 説明セクション */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* 概要 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              📋 概要
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                <strong>Data Cache</strong>
                は、Next.jsのfetch()やデータベースクエリの結果を
                自動的にキャッシュする機能です。
              </p>
              <p>
                これにより、同じデータを複数回取得する際に、実際のAPI呼び出しや
                データベースクエリを実行せずにキャッシュから高速に取得できます。
              </p>
              <p>
                キャッシュ期間は、Cache-ControlヘッダーやNext.jsの設定で制御できます。
              </p>
            </div>
          </div>

          {/* 動作原理 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ⚙️ 動作原理
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  1. 自動キャッシュ
                </h3>
                <p>
                  fetch()の結果は自動的にキャッシュされ、同じURLへのリクエストは高速化されます。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  2. TTL制御
                </h3>
                <p>
                  Cache-Controlヘッダーでキャッシュ期間を設定し、データの鮮度を管理します。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  3. 段階的再検証
                </h3>
                <p>
                  stale-while-revalidateにより、古いデータを表示しながら背景で更新します。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* デモセクション */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🧪 動作確認デモ
          </h2>
          <DataCacheDemo />
        </div>

        {/* コード例 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            💻 コード例
          </h2>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`// Data Cacheの例
// fetch()の結果は自動的にキャッシュされる

// 基本的な使用方法
async function fetchUserData() {
  const response = await fetch('/api/users');
  return response.json();
}

// キャッシュ期間を指定
async function fetchUserDataWithCache() {
  const response = await fetch('/api/users', {
    next: { revalidate: 60 } // 60秒間キャッシュ
  });
  return response.json();
}

// キャッシュを無効化
async function fetchUserDataNoCache() {
  const response = await fetch('/api/users', {
    cache: 'no-store' // キャッシュしない
  });
  return response.json();
}

// 段階的再検証
async function fetchUserDataStaleWhileRevalidate() {
  const response = await fetch('/api/users', {
    next: { 
      revalidate: 10, // 10秒後に再検証
      tags: ['users'] // タグ付きキャッシュ
    }
  });
  return response.json();
}`}
            </pre>
          </div>
        </div>

        {/* キャッシュ戦略 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🎯 キャッシュ戦略
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                🚀 高速キャッシュ
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                頻繁にアクセスされるデータは長期間キャッシュして、
                レスポンス時間を短縮します。
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                🔄 段階的再検証
              </h3>
              <p className="text-green-800 dark:text-green-200 text-sm">
                古いデータを表示しながら背景で更新し、
                ユーザー体験を向上させます。
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                🏷️ タグ付きキャッシュ
              </h3>
              <p className="text-purple-800 dark:text-purple-200 text-sm">
                関連するデータにタグを付けて、
                一括でキャッシュを無効化できます。
              </p>
            </div>
          </div>
        </div>

        {/* ベストプラクティス */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ✅ ベストプラクティス
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🎯 効果的な使用方法
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• 静的データは長期間キャッシュ</li>
                <li>• 動的データは適切なTTLを設定</li>
                <li>• 段階的再検証でUXを向上</li>
                <li>• タグ付きキャッシュで管理を簡素化</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                ⚠️ 注意点
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• 個人情報はキャッシュしない</li>
                <li>• リアルタイム性が重要なデータは注意</li>
                <li>• キャッシュサイズの管理</li>
                <li>• 適切なTTL設定</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
