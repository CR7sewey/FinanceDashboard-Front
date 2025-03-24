"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTransactions } from "../../hook/useTransactions";
import { Transaction } from "@/app/dashboard/page";

export default function TransactionsChart() {
    const transactions = useTransactions();

    if (!transactions.length) return <p className="text-center">Nenhuma transação ainda.</p>;

    // Agrupa valores de receita e despesa
    const income = transactions.filter((t: Transaction) => t.type === "income").reduce((acc: number, t: Transaction) => acc + t.amount, 0);
    const expense = transactions.filter((t: Transaction) => t.type === "expense").reduce((acc: number, t: Transaction) => acc + t.amount, 0);

    const data = [
        { name: "Receitas", value: income },
        { name: "Despesas", value: expense },
    ];

    return (
        <div className="p-4 border rounded mt-4">
            <h2 className="text-lg font-semibold">Receitas vs. Despesas</h2>
            <ResponsiveContainer width="100%" height={300} className="shadow-md rounded-lg p-4 bg-white dark:bg-gray-800">
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={income >= expense ? "#4CAF50" : "#F44336"} name="Valor" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
