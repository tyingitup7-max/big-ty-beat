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

    if (!sourceId || !amount) {
      return Response.json(
        { ok: false, error: "Missing sourceId or amount" },
        { status: 400 }
      );
    }

    const paymentsApi = squareClient.paymentsApi;

    const result = await paymentsApi.createPayment({
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(amount), // amount in cents
        currency,
      },
      orderId,
      note,
      buyerEmailAddress,
      autocomplete: true,
    });

    return Response.json({
      ok: true,
      payment: result.payment,
    });
  } catch (error) {
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