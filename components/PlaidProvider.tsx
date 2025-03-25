"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { usePlaidLink } from "react-plaid-link";

export default function PlaidConnect() {
    const [linkToken, setLinkToken] = useState(null);
    const router = useRouter();

    const fetchLinkToken = async () => {
        const response = await fetch("/api/plaid/initiate", { method: "POST" });
        const data = await response.json();
        setLinkToken(data.link_token);
    };

    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: async (public_token) => {
            await fetch("/api/plaid/exchange", {
                method: "POST",
                body: JSON.stringify({ public_token }),
            });

            toast.success("Banco conectado com sucesso!");
            router.refresh();
        },
    });

    return (
        <button
            onClick={fetchLinkToken}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg"
            disabled={!ready}
        >
            Conectar Conta Bancária
        </button>
    );
}
