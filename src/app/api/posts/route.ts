import { NextResponse } from "next/server";
import { simulateApiCall } from "@/app/utils/cache-utils";

/**
 * 投稿データを取得するAPIエンドポイント
 *
 * このエンドポイントは、Request Memoizationの動作を確認するために使用されます。
 * 同じリクエストが複数回実行された場合の動作を確認できます。
 *
 * @param request - HTTPリクエスト
 * @returns NextResponse - 投稿データのJSONレスポンス
 */
export async function GET(request: Request) {
  try {
    // リクエストの詳細情報を取得
    const url = new URL(request.url);
    const author = url.searchParams.get("author") || "all";

    console.log(`[API] 投稿データ取得リクエスト - ${new Date().toISOString()}`);
    console.log(`[API] Author: ${author}`);

    // 模擬的なAPI呼び出しを実行
    const response = await simulateApiCall("posts", 800);

    // 著者でフィルタリング（Request Memoizationの動作確認用）
    if (author !== "all") {
      response.data.posts = response.data.posts.filter(
        (post: any) => post.author === author
      );
    }

    // レスポンスヘッダーを設定
    const headers = {
      "Content-Type": "application/json",
      // キャッシュ制御ヘッダー
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
    };

    // レスポンスを返す
    return NextResponse.json(response, { headers });
  } catch (error) {
    console.error("[API] 投稿データ取得エラー:", error);

    return NextResponse.json(
      { error: "投稿データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
