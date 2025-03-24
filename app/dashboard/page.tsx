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


export default function Dashboard() {
    const { logout } = useAuthStore();
    const router = useRouter();
    const account = useAccount();

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