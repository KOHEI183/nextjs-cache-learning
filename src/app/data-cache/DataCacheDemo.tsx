"use client";

import { useState } from "react";
import { getCurrentTime } from "@/app/utils/cache-utils";

/**
 * Data Cache デモコンポーネント
 *
 * このコンポーネントは、Data Cacheの動作を確認するための
 * インタラクティブなデモを提供します。
 */
export default function DataCacheDemo() {
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * キャッシュ付きでユーザーデータを取得する関数
   *
   * @param cacheBuster - キャッシュを無効化するためのパラメータ
   * @returns Promise<string> - 取得結果のメッセージ
   */
  async function fetchUserDataWithCache(cacheBuster?: string): Promise<string> {
    const startTime = getCurrentTime();

    try {
      // APIエンドポイントを呼び出し（キャッシュ付き）
      const url = cacheBuster
        ? `/api/users?cacheBuster=${cacheBuster}`
        : "/api/users";

      const response = await fetch(url);
      const data = await response.json();

      const endTime = getCurrentTime();
      return `✅ ユーザーデータを取得しました (${startTime} → ${endTime}) - ${data.data.users.length}件`;
    } catch (error) {
      const endTime = getCurrentTime();
      return `❌ エラーが発生しました (${startTime} → ${endTime})`;
    }
  }

  /**
   * キャッシュなしでユーザーデータを取得する関数
   *
   * @returns Promise<string> - 取得結果のメッセージ
   */
  async function fetchUserDataNoCache(): Promise<string> {
    const startTime = getCurrentTime();

    try {
      // APIエンドポイントを呼び出し（キャッシュなし）
      const response = await fetch("/api/users", {
        cache: "no-store",
      });
      const data = await response.json();

      const endTime = getCurrentTime();
      return `✅ ユーザーデータを取得しました（キャッシュなし） (${startTime} → ${endTime}) - ${data.data.users.length}件`;
    } catch (error) {
      const endTime = getCurrentTime();
      return `❌ エラーが発生しました (${startTime} → ${endTime})`;
    }
  }

  /**
   * 段階的再検証でユーザーデータを取得する関数
   *
   * @returns Promise<string> - 取得結果のメッセージ
   */
  async function fetchUserDataStaleWhileRevalidate(): Promise<string> {
    const startTime = getCurrentTime();

    try {
      // APIエンドポイントを呼び出し（段階的再検証）
      const response = await fetch("/api/users", {
        next: { revalidate: 10 }, // 10秒後に再検証
      });
      const data = await response.json();

      const endTime = getCurrentTime();
      return `✅ ユーザーデータを取得しました（段階的再検証） (${startTime} → ${endTime}) - ${data.data.users.length}件`;
    } catch (error) {
      const endTime = getCurrentTime();
      return `❌ エラーが発生しました (${startTime} → ${endTime})`;
    }
  }

  /**
   * 基本的なキャッシュテスト
   * 同じリクエストを複数回実行してキャッシュの効果を確認
   */
  async function testBasicCache() {
    setIsLoading(true);
    setResults([]);

    const newResults: string[] = [];

    // 1回目の取得（キャッシュミス）
    newResults.push("🔄 1回目: ユーザーデータを取得中...（キャッシュミス）");
    const result1 = await fetchUserDataWithCache();
    newResults.push(result1);

    // 2回目の取得（キャッシュヒット）
    newResults.push("🔄 2回目: ユーザーデータを取得中...（キャッシュヒット）");
    const result2 = await fetchUserDataWithCache();
    newResults.push(result2);

    // 3回目の取得（キャッシュヒット）
    newResults.push("🔄 3回目: ユーザーデータを取得中...（キャッシュヒット）");
    const result3 = await fetchUserDataWithCache();
    newResults.push(result3);

    setResults(newResults);
    setIsLoading(false);
  }

  /**
   * キャッシュ無効化テスト
   * キャッシュバスターを使用してキャッシュを無効化
   */
  async function testCacheInvalidation() {
    setIsLoading(true);
    setResults([]);

    const newResults: string[] = [];

    // 通常の取得
    newResults.push("🔄 通常の取得: ユーザーデータを取得中...");
    const result1 = await fetchUserDataWithCache();
    newResults.push(result1);

    // キャッシュバスター付きで取得（キャッシュを無効化）
    newResults.push(
      "🔄 キャッシュバスター付き: ユーザーデータを取得中...（キャッシュ無効化）"
    );
    const result2 = await fetchUserDataWithCache(`buster-${Date.now()}`);
    newResults.push(result2);

    // 再度通常の取得
    newResults.push("🔄 再度通常の取得: ユーザーデータを取得中...");
    const result3 = await fetchUserDataWithCache();
    newResults.push(result3);

    setResults(newResults);
    setIsLoading(false);
  }

  /**
   * 異なるキャッシュ戦略の比較テスト
   */
  async function testDifferentCacheStrategies() {
    setIsLoading(true);
    setResults([]);

    const newResults: string[] = [];

    // 通常のキャッシュ
    newResults.push("🔄 通常のキャッシュ: ユーザーデータを取得中...");
    const result1 = await fetchUserDataWithCache();
    newResults.push(result1);

    // キャッシュなし
    newResults.push("🔄 キャッシュなし: ユーザーデータを取得中...");
    const result2 = await fetchUserDataNoCache();
    newResults.push(result2);

    // 段階的再検証
    newResults.push("🔄 段階的再検証: ユーザーデータを取得中...");
    const result3 = await fetchUserDataStaleWhileRevalidate();
    newResults.push(result3);

    setResults(newResults);
    setIsLoading(false);
  }

  /**
   * 結果をクリアする
   */
  function clearResults() {
    setResults([]);
  }

  return (
    <div className="space-y-6">
      {/* 説明 */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          📝 デモの説明
        </h3>
        <p className="text-green-800 dark:text-green-200 text-sm">
          Data Cacheにより、fetch()の結果は自動的にキャッシュされます。
          下のボタンをクリックして、異なるキャッシュ戦略の動作を確認してください。
          開発者ツールのNetworkタブでキャッシュの動作も確認できます。
        </p>
      </div>

      {/* 操作ボタン */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={testBasicCache}
          disabled={isLoading}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "実行中..." : "🔄 基本的なキャッシュテスト"}
        </button>

        <button
          onClick={testCacheInvalidation}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "実行中..." : "🚫 キャッシュ無効化テスト"}
        </button>

        <button
          onClick={testDifferentCacheStrategies}
          disabled={isLoading}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "実行中..." : "⚡ 異なるキャッシュ戦略の比較"}
        </button>

        <button
          onClick={clearResults}
          disabled={isLoading}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          🗑️ 結果をクリア
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

          {/* 結果の解釈 */}
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              💡 結果の解釈
            </h4>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <li>• キャッシュヒット時は実行時間が短縮されます</li>
              <li>• キャッシュバスターによりキャッシュを無効化できます</li>
              <li>• 異なるキャッシュ戦略で動作が変わります</li>
              <li>
                •
                開発者ツールのNetworkタブでキャッシュヘッダーを確認してください
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* ヒント */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
          💡 確認のポイント
        </h3>
        <ul className="text-purple-800 dark:text-purple-200 text-sm space-y-1">
          <li>• ブラウザの開発者ツールを開いてNetworkタブを確認</li>
          <li>• レスポンスヘッダーのCache-Controlを確認</li>
          <li>• 実行時間の違いを観察（キャッシュヒット時は高速）</li>
          <li>• キャッシュバスターの効果を確認</li>
        </ul>
      </div>
    </div>
  );
}
