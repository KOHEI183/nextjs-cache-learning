import { NextResponse } from "next/server";
import { getCurrentTime } from "@/app/utils/cache-utils";

/**
 * サーバー側キャッシュの情報を取得するAPIエンドポイント
 *
 * このエンドポイントは、サーバー側のキャッシュ状態を確認するために使用されます。
 * 実際のアプリケーションでは、より詳細なキャッシュ情報を提供できます。
 *
 * @param request - HTTPリクエスト
 * @returns NextResponse - キャッシュ情報のJSONレスポンス
 */
export async function GET(request: Request) {
  try {
    console.log(
      `[API] キャッシュ情報取得リクエスト - ${new Date().toISOString()}`
    );

    // 現在のキャッシュ情報を収集
    const cacheInfo = {
      timestamp: getCurrentTime(),
      serverTime: new Date().toISOString(),
      cacheStatus: {
        dataCache: {
          enabled: true,
          location: ".next/cache",
          type: "ファイルシステム",
          description: "fetch()の結果をキャッシュ",
        },
        routerCache: {
          enabled: true,
          location: "メモリ (in-memory)",
          type: "メモリベース",
          description: "ページ遷移のキャッシュ",
        },
        fullRouteCache: {
          enabled: true,
          location: ".next/server/app/full-route-cache",
          type: "ファイルシステム",
          description: "完全なルートのキャッシュ",
        },
        requestMemoization: {
          enabled: true,
          location: "メモリ (in-memory)",
          type: "メモリベース",
          description: "関数呼び出しのキャッシュ",
        },
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || "development",
        nextVersion: process.env.npm_package_version || "unknown",
        platform: process.platform,
        memoryUsage: process.memoryUsage(),
        uptime: process.uptime(),
      },
      cacheDirectories: {
        dataCache: ".next/cache",
        serverDataCache: ".next/server/app/data-cache",
        routerCache: ".next/server/app/router-cache",
        fullRouteCache: ".next/server/app/full-route-cache",
        requestMemoization: ".next/server/app/request-memoization",
      },
      debugInfo: {
        message: "サーバー側キャッシュの情報を取得しました",
        note: "この情報は開発環境でのデバッグ用です。本番環境では詳細な情報は提供されません。",
      },
    };

    // レスポンスヘッダーを設定
    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Cache-Info": "server-side-cache-debug",
      "X-Response-Time": getCurrentTime(),
    };

    // レスポンスを返す
    return NextResponse.json(cacheInfo, { headers });
  } catch (error) {
    console.error("[API] キャッシュ情報取得エラー:", error);

    return NextResponse.json(
      {
        error: "キャッシュ情報の取得に失敗しました",
        timestamp: getCurrentTime(),
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
