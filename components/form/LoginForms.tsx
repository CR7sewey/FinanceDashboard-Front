"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setToken } = useAuthStore();
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3000/auth/login", { email, password });
            setToken(res.data.token);
            router.push("/dashboard");
        } catch (error) {
            console.error("Erro ao logar", error);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-xl w-96">
            <h2 className="text-xl font-bold">Login</h2>
            <input
                type="email"
                placeholder="Email"
                className="p-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                className="p-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded-md">
                Entrar
            </button>
        </div>
    );
}
