"use client";

import LoginForm from "@/components/form/LoginForms";
import Dashboard from "./dashboard/page";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";
function Home() {
  const { token } = useAuthStore();

  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <LoginForm />
    </main>
  );
}

export default Home;