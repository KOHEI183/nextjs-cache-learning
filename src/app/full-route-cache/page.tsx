import Link from "next/link";
import FullRouteCacheDemo from "./FullRouteCacheDemo";

/**
 * Full Route Cache 学習ページ
 *
 * Full Route Cacheは、ページ全体をキャッシュし、
 * レンダリング時間を短縮する機能です。
 *
 * このページでは、Full Route Cacheの動作を実際に確認できます。
 */
export default function FullRouteCachePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* ナビゲーション */}
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
          >
            ← ホームに戻る
          </Link>
        </nav>

        {/* ヘッダー */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            📄 Full Route Cache
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            ページ全体をキャッシュし、レンダリング時間を短縮する機能です。
            静的ページや動的ページのパフォーマンスを大幅に向上させます。
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
                <strong>Full Route Cache</strong>
                は、Next.jsがページ全体をキャッシュし、
                同じURLへのリクエストに対してキャッシュされたHTMLを返す機能です。
              </p>
              <p>
                これにより、サーバーサイドでのレンダリング処理をスキップし、
                レスポンス時間を大幅に短縮できます。
              </p>
              <p>
                静的ページや、頻繁にアクセスされる動的ページで特に効果的です。
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
                  1. ページキャッシュ
                </h3>
                <p>
                  レンダリングされたHTML全体をキャッシュし、再レンダリングを回避します。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  2. 自動適用
                </h3>
                <p>
                  静的ページや適切に設定された動的ページに自動的に適用されます。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  3. 段階的再検証
                </h3>
                <p>
                  設定された間隔で背景でページを再生成し、データの鮮度を保ちます。
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
          <FullRouteCacheDemo />
        </div>

        {/* コード例 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            💻 コード例
          </h2>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`// Full Route Cacheの例
// ページ全体をキャッシュする設定

// 1. 静的ページ（自動的にキャッシュされる）
export default function StaticPage() {
  return <div>このページは自動的にキャッシュされます</div>;
}

// 2. 動的ページ（revalidate設定）
export default async function DynamicPage() {
  const data = await fetch('/api/products', {
    next: { revalidate: 3600 } // 1時間ごとに再生成
  });
  
  return <div>動的データを含むページ</div>;
}

// 3. 段階的再検証
export default async function StaleWhileRevalidatePage() {
  const data = await fetch('/api/products', {
    next: { 
      revalidate: 60, // 1分後に再検証
      tags: ['products'] // タグ付きキャッシュ
    }
  });
  
  return <div>段階的再検証されるページ</div>;
}

// 4. キャッシュを無効化
export const dynamic = 'force-dynamic';
export default function NoCachePage() {
  return <div>このページはキャッシュされません</div>;
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
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                🚀 静的キャッシュ
              </h3>
              <p className="text-purple-800 dark:text-purple-200 text-sm">
                完全に静的なページは長期間キャッシュして、
                最速のレスポンスを実現します。
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                🔄 定期的再生成
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                定期的にページを再生成して、
                データの鮮度を保ちながらパフォーマンスを向上させます。
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                🏷️ タグ付き無効化
              </h3>
              <p className="text-green-800 dark:text-green-200 text-sm">
                関連するページにタグを付けて、
                データ更新時に一括でキャッシュを無効化します。
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
                <li>• 静的コンテンツは長期間キャッシュ</li>
                <li>• 動的データは適切なrevalidate設定</li>
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
                <li>• リアルタイム性が重要なページは注意</li>
                <li>• 適切なrevalidate期間の設定</li>
                <li>• キャッシュサイズの管理</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
