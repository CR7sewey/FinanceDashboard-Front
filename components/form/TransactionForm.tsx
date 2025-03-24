"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { toast } from "react-toastify";

export default function TransactionForm({ onTransactionAdded }: { onTransactionAdded: () => void }) {
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [category, setCategory] = useState("");
    const { token } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:3000/transactions/create",
                { amount: parseFloat(amount), type, category },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Transação adicionada com sucesso!");

            setAmount("");
            setCategory("");
            onTransactionAdded();
        } catch (error) {
            console.error("Erro ao adicionar transação", error);
            toast.error("Erro ao adicionar transação");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-md">
            <h2 className="text-lg font-bold">Nova Transação</h2>
            <input
                type="number"
                placeholder="Valor"
                className="p-2 border rounded-md"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <select className="p-2 border rounded-md" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
            </select>
            <input
                type="text"
                placeholder="Categoria"
                className="p-2 border rounded-md"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <button
                type="submit"
                className="mt-2 bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white p-2 rounded w-full"
            >
                Adicionar Transação
            </button>
        </form>
    );
}
