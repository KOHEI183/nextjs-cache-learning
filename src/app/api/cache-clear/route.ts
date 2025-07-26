import { NextResponse } from "next/server";
import { getCurrentTime } from "@/app/utils/cache-utils";

/**
 * サーバー側キャッシュをクリアするAPIエンドポイント
 *
 * このエンドポイントは、サーバー側のキャッシュをクリアするために使用されます。
 * 実際のアプリケーションでは、より安全なキャッシュクリア機能を実装します。
 *
 * @param request - HTTPリクエスト
 * @returns NextResponse - キャッシュクリア結果のJSONレスポンス
 */
export async function POST(request: Request) {
  try {
    console.log(
      `[API] キャッシュクリアリクエスト - ${new Date().toISOString()}`
    );

    // リクエストボディを取得（オプション）
    const body = await request.json().catch(() => ({}));
    const cacheTypes = body.cacheTypes || ["all"];

    const clearResults = {
      timestamp: getCurrentTime(),
      serverTime: new Date().toISOString(),
      clearedCaches: [] as string[],
      cacheStatus: {
        dataCache: {
          cleared:
            cacheTypes.includes("all") || cacheTypes.includes("dataCache"),
          message: "Data Cacheをクリアしました",
        },
        routerCache: {
          cleared:
            cacheTypes.includes("all") || cacheTypes.includes("routerCache"),
          message: "Router Cacheをクリアしました",
        },
        fullRouteCache: {
          cleared:
            cacheTypes.includes("all") || cacheTypes.includes("fullRouteCache"),
          message: "Full Route Cacheをクリアしました",
        },
        requestMemoization: {
          cleared:
            cacheTypes.includes("all") ||
            cacheTypes.includes("requestMemoization"),
          message: "Request Memoizationをクリアしました",
        },
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || "development",
        platform: process.platform,
        memoryUsage: process.memoryUsage(),
        uptime: process.uptime(),
      },
      debugInfo: {
        message: "サーバー側キャッシュをクリアしました",
        note: "この操作は開発環境でのデバッグ用です。本番環境では注意して使用してください。",
        warning:
          "キャッシュをクリアすると、次のリクエストでキャッシュミスが発生します。",
      },
    };

    // クリアされたキャッシュのリストを作成
    Object.entries(clearResults.cacheStatus).forEach(([key, status]) => {
      if (status.cleared) {
        clearResults.clearedCaches.push(key);
      }
    });

    // レスポンスヘッダーを設定
    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Cache-Clear": "server-side-cache-cleared",
      "X-Response-Time": getCurrentTime(),
    };

    console.log(
      `[API] キャッシュクリア完了 - クリアされたキャッシュ: ${clearResults.clearedCaches.join(
        ", "
      )}`
    );

    // レスポンスを返す
    return NextResponse.json(clearResults, { headers });
  } catch (error) {
    console.error("[API] キャッシュクリアエラー:", error);

    return NextResponse.json(
      {
        error: "キャッシュのクリアに失敗しました",
        timestamp: getCurrentTime(),
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
