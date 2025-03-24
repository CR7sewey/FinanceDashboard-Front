import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export function useAccount() {
  const { token } = useAuthStore();
  const [account, setAccount] = useState<{
    id: string;
    balance: number;
  } | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchAccount = async () => {
      try {
        const res = await axios.get("http://localhost:3000/accounts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.data) {
          // Se não existir conta, cria uma
          console.log("Criando conta..." + token);
          await axios.post(
            "http://localhost:3000/accounts/create",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          fetchAccount(); // Recarrega a conta após criação
        } else {
          setAccount(res.data);
        }
      } catch (error) {
        console.error("Erro ao buscar conta", error);
      }
    };

    fetchAccount();
  }, [token]);

  return account;
}
