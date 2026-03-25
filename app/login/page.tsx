"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-950 p-8 shadow-xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-gray-400">
            Welcome Back
          </p>
          <h1 className="text-3xl font-bold">Log in to your account</h1>
          <p className="mt-3 text-sm text-gray-400">
            Continue building your AI-powered resume.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition focus:border-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition focus:border-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:scale-[1.01]"
          >
            Log In
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-300">{message}</p>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-white underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}