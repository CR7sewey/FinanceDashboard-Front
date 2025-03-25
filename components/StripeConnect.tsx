"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export default function StripeConnect() {
    const [loading, setLoading] = useState(false);
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

    const handleConnect = async () => {
        setLoading(true);
        const response = await fetch("/api/stripe/initiate", { method: "POST" });
        const { client_secret } = await response.json();

        const stripe = await stripePromise;
        if (stripe) {
            const { error } = await stripe.collectFinancialConnectionsAccounts({ clientSecret: client_secret });
            if (error) console.error(error);
        }

        setLoading(false);
    };

    return (
        <button
            onClick={handleConnect}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
            disabled={loading}
        >
            {loading ? "Connecting..." : "Connect Bank Account"}
        </button>
    );
}
