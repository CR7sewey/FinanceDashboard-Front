"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useTransactions } from "../../hook/useTransactions";
import { Transaction } from "@/app/dashboard/page";

const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFC733", "#33FFF5"];

export default function CategoryChart() {
    const transactions = useTransactions();

    if (!transactions.length) return <p className="text-center">Nenhuma transação ainda.</p>;

    // Agrupa despesas por categoria
    const expenses = transactions.filter((t: Transaction) => t.type === "expense");
    const categories = expenses.reduce((acc: Record<string, number>, t: Transaction) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {});

    const data = Object.keys(categories).map((key, index) => ({
        name: key,
        value: categories[key],
        color: COLORS[index % COLORS.length],
    }));

    return (
        <div className="p-4 border rounded mt-4">
            <h2 className="text-lg font-semibold">Gastos por Categoria</h2>
            <ResponsiveContainer width="100%" height={300} className="shadow-md rounded-lg p-4 bg-white dark:bg-gray-800">
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" fill="#8884d8">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
