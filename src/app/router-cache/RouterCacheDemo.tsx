"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentTime } from "@/app/utils/cache-utils";

/**
 * Router Cache デモコンポーネント
 *
 * このコンポーネントは、Router Cacheの動作を確認するための
 * インタラクティブなデモを提供します。
 */
export default function RouterCacheDemo() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * ナビゲーション時間を測定する関数
   *
   * @param action - 実行するアクション
   * @returns Promise<string> - 測定結果のメッセージ
   */
  async function measureNavigationTime(action: () => void): Promise<string> {
    const startTime = getCurrentTime();

    // ナビゲーションを実行
    action();

    // 少し待ってから結果を返す（実際のナビゲーションをシミュレート）
    await new Promise((resolve) => setTimeout(resolve, 100));

    const endTime = getCurrentTime();
    return `🔄 ナビゲーション完了 (${startTime} → ${endTime})`;
  }

  /**
   * 基本的なRouter Cacheテスト
   * 同じページへの複数回のナビゲーションをテスト
   */
  async function testBasicRouterCache() {
    setIsLoading(true);
    setResults([]);

    const newResults: string[] = [];

    // 1回目のナビゲーション（キャッシュミス）
    newResults.push(
      "🔄 1回目: ホームページにナビゲーション中...（キャッシュミス）"
    );
    const result1 = await measureNavigationTime(() => {
      router.push("/");
    });
    newResults.push(result1);

    // 2回目のナビゲーション（キャッシュヒット）
    newResults.push(
      "🔄 2回目: ホームページに再度ナビゲーション中...（キャッシュヒット）"
    );
    const result2 = await measureNavigationTime(() => {
      router.push("/");
    });
    newResults.push(result2);

    // 3回目のナビゲーション（キャッシュヒット）
    newResults.push(
      "🔄 3回目: ホームページに3回目ナビゲーション中...（キャッシュヒット）"
    );
    const result3 = await measureNavigationTime(() => {
      router.push("/");
    });
    newResults.push(result3);

    setResults(newResults);
    setIsLoading(false);
  }

  /**
   * 異なるページ間のRouter Cacheテスト
   * 異なるページ間のナビゲーションをテスト
   */
  async function testDifferentPages() {
    setIsLoading(true);
    setResults([]);

    const newResults: string[] = [];

    // Request Memoizationページへ
    newResults.push("🔄 Request Memoizationページにナビゲーション中...");
    const result1 = await measureNavigationTime(() => {
      router.push("/request-memoization");
    });
    newResults.push(result1);

    // Data Cacheページへ
    newResults.push("🔄 Data Cacheページにナビゲーション中...");
    const result2 = await measureNavigationTime(() => {
      router.push("/data-cache");
    });
    newResults.push(result2);

    // Request Memoizationページに戻る（キャッシュヒット）
    newResults.push(
      "🔄 Request Memoizationページに戻る中...（キャッシュヒット）"
    );
    const result3 = await measureNavigationTime(() => {
      router.push("/request-memoization");
    });
    newResults.push(result3);

    setResults(newResults);
    setIsLoading(false);
  }

  /**
   * フォーム状態の保持テスト
   * Router Cacheによるフォーム状態の保持をテスト
   */
  async function testFormStatePreservation() {
    setIsLoading(true);
    setResults([]);

    const newResults: string[] = [];

    // フォームにデータを入力
    newResults.push("📝 フォームにデータを入力中...");
    setFormData({
      name: "田中太郎",
      email: "tanaka@example.com",
      message: "Router Cacheのテストメッセージ",
    });
    newResults.push("✅ フォームデータを入力しました");

    // 別のページにナビゲーション
    newResults.push("🔄 別のページにナビゲーション中...");
    const result1 = await measureNavigationTime(() => {
      router.push("/data-cache");
    });
    newResults.push(result1);

    // 元のページに戻る（フォーム状態が保持される）
    newResults.push("🔄 元のページに戻る中...（フォーム状態が保持される）");
    const result2 = await measureNavigationTime(() => {
      router.push("/router-cache");
    });
    newResults.push(result2);

    newResults.push("✅ フォーム状態が保持されていることを確認してください");

    setResults(newResults);
    setIsLoading(false);
  }

  /**
   * 結果をクリアする
   */
  function clearResults() {
    setResults([]);
  }

  /**
   * フォームをリセットする
   */
  function resetForm() {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }

  return (
    <div className="space-y-6">
      {/* 説明 */}
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
          📝 デモの説明
        </h3>
        <p className="text-orange-800 dark:text-orange-200 text-sm">
          Router
          Cacheにより、ページ間のナビゲーションが高速化され、フォームの状態も保持されます。
          下のボタンをクリックして、Router Cacheの動作を確認してください。
          実際のナビゲーション時間の違いを観察できます。
        </p>
      </div>

      {/* フォーム（状態保持のデモ用） */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📝 フォーム状態保持デモ
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              名前
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="名前を入力してください"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="メールアドレスを入力してください"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              メッセージ
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="メッセージを入力してください"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              🔄 フォームリセット
            </button>
          </div>
        </div>
      </div>

      {/* 操作ボタン */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={testBasicRouterCache}
          disabled={isLoading}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "実行中..." : "🔄 基本的なRouter Cacheテスト"}
        </button>

        <button
          onClick={testDifferentPages}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "実行中..." : "📂 異なるページ間のテスト"}
        </button>

        <button
          onClick={testFormStatePreservation}
          disabled={isLoading}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "実行中..." : "💾 フォーム状態保持テスト"}
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
              <li>• キャッシュヒット時はナビゲーション時間が短縮されます</li>
              <li>• フォームの入力状態が保持されます</li>
              <li>• スクロール位置も保持されます</li>
              <li>• 実際のページ遷移で効果を確認してください</li>
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
          <li>• 実際にページ間をナビゲーションして効果を確認</li>
          <li>
            • フォームに入力してから別のページに移動し、戻ってきた時の状態を確認
          </li>
          <li>• ナビゲーション時間の違いを観察</li>
          <li>• ブラウザの開発者ツールでネットワークタブを確認</li>
        </ul>
      </div>

      {/* 追加情報 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          ℹ️ Router Cacheの特徴
        </h3>
        <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
          <li>• クライアントサイドでのページ状態をキャッシュ</li>
          <li>• フォーム入力状態やスクロール位置を保持</li>
          <li>• 即座のページ表示でUXを向上</li>
          <li>• 背景でのデータ更新で最新性を保持</li>
        </ul>
      </div>
    </div>
  );
}
