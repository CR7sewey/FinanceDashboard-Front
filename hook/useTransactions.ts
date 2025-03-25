import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { Transaction } from "@/app/dashboard/page";

export function useTransactions(stripe?: any) {
  const { token } = useAuthStore();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:3000/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        /* setTransactions(res.data);
        stripe.transactions([
          ...transactions,
          ...(await stripe.transactions.list()),
        ]);*/
        setTransactions(res.data);
        return res.data;
      } catch (error) {
        console.error("Erro ao buscar transações", error);
      }
    };

    fetchTransactions();
  }, [token]);

  return transactions;
}
