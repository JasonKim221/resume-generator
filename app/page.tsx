import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-end px-6 pt-6">
  <div className="flex gap-4">
    <Link href="/login" className="text-sm text-gray-300 hover:text-white">
      Log In
    </Link>
    <Link href="/signup" className="text-sm text-gray-300 hover:text-white">
      Sign Up
    </Link>
  </div>
</nav>
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            AI-Powered Resume Builder
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            Build a job-winning resume in minutes
          </h1>

          <p className="mb-8 text-lg text-gray-300 md:text-xl">
            Create polished, ATS-friendly resumes tailored to the jobs you want —
            powered by AI and built for speed.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
  <Link
    href="/signup"
    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105"
  >
    Get Started
  </Link>

  <Link
    href="/login"
    className="rounded-full border border-gray-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
  >
    Log In
  </Link>
</div>
        </div>

        <div className="mt-20 grid w-full max-w-5xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 text-left">
            <h2 className="mb-3 text-xl font-semibold">ATS-Friendly</h2>
            <p className="text-gray-400">
              Generate resumes formatted to be clear, professional, and easy for applicant tracking systems to read.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 text-left">
            <h2 className="mb-3 text-xl font-semibold">Tailored for Jobs</h2>
            <p className="text-gray-400">
              Match your resume to specific roles by aligning your experience with the job description.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 text-left">
            <h2 className="mb-3 text-xl font-semibold">Fast and Simple</h2>
            <p className="text-gray-400">
              Go from rough experience notes to a polished resume in just a few clicks.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}