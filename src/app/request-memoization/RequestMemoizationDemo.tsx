"use client";

import { useState } from "react";
import { getCurrentTime } from "@/app/utils/cache-utils";

/**
 * Request Memoization デモコンポーネント
 *
 * このコンポーネントは、Request Memoizationの動作を確認するための
 * インタラクティブなデモを提供します。
 */
export default function RequestMemoizationDemo() {
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 投稿データを取得する関数
   * この関数は、Request Memoizationにより自動的にメモ化されます
   *
   * @param author - 著者名（フィルタリング用）
   * @returns Promise<string> - 取得結果のメッセージ
   */
  async function fetchPosts(author: string): Promise<string> {
    const startTime = getCurrentTime();

    try {
      // APIエンドポイントを呼び出し
      const response = await fetch(`/api/posts?author=${author}`);
      const data = await response.json();

      const endTime = getCurrentTime();
      return `✅ ${author}の投稿を取得しました (${startTime} → ${endTime}) - ${data.data.posts.length}件`;
    } catch (error) {
      const endTime = getCurrentTime();
      return `❌ エラーが発生しました (${startTime} → ${endTime})`;
    }
  }

  /**
   * 複数の投稿データを同時に取得するテスト
   * Request Memoizationにより、同じ著者のデータは1回だけAPI呼び出しされます
   */
  async function testRequestMemoization() {
    setIsLoading(true);
    setResults([]);

    const newResults: string[] = [];

    // 同じ著者のデータを複数回取得（Request Memoizationの効果を確認）
    newResults.push("🔄 田中太郎の投稿を取得中...");
    const result1 = await fetchPosts("田中太郎");
    newResults.push(result1);

    newResults.push(
      "🔄 田中太郎の投稿を再度取得中...（Request Memoizationにより高速化されるはず）"
    );
    const result2 = await fetchPosts("田中太郎");
    newResults.push(result2);

    newResults.push("🔄 佐藤花子の投稿を取得中...");
    const result3 = await fetchPosts("佐藤花子");
    newResults.push(result3);

    newResults.push(
      "🔄 田中太郎の投稿を3回目取得中...（Request Memoizationにより高速化されるはず）"
    );
    const result4 = await fetchPosts("田中太郎");
    newResults.push(result4);

    setResults(newResults);
    setIsLoading(false);
  }

  /**
   * 異なる著者のデータを取得するテスト
   * 異なる引数なので、Request Memoizationは適用されません
   */
  async function testDifferentAuthors() {
    setIsLoading(true);
    setResults([]);

    const newResults: string[] = [];

    // 異なる著者のデータを取得（Request Memoizationは適用されない）
    newResults.push("🔄 田中太郎の投稿を取得中...");
    const result1 = await fetchPosts("田中太郎");
    newResults.push(result1);

    newResults.push("🔄 佐藤花子の投稿を取得中...");
    const result2 = await fetchPosts("佐藤花子");
    newResults.push(result2);

    newResults.push("🔄 鈴木一郎の投稿を取得中...");
    const result3 = await fetchPosts("鈴木一郎");
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
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          📝 デモの説明
        </h3>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          Request
          Memoizationにより、同じ引数での関数呼び出しは自動的にメモ化されます。
          下のボタンをクリックして、実際の動作を確認してください。
          開発者ツールのNetworkタブでAPI呼び出しの回数も確認できます。
        </p>
      </div>

      {/* 操作ボタン */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={testRequestMemoization}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "実行中..." : "🔄 同じ著者のデータを複数回取得"}
        </button>

        <button
          onClick={testDifferentAuthors}
          disabled={isLoading}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "実行中..." : "👥 異なる著者のデータを取得"}
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
              <li>
                • 同じ著者のデータ取得時間が短縮されている場合、Request
                Memoizationが動作しています
              </li>
              <li>
                •
                開発者ツールのNetworkタブで、実際のAPI呼び出し回数を確認してください
              </li>
              <li>
                • 異なる引数での呼び出しは、Request Memoizationの対象外です
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
          <li>• 同じ著者のデータ取得でAPI呼び出しが1回だけになることを確認</li>
          <li>• 実行時間の違いを観察（キャッシュヒット時は高速）</li>
          <li>• コンソールログでAPI呼び出しの詳細を確認</li>
        </ul>
      </div>
    </div>
  );
}
