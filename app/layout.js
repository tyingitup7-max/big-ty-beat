export const metadata = {
  title: "BIG TY BEATS",
  description: "Underground cinematic production for artists building legacy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="text/javascript"
          src="https://sandbox.web.squarecdn.com/v1/square.js"
        ></script>
      </head>
      <body style={{ margin: 0, background: "#070707" }}>{children}</body>
    </html>
  );
}
