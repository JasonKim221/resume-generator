"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Account created. Check your email if confirmation is enabled.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-950 p-8 shadow-xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-gray-400">
            Get Started
          </p>
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="mt-3 text-sm text-gray-400">
            Start building tailored resumes with AI.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition focus:border-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:scale-[1.01]"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-300">{message}</p>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-white underline">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}