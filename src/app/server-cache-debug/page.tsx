"use client";

import { useState } from "react";
import { getCurrentTime } from "@/app/utils/cache-utils";

/**
 * サーバー側キャッシュのデバッグページ
 */
export default function ServerCacheDebugPage() {
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cacheInfo, setCacheInfo] = useState<any>(null);

  /**
   * サーバー側キャッシュの情報を取得する関数
   */
  async function fetchServerCacheInfo(): Promise<string> {
    const startTime = getCurrentTime();

    try {
      // サーバー側のキャッシュ情報を取得するAPIエンドポイント
      const response = await fetch("/api/cache-info", {
        cache: "no-store", // キャッシュを無効化して最新情報を取得
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const endTime = getCurrentTime();

      // キャッシュ情報を保存
      setCacheInfo(data);

      return `✅ サーバー側キャッシュ情報を取得しました (${startTime} → ${endTime})`;
    } catch (error) {
      const endTime = getCurrentTime();
      return `❌ エラーが発生しました (${startTime} → ${endTime}): ${error}`;
    }
  }

  /**
   * キャッシュをクリアする関数
   */
  async function clearServerCache(): Promise<string> {
    const startTime = getCurrentTime();

    try {
      const response = await fetch("/api/cache-clear", {
        method: "POST",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const endTime = getCurrentTime();

      return `✅ サーバー側キャッシュをクリアしました (${startTime} → ${endTime})`;
    } catch (error) {
      const endTime = getCurrentTime();
      return `❌ エラーが発生しました (${startTime} → ${endTime}): ${error}`;
    }
  }

  /**
   * サーバー側キャッシュの情報を取得
   */
  async function testServerCacheInfo() {
    setIsLoading(true);
    setResults([]);

    const newResults: string[] = [];

    newResults.push("🔄 サーバー側キャッシュ情報を取得中...");
    const result = await fetchServerCacheInfo();
    newResults.push(result);

    setResults(newResults);
    setIsLoading(false);
  }

  /**
   * キャッシュの動作をテスト
   */
  async function testCacheBehavior() {
    setIsLoading(true);
    setResults([]);

    const newResults: string[] = [];

    // 1回目の取得
    newResults.push("🔄 1回目: データを取得中...");
    const response1 = await fetch("/api/users", { cache: "no-store" });
    const data1 = await response1.json();
    newResults.push(
      `✅ 1回目完了 - レスポンス時間: ${
        response1.headers.get("x-response-time") || "N/A"
      }`
    );

    // 2回目の取得（キャッシュヒットの可能性）
    newResults.push("🔄 2回目: データを取得中...（キャッシュヒットの可能性）");
    const response2 = await fetch("/api/users", { cache: "no-store" });
    const data2 = await response2.json();
    newResults.push(
      `✅ 2回目完了 - レスポンス時間: ${
        response2.headers.get("x-response-time") || "N/A"
      }`
    );

    // 3回目の取得
    newResults.push("🔄 3回目: データを取得中...");
    const response3 = await fetch("/api/users", { cache: "no-store" });
    const data3 = await response3.json();
    newResults.push(
      `✅ 3回目完了 - レスポンス時間: ${
        response3.headers.get("x-response-time") || "N/A"
      }`
    );

    setResults(newResults);
    setIsLoading(false);
  }

  /**
   * キャッシュをクリア
   */
  async function testCacheClear() {
    setIsLoading(true);
    setResults([]);

    const newResults: string[] = [];

    newResults.push("🔄 サーバー側キャッシュをクリア中...");
    const result = await clearServerCache();
    newResults.push(result);

    setResults(newResults);
    setIsLoading(false);
  }

  /**
   * 結果をクリア
   */
  function clearResults() {
    setResults([]);
    setCacheInfo(null);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        🔍 サーバー側キャッシュのデバッグ
      </h1>

      <div className="space-y-8">
        {/* 説明 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
            📋 サーバー側キャッシュの確認方法
          </h2>
          <div className="space-y-3 text-blue-800 dark:text-blue-200">
            <p>
              サーバー側のキャッシュは、クライアントのDevToolsでは直接確認できません。
              以下の方法で間接的に確認できます：
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <strong>レスポンス時間の比較</strong>: キャッシュヒット時は高速
              </li>
              <li>
                <strong>サーバーログの確認</strong>:
                ターミナルでAPI呼び出し回数を確認
              </li>
              <li>
                <strong>レスポンスヘッダーの確認</strong>:
                Cache-Control、ETag、Ageヘッダー
              </li>
              <li>
                <strong>ファイルシステムの確認</strong>:
                .next/cache/ディレクトリの内容
              </li>
            </ul>
          </div>
        </div>

        {/* 操作ボタン */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={testServerCacheInfo}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "実行中..." : "📊 サーバー側キャッシュ情報を取得"}
          </button>

          <button
            onClick={testCacheBehavior}
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "実行中..." : "🔄 キャッシュの動作をテスト"}
          </button>

          <button
            onClick={testCacheClear}
            disabled={isLoading}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "実行中..." : "🗑️ キャッシュをクリア"}
          </button>

          <button
            onClick={clearResults}
            disabled={isLoading}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            🧹 結果をクリア
          </button>
        </div>

        {/* 結果表示 */}
        {results.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📊 実行結果
            </h3>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm ${
                    result.includes("✅")
                      ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                      : result.includes("❌")
                      ? "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                      : "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
                  }`}
                >
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* キャッシュ情報の表示 */}
        {cacheInfo && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📋 サーバー側キャッシュ情報
            </h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded font-mono text-sm overflow-auto">
              <pre className="text-gray-800 dark:text-gray-200">
                {JSON.stringify(cacheInfo, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* 確認方法の詳細 */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4">
              🔍 間接的な確認方法
            </h3>
            <ul className="text-yellow-800 dark:text-yellow-200 space-y-2">
              <li>
                • <strong>レスポンス時間</strong>: キャッシュヒット時は短縮
              </li>
              <li>
                • <strong>サーバーログ</strong>: ターミナルでAPI呼び出し回数
              </li>
              <li>
                • <strong>レスポンスヘッダー</strong>: Cache-Control、ETag、Age
              </li>
              <li>
                • <strong>ファイルシステム</strong>: .next/cache/ディレクトリ
              </li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4">
              ❌ 直接確認できない理由
            </h3>
            <ul className="text-red-800 dark:text-red-200 space-y-2">
              <li>
                • <strong>サーバーサイド</strong>: クライアントからは見えない
              </li>
              <li>
                • <strong>メモリ内キャッシュ</strong>:
                ファイルシステムに保存されない
              </li>
              <li>
                • <strong>セキュリティ</strong>: 内部実装の詳細は隠蔽
              </li>
              <li>
                • <strong>パフォーマンス</strong>: デバッグ情報の出力は負荷
              </li>
            </ul>
          </div>
        </div>

        {/* ヒント */}
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">
            💡 デバッグのヒント
          </h3>
          <ul className="text-purple-800 dark:text-purple-200 space-y-2">
            <li>• ターミナルでサーバーログを確認（API呼び出しの詳細）</li>
            <li>• 開発者ツールのNetworkタブでレスポンスヘッダーを確認</li>
            <li>• 同じリクエストを複数回実行して実行時間を比較</li>
            <li>• キャッシュをクリアしてから再テスト</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
