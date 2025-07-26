import { NextResponse } from "next/server";
import { simulateApiCall, getCurrentTime } from "@/app/utils/cache-utils";

/**
 * ユーザーデータを取得するAPIエンドポイント
 *
 * このエンドポイントは、Data Cacheの動作を確認するために使用されます。
 * 実際のアプリケーションでは、データベースからユーザーデータを取得します。
 *
 * @param request - HTTPリクエスト
 * @returns NextResponse - ユーザーデータのJSONレスポンス
 */
export async function GET(request: Request) {
  try {
    // リクエストの詳細情報を取得（キャッシュの動作確認用）
    const url = new URL(request.url);
    const cacheBuster = url.searchParams.get("cacheBuster");

    console.log(
      `[API] ユーザーデータ取得リクエスト - ${new Date().toISOString()}`
    );
    console.log(`[API] Cache Buster: ${cacheBuster || "なし"}`);

    // 模擬的なAPI呼び出しを実行
    const response = await simulateApiCall("users", 500);

    // レスポンスヘッダーを設定
    const headers = {
      "Content-Type": "application/json",
      // キャッシュ制御ヘッダー（Data Cacheの動作確認用）
      "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
      // レスポンス時間のヘッダー（デバッグ用）
      "X-Response-Time": getCurrentTime(),
    };

    // レスポンスを返す
    return NextResponse.json(response, { headers });
  } catch (error) {
    console.error("[API] ユーザーデータ取得エラー:", error);

    return NextResponse.json(
      { error: "ユーザーデータの取得に失敗しました" },
      { status: 500 }
    );
  }
}
