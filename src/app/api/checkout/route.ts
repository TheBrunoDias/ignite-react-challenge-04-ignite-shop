import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { line_items } = await request.json();

  if (!line_items?.length) {
    throw new Error("line_items não informado");
  }

  const SUCCESS_URL = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const CANCEL_URL = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: SUCCESS_URL,
    cancel_url: CANCEL_URL,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
