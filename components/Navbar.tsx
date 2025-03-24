"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-card animate-fade-in">
      <Link
        href="/dashboard"
        className="text-xl font-bold text-primary-500 hover:text-primary-600 transition-colors duration-200 flex items-center gap-2"
      >
        <span className="text-2xl">💰</span>
        <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
          Finanças
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  );
}
