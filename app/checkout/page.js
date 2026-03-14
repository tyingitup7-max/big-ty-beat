"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [status, setStatus] = useState("Idle");
  const [loading, setLoading] = useState(false);
  const [squareReady, setSquareReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedCart = localStorage.getItem("bigTyCart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      } catch (error) {
        console.error("Failed to parse cart:", error);
      }
    }
  }, []);

  useEffect(() => {
    let interval;

    function checkSquare() {
      if (typeof window !== "undefined" && window.Square) {
        setSquareReady(true);
        clearInterval(interval);
      }
    }

    checkSquare();
    interval = setInterval(checkSquare, 500);

    return () => clearInterval(interval);
  }, []);

  const totalCents = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return sum + item.license.price * 100;
    }, 0);
  }, [cartItems]);

  const totalDisplay = useMemo(() => {
    return (totalCents / 100).toFixed(2);
  }, [totalCents]);

  async function handleCashAppCheckout() {
    if (!window.Square) {
      setStatus("Square SDK not loaded yet");
      return;
    }

    if (!cartItems.length) {
      setStatus("Your cart is empty");
      return;
    }

    try {
      setLoading(true);
      setStatus("Initializing Cash App Pay...");

      const payments = window.Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APP_ID,
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
      );

      const paymentRequest = payments.paymentRequest({
        countryCode: "US",
        currencyCode: "USD",
        total: {
          amount: totalDisplay,
          label: "BIG TY BEATS Order",
        },
      });

      const cashAppPay = await payments.cashAppPay(paymentRequest, {
        redirectURL: `${window.location.origin}/checkout`,
        referenceId: `big-ty-beats-${Date.now()}`,
      });

      const tokenResult = await cashAppPay.tokenize();

      if (tokenResult.status !== "OK") {
        setLoading(false);
        setStatus("Cash App tokenization failed");
        console.error("Tokenization result:", tokenResult);
        return;
      }

      setStatus("Creating Square order...");

      const orderRes = await fetch("/api/square-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            beatTitle: item.beat.title,
            subtitle: item.beat.subtitle,
            licenseName: item.license.name,
            price: item.license.price * 100,
          })),
        }),
      });

      const orderData = await orderRes.json();

      if (!orderData.ok) {
        setLoading(false);
        setStatus("Order creation failed");
        console.error("Order error:", orderData);
        return;
      }

      setStatus("Charging payment...");

      const paymentRes = await fetch("/api/square-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceId: tokenResult.token,
          amount: totalCents,
          currency: "USD",
          orderId: orderData.order.id,
          note: "BIG TY BEATS Cash App Pay order",
        }),
      });

      const paymentData = await paymentRes.json();

      setLoading(false);

      if (paymentData.ok) {
        setStatus("Payment completed");

        if (typeof window !== "undefined") {
          localStorage.removeItem("bigTyCart");
        }

        setCartItems([]);

        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setStatus("Payment failed");
        console.error("Payment error:", paymentData);
      }
    } catch (error) {
      setLoading(false);
      setStatus("Cash App checkout failed");
      console.error("Checkout error:", error);
    }
  }

  function handleBackToStore() {
    router.push("/");
  }

  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.left}>
          <div style={styles.eyebrow}>CHECKOUT</div>
          <h1 style={styles.title}>Cash App Pay</h1>
          <p style={styles.text}>
            This page is wired to your Square order and payment routes. When your
            Square sandbox or production credentials are added, this page can run
            the real Cash App payment flow.
          </p>

          <div style={styles.statusBox}>
            <div style={styles.statusLabel}>Status</div>
            <div style={styles.statusValue}>
              {loading ? "Loading..." : status}
            </div>
            <div style={styles.statusMeta}>
              Square SDK: {squareReady ? "Loaded" : "Waiting"}
            </div>
          </div>

          <button
            style={{
              ...styles.cashAppButton,
              opacity: !cartItems.length || loading || !squareReady ? 0.6 : 1,
              cursor:
                !cartItems.length || loading || !squareReady
                  ? "not-allowed"
                  : "pointer",
            }}
            onClick={handleCashAppCheckout}
            disabled={!cartItems.length || loading || !squareReady}
          >
            Pay with Cash App
          </button>

          <button style={styles.backButton} onClick={handleBackToStore}>
            Back To Store
          </button>

          <div style={styles.note}>
            Make sure your <code>.env.local</code> has your Square App ID,
            Location ID, Access Token, and environment.
          </div>
        </div>

        <div style={styles.right}>
          <div style={styles.summaryCard}>
            <div style={styles.summaryTitle}>Order Summary</div>

            {cartItems.length === 0 ? (
              <div style={styles.empty}>No items in cart</div>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={`${item.beat.id}-${item.license.id}-${index}`}
                  style={styles.item}
                >
                  <div>
                    <div style={styles.itemTitle}>{item.beat.title}</div>
                    <div style={styles.itemSub}>{item.beat.subtitle}</div>
                    <div style={styles.itemLicense}>{item.license.name}</div>
                  </div>
                  <div style={styles.itemPrice}>${item.license.price}</div>
                </div>
              ))
            )}

            <div style={styles.totalRow}>
              <span>Total</span>
              <strong>${totalDisplay}</strong>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#070707",
    color: "#e4e4e7",
    fontFamily: "Arial, Helvetica, sans-serif",
    padding: 24,
  },
  wrap: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 24,
  },
  left: {
    border: "1px solid rgba(255,255,255,0.08)",
    background: "#0b0b0d",
    borderRadius: 28,
    padding: 28,
  },
  right: {
    border: "1px solid rgba(255,255,255,0.08)",
    background: "#0b0b0d",
    borderRadius: 28,
    padding: 28,
  },
  eyebrow: {
    fontSize: 12,
    color: "#f87171",
    letterSpacing: "0.35em",
    marginBottom: 12,
  },
  title: {
    margin: 0,
    color: "#fff",
    fontSize: 48,
    fontWeight: 900,
  },
  text: {
    color: "#a1a1aa",
    fontSize: 17,
    lineHeight: 1.7,
    marginTop: 16,
    marginBottom: 20,
  },
  statusBox: {
    border: "1px solid rgba(255,255,255,0.08)",
    background: "#111113",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },
  statusLabel: {
    color: "#71717a",
    fontSize: 11,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  statusValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 800,
  },
  statusMeta: {
    color: "#a1a1aa",
    fontSize: 13,
    marginTop: 8,
  },
  cashAppButton: {
    width: "100%",
    background: "#00d632",
    color: "#001b06",
    border: "none",
    borderRadius: 16,
    padding: "16px 20px",
    fontWeight: 900,
    fontSize: 16,
    marginBottom: 12,
  },
  backButton: {
    width: "100%",
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 16,
    padding: "16px 20px",
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
  },
  note: {
    color: "#a1a1aa",
    fontSize: 13,
    marginTop: 14,
    lineHeight: 1.6,
  },
  summaryCard: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  summaryTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: 900,
    marginBottom: 6,
  },
  empty: {
    color: "#a1a1aa",
    marginTop: 12,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    background: "#111113",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  itemTitle: {
    color: "#fff",
    fontWeight: 800,
    fontSize: 16,
  },
  itemSub: {
    color: "#a1a1aa",
    fontSize: 13,
    marginTop: 4,
  },
  itemLicense: {
    color: "#f97316",
    fontSize: 13,
    fontWeight: 700,
    marginTop: 6,
  },
  itemPrice: {
    color: "#fff",
    fontWeight: 900,
    fontSize: 18,
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
    fontSize: 20,
    marginTop: 8,
    paddingTop: 14,
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
};