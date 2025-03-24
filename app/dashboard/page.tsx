"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { token, logout } = useAuthStore();
    const [balance, setBalance] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push("/");
            return;
        }

        const fetchBalance = async () => {
            try {
                const res = await axios.get("http://localhost:3000/accounts", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBalance(res.data.balance);
            } catch (error) {
                console.error("Erro ao buscar saldo", error);
            }
        };

        fetchBalance();
    }, [token, router]);

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Dashboard Financeiro</h1>
            <p className="text-xl mt-4">Saldo: R$ {balance}</p>
            <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                Sair
            </button>
        </main>
    );
}
