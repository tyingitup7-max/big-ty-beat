"use client";

import { useEffect, useRef, useState } from "react";

export default function CheckoutPage() {
  const cashAppContainerRef = useRef(null);
  const [status, setStatus] = useState("Idle");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let payments;
    let cashAppPay;

    async function initialize() {
      if (!window.Square) return;

      try {
        payments = window.Square.payments(
          process.env.NEXT_PUBLIC_SQUARE_APP_ID,
          process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
        );

        const paymentRequest = payments.paymentRequest({
          countryCode: "US",
          currencyCode: "USD",
          total: {
            amount: "39.00",
            label: "Total",
          },
        });

        cashAppPay = await payments.cashAppPay(paymentRequest, {
          redirectURL: `${window.location.origin}/checkout`,
          referenceId: `big-ty-beats-${Date.now()}`,
        });

        await cashAppPay.attach("#cash-app-pay");

        cashAppPay.addEventListener("ontokenization", async (event) => {
          const { tokenResult, error } = event.detail;

          if (error) {
            setStatus("Tokenization failed");
            return;
          }

          if (tokenResult.status === "OK") {
            setLoading(true);
            setStatus("Charging payment...");

            const orderRes = await fetch("/api/square-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                items: [
                  {
                    beatTitle: "Broken Crown",
                    subtitle: "Rod Wave Type Beat",
                    licenseName: "MP3 Lease",
                    price: 3900,
                  },
                ],
              }),
            });

            const orderData = await orderRes.json();
            if (!orderData.ok) {
              setLoading(false);
              setStatus("Order creation failed");
              return;
            }

            const payRes = await fetch("/api/square-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                sourceId: tokenResult.token,
                amount: 3900,
                orderId: orderData.order.id,
                note: "BIG TY BEATS order",
              }),
            });

            const payData = await payRes.json();
            setLoading(false);

            if (payData.ok) {
              setStatus("Payment completed");
            } else {
              setStatus("Payment failed");
              console.error(payData);
            }
          }
        });
      } catch (err) {
        console.error(err);
        setStatus("Cash App Pay init failed");
      }
    }

    initialize();
  }, []);

  return (
    <main style={{ padding: 24, color: "white", background: "#070707", minHeight: "100vh" }}>
      <h1>Cash App Checkout</h1>
      <p>Status: {loading ? "Loading..." : status}</p>
      <div id="cash-app-pay" ref={cashAppContainerRef} />
    </main>
  );
}