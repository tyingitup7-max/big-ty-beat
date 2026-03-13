import { randomUUID } from "crypto";
import { squareClient } from "@/lib/square";

export async function POST(request) {
  try {
    const body = await request.json();
    const { items = [] } = body;

    const lineItems = items.map((item) => ({
      name: `${item.beatTitle} - ${item.licenseName}`,
      quantity: "1",
      basePriceMoney: {
        amount: BigInt(item.price),
        currency: "USD",
      },
      note: item.subtitle || "",
    }));

    const ordersApi = squareClient.ordersApi;

    const result = await ordersApi.createOrder({
      idempotencyKey: randomUUID(),
      order: {
        locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
        lineItems,
      },
    });

    return Response.json({
      ok: true,
      order: result.order,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error?.message || "Order creation failed",
        details: error?.body || null,
      },
      { status: 500 }
    );
  }
}