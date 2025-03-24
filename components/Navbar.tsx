"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      <Link href="/dashboard" className="text-xl font-bold text-blue-500">
        💰 Finanças
      </Link>
      <ThemeToggle />
    </nav>
  );
}
