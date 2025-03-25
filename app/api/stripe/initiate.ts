import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-03-14",
});

export async function POST() {
  try {
    const session = await stripe.financialConnections.sessions.create({
      account_holder: { type: "individual" },
      permissions: ["payment_method", "balances", "transactions"],
    });

    return NextResponse.json({ client_secret: session.client_secret });
  } catch (error) {
    return NextResponse.json(
      { error: "Stripe connection failed" },
      { status: 500 }
    );
  }
}
