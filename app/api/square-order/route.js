import { randomUUID } from "crypto";
import { squareClient } from "@/lib/square";

export async function POST(request) {
  try {
    const body = await request.json();
    const { items = [] } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return Response.json(
        { ok: false, error: "No order items provided" },
        { status: 400 }
      );
    }

    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

    if (!locationId) {
      return Response.json(
        { ok: false, error: "Missing NEXT_PUBLIC_SQUARE_LOCATION_ID" },
        { status: 500 }
      );
    }

    const lineItems = items.map((item) => ({
      name: `${item.beatTitle} - ${item.licenseName}`,
      quantity: "1",
      note: item.subtitle || "",
      basePriceMoney: {
        amount: BigInt(item.price), // cents
        currency: "USD",
      },
    }));

    const result = await squareClient.orders.create({
      idempotencyKey: randomUUID(),
      order: {
        locationId,
        lineItems,
      },
    });

    return Response.json({
      ok: true,
      order: result.order,
    });
  } catch (error) {
    console.error("Square order error:", error);

    return Response.json(
      {
        ok: false,
        error: error?.message || "Square order creation failed",
        details: error?.body || null,
      },
      { status: 500 }
    );
  }
}