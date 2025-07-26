import { NextResponse } from "next/server";
import { simulateApiCall } from "@/app/utils/cache-utils";

/**
 * 商品データを取得するAPIエンドポイント
 *
 * このエンドポイントは、Full Route Cacheの動作を確認するために使用されます。
 * 静的ページのキャッシュ動作を確認できます。
 *
 * @param request - HTTPリクエスト
 * @returns NextResponse - 商品データのJSONレスポンス
 */
export async function GET(request: Request) {
  try {
    // リクエストの詳細情報を取得
    const url = new URL(request.url);
    const category = url.searchParams.get("category") || "all";

    console.log(`[API] 商品データ取得リクエスト - ${new Date().toISOString()}`);
    console.log(`[API] Category: ${category}`);

    // 模擬的なAPI呼び出しを実行
    const response = await simulateApiCall("products", 600);

    // カテゴリでフィルタリング
    if (category !== "all") {
      response.data.products = response.data.products.filter(
        (product: any) => product.category === category
      );
    }

    // レスポンスヘッダーを設定
    const headers = {
      "Content-Type": "application/json",
      // 長期間のキャッシュ（Full Route Cacheの動作確認用）
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    };

    // レスポンスを返す
    return NextResponse.json(response, { headers });
  } catch (error) {
    console.error("[API] 商品データ取得エラー:", error);

    return NextResponse.json(
      { error: "商品データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
