"use client";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useAccount } from "@/hook/useAccount";
import TransactionForm from "@/components/form/TransactionForm";
import TransactionsChart from "@/components/charts/TransactionCharts";
import CategoryChart from "@/components/charts/CategoryChart";
import Loader from "@/components/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactions } from "@/hook/useTransactions";
import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";
import { useCallback, useEffect } from "react";
import { useState } from "react";


export default function Dashboard() {
    const { token, logout } = useAuthStore();
    const router = useRouter();
    const account = useAccount();



    useEffect(() => {
        const fetchTransactions = async () => {
            const res = await fetch("/api/stripe/transactions", { method: "POST" });
            const data = await res.json();
            return data;
        };

        fetchTransactions();
    }, [token]);

    /*const fetchClientSecret = useCallback(async () => {
        // Create a Checkout Session
        const res = await fetch("/api/stripe/transactions", { method: "POST" });
        const data = await res.json();
        console.log("AQUI", data);
        return data.transactions;
    }, []);*/
    //const options = transactions;

    //const transactions = useTransactions(fetchClientSecret());
    const transactions = useTransactions();
    const income = transactions.filter((t: Transaction) => t.type === "income").reduce((acc: number, t: Transaction) => acc + t.amount, 0);
    const expense = transactions.filter((t: Transaction) => t.type === "expense").reduce((acc: number, t: Transaction) => acc + t.amount, 0);


    if (!account) return <Loader />;

    return (
        <>
            <Navbar />
            <main className="p-6 max-w-5xl mx-auto space-y-6">

                <div className="text-center items-center">
                    <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white">💰 Dashboard Financeiro</h1>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-white dark:bg-gray-800 shadow-lg p-4">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-600 dark:text-gray-300">Saldo Atual</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className={`text-3xl font-bold ${account.balance >= 0 ? "text-green-500" : "text-red-500"}`}>
                                R$ {account.balance.toFixed(2)}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-800 shadow-lg p-4">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-600 dark:text-gray-300">Total Receitas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-green-500">
                                R$ {income.toFixed(2)}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-800 shadow-lg p-4">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-600 dark:text-gray-300">Total Despesas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-red-500">
                                R$ {expense.toFixed(2)}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <TransactionForm onTransactionAdded={() => window.location.reload()} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <TransactionsChart />
                    <CategoryChart />
                </div>
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Últimas Transações</h1>
                    <ul className="mt-4">
                        {transactions.map((t: Transaction) => (
                            <li key={t.id} className="border-b py-2">
                                <div className="flex justify-between">
                                    <span className="font-semibold" >{t.id}</span>
                                    <span className="text-gray-500" style={{ color: t.type === "income" ? "green" : "red" }}>R$ {t.amount}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    onClick={logout}
                    className="mt-6 bg-red-500 hover:bg-red-600 active:scale-95 transition-all text-white px-4 py-2 rounded-lg w-full shadow-lg"
                >
                    Sair
                </button>
            </main>
        </>
    );
}


export type Transaction = {
    id: string;
    category: string;
    type: string;
    amount: number;
}