/**
 * キャッシュ機能のデモ用ユーティリティ関数
 *
 * このファイルには、各キャッシュ機能の動作を確認するための
 * 模擬的なデータフェッチ関数が含まれています。
 */

// 模擬的なAPIレスポンスの型定義
export interface ApiResponse {
  id: string;
  message: string;
  timestamp: string;
  data: any;
}

// 模擬的なユーザーデータの型定義
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

// 模擬的な投稿データの型定義
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

/**
 * 模擬的なAPI呼び出しを実行する関数
 * 実際のAPI呼び出しをシミュレートし、ランダムな遅延を追加
 *
 * @param endpoint - APIエンドポイント名
 * @param delay - 遅延時間（ミリ秒）
 * @returns Promise<ApiResponse>
 */
export async function simulateApiCall(
  endpoint: string,
  delay: number = 1000
): Promise<ApiResponse> {
  // ランダムな遅延を追加（実際のAPI呼び出しをシミュレート）
  await new Promise((resolve) => setTimeout(resolve, delay));

  // 現在のタイムスタンプを取得
  const timestamp = new Date().toISOString();

  // エンドポイントに応じて異なるレスポンスを返す
  const responses: Record<string, ApiResponse> = {
    users: {
      id: `user-${Date.now()}`,
      message: "ユーザーデータを取得しました",
      timestamp,
      data: {
        users: [
          {
            id: 1,
            name: "田中太郎",
            email: "tanaka@example.com",
            avatar: "https://via.placeholder.com/40",
          },
          {
            id: 2,
            name: "佐藤花子",
            email: "sato@example.com",
            avatar: "https://via.placeholder.com/40",
          },
          {
            id: 3,
            name: "鈴木一郎",
            email: "suzuki@example.com",
            avatar: "https://via.placeholder.com/40",
          },
        ],
      },
    },
    posts: {
      id: `post-${Date.now()}`,
      message: "投稿データを取得しました",
      timestamp,
      data: {
        posts: [
          {
            id: 1,
            title: "Next.js 15の新機能",
            content: "Next.js 15では多くの新機能が追加されました...",
            author: "田中太郎",
            createdAt: timestamp,
          },
          {
            id: 2,
            title: "キャッシュ機能の活用",
            content: "キャッシュ機能を適切に活用することで...",
            author: "佐藤花子",
            createdAt: timestamp,
          },
          {
            id: 3,
            title: "パフォーマンス最適化",
            content: "パフォーマンスを最適化するためのベストプラクティス...",
            author: "鈴木一郎",
            createdAt: timestamp,
          },
        ],
      },
    },
    products: {
      id: `product-${Date.now()}`,
      message: "商品データを取得しました",
      timestamp,
      data: {
        products: [
          { id: 1, name: "ノートPC", price: 150000, category: "Electronics" },
          {
            id: 2,
            name: "スマートフォン",
            price: 80000,
            category: "Electronics",
          },
          {
            id: 3,
            name: "ヘッドフォン",
            price: 25000,
            category: "Electronics",
          },
        ],
      },
    },
  };

  // デフォルトレスポンス
  const defaultResponse: ApiResponse = {
    id: `default-${Date.now()}`,
    message: `${endpoint}のデータを取得しました`,
    timestamp,
    data: { message: "デフォルトデータ" },
  };

  return responses[endpoint] || defaultResponse;
}

/**
 * 現在時刻を取得する関数
 * キャッシュの動作を確認するために使用
 *
 * @returns string - 現在時刻の文字列
 */
export function getCurrentTime(): string {
  return new Date().toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  });
}

/**
 * ランダムなIDを生成する関数
 *
 * @returns string - ランダムなID
 */
export function generateRandomId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

/**
 * キャッシュの状態を表示するための情報を生成
 *
 * @param cacheType - キャッシュの種類
 * @param isCached - キャッシュされているかどうか
 * @returns object - キャッシュ情報
 */
export function getCacheInfo(cacheType: string, isCached: boolean) {
  return {
    type: cacheType,
    isCached,
    timestamp: getCurrentTime(),
    status: isCached ? "キャッシュヒット" : "キャッシュミス",
  };
}

/**
 * Next.jsのキャッシュディレクトリ情報を取得する関数
 *
 * @returns object - キャッシュディレクトリの情報
 */
export function getCacheDirectoryInfo() {
  const cachePaths = {
    dataCache: ".next/cache",
    serverDataCache: ".next/server/app/data-cache",
    routerCache: ".next/server/app/router-cache",
    fullRouteCache: ".next/server/app/full-route-cache",
    requestMemoization: ".next/server/app/request-memoization",
  };

  return {
    paths: cachePaths,
    description: {
      dataCache: "Data Cache - fetch()の結果をキャッシュ（ファイルシステム）",
      serverDataCache: "サーバーサイドのData Cache",
      routerCache: "Router Cache - ページ遷移のキャッシュ（メモリ）",
      fullRouteCache:
        "Full Route Cache - 完全なルートのキャッシュ（ファイルシステム）",
      requestMemoization:
        "Request Memoization - 関数呼び出しのキャッシュ（メモリ）",
    },
  };
}

/**
 * キャッシュの種類と保存場所の説明
 */
export const CACHE_LOCATIONS = {
  DATA_CACHE: {
    name: "Data Cache",
    location: "ファイルシステム (.next/cache/)",
    type: "ファイルベース",
    persistence: "永続的（サーバー再起動後も保持）",
    scope: "サーバーサイド",
    description:
      "fetch()の結果をキャッシュ。ファイルシステムに保存されるため永続的。",
  },
  ROUTER_CACHE: {
    name: "Router Cache",
    location: "メモリ (in-memory)",
    type: "メモリベース",
    persistence: "一時的（サーバー再起動でクリア）",
    scope: "サーバーサイド",
    description:
      "ページ遷移のキャッシュ。メモリに保存されるため高速だが一時的。",
  },
  FULL_ROUTE_CACHE: {
    name: "Full Route Cache",
    location: "ファイルシステム (.next/server/app/full-route-cache/)",
    type: "ファイルベース",
    persistence: "永続的（サーバー再起動後も保持）",
    scope: "サーバーサイド",
    description: "完全なルートのキャッシュ。静的生成されたページをキャッシュ。",
  },
  REQUEST_MEMOIZATION: {
    name: "Request Memoization",
    location: "メモリ (in-memory)",
    type: "メモリベース",
    persistence: "一時的（リクエスト間で保持）",
    scope: "サーバーサイド",
    description: "同じ引数での関数呼び出しをキャッシュ。メモリに保存される。",
  },
};
