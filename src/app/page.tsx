import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* ヘッダー */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Next.js 15 キャッシュ機能学習
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            4つの主要なキャッシュ機能を実際に体験しながら学習できるプロジェクトです。
            各機能の動作を確認し、パフォーマンスの向上について理解を深めましょう。
          </p>
        </header>

        {/* キャッシュ機能のカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Request Memoization */}
          <Link href="/request-memoization" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600">
              <div className="text-blue-600 dark:text-blue-400 text-3xl mb-4">
                🔄
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Request Memoization
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                同じリクエストの重複実行を防ぎ、パフォーマンスを向上させます。
              </p>
            </div>
          </Link>

          {/* Data Cache */}
          <Link href="/data-cache" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 group-hover:border-green-300 dark:group-hover:border-green-600">
              <div className="text-green-600 dark:text-green-400 text-3xl mb-4">
                💾
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Data Cache
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                データフェッチの結果をキャッシュし、API呼び出しを最適化します。
              </p>
            </div>
          </Link>

          {/* Full Route Cache */}
          <Link href="/full-route-cache" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 group-hover:border-purple-300 dark:group-hover:border-purple-600">
              <div className="text-purple-600 dark:text-purple-400 text-3xl mb-4">
                📄
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Full Route Cache
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                ページ全体をキャッシュし、レンダリング時間を短縮します。
              </p>
            </div>
          </Link>

          {/* Router Cache */}
          <Link href="/router-cache" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 group-hover:border-orange-300 dark:group-hover:border-orange-600">
              <div className="text-orange-600 dark:text-orange-400 text-3xl mb-4">
                🧭
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Router Cache
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                クライアントサイドのナビゲーションをキャッシュし、UXを向上させます。
              </p>
            </div>
          </Link>
        </div>

        {/* 学習の進め方 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📖 学習の進め方
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                1. 各機能を順番に確認
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                上記のカードをクリックして、各キャッシュ機能のページに移動します。
                各ページでは実際の動作を確認できます。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                2. 開発者ツールで確認
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                ブラウザの開発者ツールのNetworkタブを開いて、
                キャッシュの動作を実際に確認してください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
