import { randomUUID } from "crypto";
import { squareClient } from "@/lib/square";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      sourceId,
      amount,
      currency = "USD",
      orderId,
      note,
      buyerEmailAddress,
    } = body;

    if (!sourceId) {
      return Response.json(
        { ok: false, error: "Missing sourceId" },
        { status: 400 }
      );
    }

    if (!amount || Number(amount) <= 0) {
      return Response.json(
        { ok: false, error: "Missing or invalid amount" },
        { status: 400 }
      );
    }

    const result = await squareClient.payments.create({
      sourceId,
      idempotencyKey: randomUUID(),
      orderId,
      note,
      buyerEmailAddress,
      autocomplete: true,
      amountMoney: {
        amount: BigInt(amount), // cents
        currency,
      },
    });

    return Response.json({
      ok: true,
      payment: result.payment,
    });
  } catch (error) {
    console.error("Square payment error:", error);

    return Response.json(
      {
        ok: false,
        error: error?.message || "Square payment failed",
        details: error?.body || null,
      },
      { status: 500 }
    );
  }
}