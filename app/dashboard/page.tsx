"use client";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useAccount } from "@/hook/useAccount";
import { useTransactions } from "@/hook/useTransactions";
import TransactionForm from "@/components/form/TransactionForm";

type Transaction = {
    id: string;
    category: string;
    type: string;
    amount: number;
}

export default function Dashboard() {
    const { logout } = useAuthStore();
    const router = useRouter();
    const account = useAccount();
    const transactions = useTransactions();

    if (!account) return <p>Carregando...</p>;

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Dashboard Financeiro</h1>
            <p className="text-xl mt-4">Saldo: R$ {account.balance.toFixed(2)}</p>

            <TransactionForm onTransactionAdded={() => window.location.reload()} />

            <h2 className="text-lg font-semibold mt-6">Histórico de Transações</h2>
            <ul className="mt-2">
                {transactions.map((tx: Transaction) => (
                    <li key={tx.id} className="border p-2 rounded mt-1">
                        {tx.category}: {tx.type === "income" ? "+" : "-"} R$ {tx.amount.toFixed(2)}
                    </li>
                ))}
            </ul>

            <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                Sair
            </button>
        </main>
    );
}
