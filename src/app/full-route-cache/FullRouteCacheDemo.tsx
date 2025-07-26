"use client";

import { useState } from "react";
import { getCurrentTime } from "@/app/utils/cache-utils";

/**
 * Full Route Cache デモコンポーネント
 *
 * このコンポーネントは、Full Route Cacheの動作を確認するための
 * インタラクティブなデモを提供します。
 */
export default function FullRouteCacheDemo() {
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 商品データを取得する関数（Full Route Cacheの効果を確認）
   *
   * @param category - 商品カテゴリ
   * @returns Promise<string> - 取得結果のメッセージ
   */
  async function fetchProductData(category: string): Promise<string> {
    const startTime = getCurrentTime();

    try {
      // APIエンドポイントを呼び出し
      const response = await fetch(`/api/products?category=${category}`);
      const data = await response.json();

      const endTime = getCurrentTime();
      return `✅ ${category}の商品データを取得しました (${startTime} → ${endTime}) - ${data.data.products.length}件`;
    } catch (error) {
      const endTime = getCurrentTime();
      return `❌ エラーが発生しました (${startTime} → ${endTime})`;
    }
  }

  /**
   * ページの再読み込みをシミュレートする関数
   * Full Route Cacheの効果を確認するため
   */
  async function simulatePageReload() {
    const startTime = getCurrentTime();

    // ページの再読み込みをシミュレート（実際には同じページに留まる）
    await new Promise((resolve) => setTimeout(resolve, 100));

    const endTime = getCurrentTime();
    return `🔄 ページ再読み込みシミュレーション (${startTime} → ${endTime})`;
  }

  /**
   * 基本的なFull Route Cacheテスト
   * 同じページを複数回アクセスしてキャッシュの効果を確認
   */
  async function testBasicFullRouteCache() {
    setIsLoading(true);
    setResults([]);

    const newResults: string[] = [];

    // 1回目のアクセス（キャッシュミス）
    newResults.push("🔄 1回目: 商品ページにアクセス中...（キャッシュミス）");
    const result1 = await fetchProductData("Electronics");
    newResults.push(result1);

    // ページ再読み込みシミュレーション
    newResults.push("🔄 ページ再読み込みシミュレーション...");
    const reloadResult = await simulatePageReload();
    newResults.push(reloadResult);

    // 2回目のアクセス（キャッシュヒット）
    newResults.push(
      "🔄 2回目: 同じ商品ページにアクセス中...（キャッシュヒット）"
    );
    const result2 = await fetchProductData("Electronics");
    newResults.push(result2);

    // 3回目のアクセス（キャッシュヒット）
    newResults.push(
      "🔄 3回目: 同じ商品ページにアクセス中...（キャッシュヒット）"
    );
    const result3 = await fetchProductData("Electronics");
    newResults.push(result3);

    setResults(newResults);
    setIsLoading(false);
  }

  /**
   * 異なるカテゴリでのFull Route Cacheテスト
   * 異なるURLでは別のキャッシュが使用されることを確認
   */
  async function testDifferentCategories() {
    setIsLoading(true);
    setResults([]);

    const newResults: string[] = [];

    // Electronicsカテゴリ
    newResults.push("🔄 Electronicsカテゴリ: 商品ページにアクセス中...");
    const result1 = await fetchProductData("Electronics");
    newResults.push(result1);

    // 同じカテゴリの2回目（キャッシュヒット）
    newResults.push(
      "🔄 Electronicsカテゴリ: 2回目アクセス中...（キャッシュヒット）"
    );
    const result2 = await fetchProductData("Electronics");
    newResults.push(result2);

    // 異なるカテゴリ（新しいキャッシュ）
    newResults.push(
      "🔄 異なるカテゴリ: 新しいページにアクセス中...（新しいキャッシュ）"
    );
    const result3 = await fetchProductData("all");
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

    // 通常のアクセス
    newResults.push("🔄 通常のアクセス: 商品ページにアクセス中...");
    const result1 = await fetchProductData("Electronics");
    newResults.push(result1);

    // キャッシュバスター付きでアクセス（キャッシュを無効化）
    newResults.push(
      "🔄 キャッシュバスター付き: 商品ページにアクセス中...（キャッシュ無効化）"
    );
    const cacheBuster = `buster-${Date.now()}`;
    const response = await fetch(
      `/api/products?category=Electronics&cacheBuster=${cacheBuster}`
    );
    const data = await response.json();
    const endTime = getCurrentTime();
    newResults.push(
      `✅ キャッシュバスター付きで商品データを取得しました (${endTime}) - ${data.data.products.length}件`
    );

    // 再度通常のアクセス
    newResults.push("🔄 再度通常のアクセス: 商品ページにアクセス中...");
    const result3 = await fetchProductData("Electronics");
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
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
          📝 デモの説明
        </h3>
        <p className="text-purple-800 dark:text-purple-200 text-sm">
          Full Route
          Cacheにより、ページ全体がキャッシュされ、同じURLへのアクセスが高速化されます。
          下のボタンをクリックして、ページキャッシュの動作を確認してください。
          開発者ツールのNetworkタブでページの読み込み時間も確認できます。
        </p>
      </div>

      {/* 操作ボタン */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={testBasicFullRouteCache}
          disabled={isLoading}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "実行中..." : "🔄 基本的なFull Route Cacheテスト"}
        </button>

        <button
          onClick={testDifferentCategories}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "実行中..." : "📂 異なるカテゴリでのテスト"}
        </button>

        <button
          onClick={testCacheInvalidation}
          disabled={isLoading}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "実行中..." : "🚫 キャッシュ無効化テスト"}
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
              <li>• キャッシュヒット時はページ読み込み時間が短縮されます</li>
              <li>• 異なるURLでは別のキャッシュが使用されます</li>
              <li>• キャッシュバスターによりキャッシュを無効化できます</li>
              <li>
                •
                開発者ツールのNetworkタブでページの読み込み時間を確認してください
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
          <li>• ページの読み込み時間の違いを観察</li>
          <li>• レスポンスヘッダーのCache-Controlを確認</li>
          <li>• 同じURLでの複数回アクセスでキャッシュの効果を確認</li>
        </ul>
      </div>

      {/* 追加情報 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          ℹ️ Full Route Cacheの特徴
        </h3>
        <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
          <li>• ページ全体のHTMLがキャッシュされる</li>
          <li>• サーバーサイドレンダリングがスキップされる</li>
          <li>• 静的ページや適切に設定された動的ページに適用</li>
          <li>• 段階的再検証でデータの鮮度を保つ</li>
        </ul>
      </div>
    </div>
  );
}
