import Link from "next/link";
import RouterCacheDemo from "./RouterCacheDemo";

/**
 * Router Cache 学習ページ
 *
 * Router Cacheは、クライアントサイドのナビゲーションをキャッシュし、
 * ユーザーのナビゲーション体験を向上させる機能です。
 *
 * このページでは、Router Cacheの動作を実際に確認できます。
 */
export default function RouterCachePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* ナビゲーション */}
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200"
          >
            ← ホームに戻る
          </Link>
        </nav>

        {/* ヘッダー */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🧭 Router Cache
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            クライアントサイドのナビゲーションをキャッシュし、ユーザーのナビゲーション体験を向上させる機能です。
            ページ間の遷移を高速化し、スムーズなUXを実現します。
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
                <strong>Router Cache</strong>は、Next.jsがクライアントサイドでの
                ページ遷移時にページの状態をキャッシュする機能です。
              </p>
              <p>
                これにより、一度訪問したページに戻る際に、即座に表示され、
                ユーザーのナビゲーション体験が大幅に向上します。
              </p>
              <p>
                特に、フォームの入力状態やスクロール位置なども保持されます。
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
                  1. ページ状態キャッシュ
                </h3>
                <p>
                  訪問したページの状態（スクロール位置、フォーム入力など）をキャッシュします。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  2. 即座の表示
                </h3>
                <p>
                  キャッシュされたページに戻る際は、即座に表示され、ローディング時間が短縮されます。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  3. 背景更新
                </h3>
                <p>
                  キャッシュされたページを表示しながら、背景で最新データを取得します。
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
          <RouterCacheDemo />
        </div>

        {/* コード例 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            💻 コード例
          </h2>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`// Router Cacheの例
// クライアントサイドナビゲーションのキャッシュ

// 1. 基本的なページ遷移（自動的にキャッシュされる）
import Link from 'next/link';

export default function NavigationExample() {
  return (
    <div>
      <Link href="/products">商品一覧</Link>
      <Link href="/users">ユーザー一覧</Link>
    </div>
  );
}

// 2. プログラムによるナビゲーション
'use client';
import { useRouter } from 'next/navigation';

export default function ProgrammaticNavigation() {
  const router = useRouter();
  
  const navigateToProducts = () => {
    router.push('/products'); // キャッシュされる
  };
  
  return <button onClick={navigateToProducts}>商品一覧へ</button>;
}

// 3. キャッシュを無効化するナビゲーション
'use client';
import { useRouter } from 'next/navigation';

export default function NoCacheNavigation() {
  const router = useRouter();
  
  const navigateWithoutCache = () => {
    router.push('/products', { scroll: false }); // スクロール位置をリセット
  };
  
  return <button onClick={navigateWithoutCache}>キャッシュなしで移動</button>;
}

// 4. フォーム状態の保持
'use client';
import { useState } from 'react';

export default function FormWithCache() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  // フォームの状態はRouter Cacheにより保持される
  return (
    <form>
      <input
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="名前"
      />
      <input
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="メールアドレス"
      />
    </form>
  );
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
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                🚀 即座の表示
              </h3>
              <p className="text-orange-800 dark:text-orange-200 text-sm">
                キャッシュされたページは即座に表示され、
                ユーザーの待ち時間を最小限に抑えます。
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                🔄 背景更新
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                キャッシュされたページを表示しながら、
                背景で最新データを取得して更新します。
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                💾 状態保持
              </h3>
              <p className="text-green-800 dark:text-green-200 text-sm">
                フォームの入力状態やスクロール位置を保持し、
                ユーザーの作業を継続できます。
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
                <li>• 頻繁にアクセスされるページのキャッシュ</li>
                <li>• フォーム入力状態の保持</li>
                <li>• スクロール位置の保持</li>
                <li>• 複雑なUI状態の保持</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                ⚠️ 注意点
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• メモリ使用量の管理</li>
                <li>• 古いデータの表示に注意</li>
                <li>• セキュリティ情報の保持に注意</li>
                <li>• 適切なキャッシュ無効化</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
