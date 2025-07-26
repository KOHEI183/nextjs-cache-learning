import Link from "next/link";
import RequestMemoizationDemo from "./RequestMemoizationDemo";

/**
 * Request Memoization 学習ページ
 *
 * Request Memoizationは、Next.js 15の新機能で、
 * 同じリクエストの重複実行を自動的に防ぐ機能です。
 *
 * このページでは、Request Memoizationの動作を実際に確認できます。
 */
export default function RequestMemoizationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* ナビゲーション */}
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
          >
            ← ホームに戻る
          </Link>
        </nav>

        {/* ヘッダー */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🔄 Request Memoization
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            同じリクエストの重複実行を自動的に防ぎ、パフォーマンスを向上させる機能です。
            サーバーコンポーネント内で同じ引数での関数呼び出しを自動的にメモ化します。
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
                <strong>Request Memoization</strong>は、Next.js
                15で導入された新機能で、
                サーバーコンポーネント内での同じ引数での関数呼び出しを自動的にメモ化します。
              </p>
              <p>
                これにより、同じデータフェッチが複数回実行されることを防ぎ、
                パフォーマンスを大幅に向上させることができます。
              </p>
              <p>
                特に、複数のコンポーネントが同じデータを必要とする場合に効果的です。
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
                  1. 自動メモ化
                </h3>
                <p>
                  同じ引数での関数呼び出しを自動的に検出し、結果をキャッシュします。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  2. リクエストスコープ
                </h3>
                <p>
                  キャッシュはリクエストスコープ内でのみ有効で、リクエスト終了時にクリアされます。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  3. 透過的
                </h3>
                <p>開発者が特別な設定をすることなく、自動的に動作します。</p>
              </div>
            </div>
          </div>
        </div>

        {/* デモセクション */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🧪 動作確認デモ
          </h2>
          <RequestMemoizationDemo />
        </div>

        {/* コード例 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            💻 コード例
          </h2>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`// Request Memoizationの例
// 同じ引数での関数呼び出しは自動的にメモ化される

async function fetchUserData(userId: string) {
  // この関数は同じuserIdで呼び出された場合、
  // 自動的にメモ化される
  const response = await fetch(\`/api/users/\${userId}\`);
  return response.json();
}

// 複数のコンポーネントで同じデータを取得
const user1 = await fetchUserData('123'); // 実際のAPI呼び出し
const user2 = await fetchUserData('123'); // キャッシュから取得（高速）
const user3 = await fetchUserData('456'); // 新しいAPI呼び出し`}
            </pre>
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
                <li>• 同じデータを複数のコンポーネントで使用する場合</li>
                <li>• データベースクエリやAPI呼び出し</li>
                <li>• 重い計算処理</li>
                <li>• 外部APIからのデータ取得</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                ⚠️ 注意点
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• リクエストスコープ内でのみ有効</li>
                <li>• 引数が異なる場合は別のキャッシュ</li>
                <li>• 副作用のある関数には注意</li>
                <li>• デバッグ時はコンソールで確認</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
