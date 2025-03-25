import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  const { account_id } = await req.json();
  console.log("AQUI", account_id);
  try {
    const transactions = await stripe.financialConnections.transactions.list({
      account: account_id,
    });

    return NextResponse.json({ transactions: transactions.data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
