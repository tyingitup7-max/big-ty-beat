export async function POST(request) {
  const payload = await request.text();

  // Later:
  // 1. verify Square webhook signature
  // 2. detect payment.updated / payment.created events
  // 3. trigger email + file delivery

  return new Response("ok", { status: 200 });
}