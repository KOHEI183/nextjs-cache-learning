import Link from "next/link";

/**
 * 開発環境でのDevToolsでキャッシュを確認するガイドページ
 */
export default function DevToolsGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        🔧 開発環境でのDevToolsでキャッシュを確認する方法
      </h1>

      <div className="space-y-8">
        {/* 概要 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
            📋 確認できるキャッシュの種類
          </h2>
          <div className="space-y-3 text-blue-800 dark:text-blue-200">
            <p>
              開発環境のDevToolsでは、以下のキャッシュの動作を確認できます：
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <strong>Data Cache</strong>:
                NetworkタブでAPI呼び出しのキャッシュ状態を確認
              </li>
              <li>
                <strong>Request Memoization</strong>:
                同じAPI呼び出しの重複実行を確認
              </li>
              <li>
                <strong>Router Cache</strong>:
                ページ遷移時のキャッシュ動作を確認
              </li>
              <li>
                <strong>Full Route Cache</strong>:
                静的ページのキャッシュ状態を確認
              </li>
            </ul>
          </div>
        </div>

        {/* Networkタブでの確認方法 */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-4">
            🌐 Networkタブでの確認方法
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                1. Networkタブを開く
              </h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                <div>F12 → Networkタブ</div>
                <div>または Ctrl+Shift+I (Windows) / Cmd+Option+I (Mac)</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                2. 確認できる情報
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                  <h4 className="font-semibold mb-2">リクエスト情報</h4>
                  <ul className="text-sm space-y-1">
                    <li>• リクエストのURL</li>
                    <li>• HTTPメソッド</li>
                    <li>• リクエストヘッダー</li>
                    <li>• リクエストボディ</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                  <h4 className="font-semibold mb-2">レスポンス情報</h4>
                  <ul className="text-sm space-y-1">
                    <li>• ステータスコード</li>
                    <li>• レスポンスヘッダー</li>
                    <li>• レスポンスボディ</li>
                    <li>• 実行時間</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                3. キャッシュ関連のヘッダー
              </h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                <div>
                  Cache-Control: public, s-maxage=10, stale-while-revalidate=59
                </div>
                <div>ETag: "abc123"</div>
                <div>Last-Modified: Wed, 26 Jul 2023 10:00:00 GMT</div>
                <div>Age: 5</div>
              </div>
            </div>
          </div>
        </div>

        {/* 各キャッシュタイプの確認方法 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            📊 各キャッシュタイプの確認方法
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Data Cache */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Data Cache
                </h3>
              </div>

              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <span className="font-medium">確認方法:</span>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>NetworkタブでAPI呼び出しを確認</li>
                    <li>同じリクエストの実行時間を比較</li>
                    <li>キャッシュヒット時は高速化</li>
                  </ul>
                </div>
                <div>
                  <span className="font-medium">確認ポイント:</span>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>レスポンスヘッダーのCache-Control</li>
                    <li>実行時間の短縮</li>
                    <li>サーバーログでのAPI呼び出し回数</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <Link
                    href="/data-cache"
                    className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    デモを試す →
                  </Link>
                </div>
              </div>
            </div>

            {/* Request Memoization */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Request Memoization
                </h3>
              </div>

              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <span className="font-medium">確認方法:</span>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>同じ引数での関数呼び出しを確認</li>
                    <li>NetworkタブでAPI呼び出し回数</li>
                    <li>実行時間の比較</li>
                  </ul>
                </div>
                <div>
                  <span className="font-medium">確認ポイント:</span>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>同じリクエストの重複実行を防ぐ</li>
                    <li>メモリ内でのキャッシュ</li>
                    <li>リクエスト間での保持</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <Link
                    href="/request-memoization"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    デモを試す →
                  </Link>
                </div>
              </div>
            </div>

            {/* Router Cache */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Router Cache
                </h3>
              </div>

              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <span className="font-medium">確認方法:</span>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>ページ遷移時の動作を確認</li>
                    <li>Networkタブでリソース読み込み</li>
                    <li>ページの表示速度</li>
                  </ul>
                </div>
                <div>
                  <span className="font-medium">確認ポイント:</span>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>クライアントサイドナビゲーション</li>
                    <li>メモリ内でのキャッシュ</li>
                    <li>ページ遷移の高速化</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <Link
                    href="/router-cache"
                    className="inline-block px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                  >
                    デモを試す →
                  </Link>
                </div>
              </div>
            </div>

            {/* Full Route Cache */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Full Route Cache
                </h3>
              </div>

              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <span className="font-medium">確認方法:</span>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>静的ページの読み込みを確認</li>
                    <li>NetworkタブでHTMLレスポンス</li>
                    <li>ページの表示速度</li>
                  </ul>
                </div>
                <div>
                  <span className="font-medium">確認ポイント:</span>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>完全なページのキャッシュ</li>
                    <li>ファイルシステムでの保存</li>
                    <li>静的生成の効果</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <Link
                    href="/full-route-cache"
                    className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                  >
                    デモを試す →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 実践的な確認手順 */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-4">
            🎯 実践的な確認手順
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                ステップ1: 開発者ツールを開く
              </h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                <div>1. F12キーを押す</div>
                <div>2. Networkタブを選択</div>
                <div>3. "Preserve log"にチェックを入れる</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                ステップ2: キャッシュの動作を確認
              </h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                <div>1. 各デモページに移動</div>
                <div>2. ボタンをクリックしてテスト実行</div>
                <div>3. Networkタブでリクエストを確認</div>
                <div>4. 同じ操作を複数回実行</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                ステップ3: 結果を分析
              </h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                <div>1. 実行時間の比較</div>
                <div>2. リクエスト回数の確認</div>
                <div>3. レスポンスヘッダーの確認</div>
                <div>4. キャッシュヒット/ミスの判定</div>
              </div>
            </div>
          </div>
        </div>

        {/* よくある質問 */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-4">
            ❓ よくある質問
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Q: 開発環境でもキャッシュは動作しますか？
              </h3>
              <p className="text-red-800 dark:text-red-200">
                A:
                はい、開発環境でもキャッシュは動作します。ただし、開発環境では一部のキャッシュが無効化される場合があります。
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Q: キャッシュが効いていないように見える場合は？
              </h3>
              <p className="text-red-800 dark:text-red-200">
                A: 開発者ツールのNetworkタブで"Disable
                cache"が有効になっていないか確認してください。また、サーバーを再起動するとキャッシュがクリアされます。
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Q: 本番環境との違いは？
              </h3>
              <p className="text-red-800 dark:text-red-200">
                A:
                本番環境では、より積極的にキャッシュが使用され、パフォーマンスが向上します。開発環境では、デバッグしやすくするために一部のキャッシュが制限される場合があります。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
