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
          <section className="mx-auto w-full max-w-6xl px-6 pb-24">
  <div className="mb-12 text-center">
    <h2 className="text-3xl font-bold md:text-4xl">Simple pricing</h2>
    <p className="mt-3 text-lg text-gray-400">
      Start free, then upgrade when you need unlimited tailored resumes.
    </p>
  </div>

  <div className="grid gap-8 md:grid-cols-2">
    <div className="rounded-3xl border border-gray-800 bg-gray-950 p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
        Free
      </p>
      <h3 className="mt-4 text-4xl font-bold">$0</h3>
      <p className="mt-4 text-gray-400">
        Great for trying the product and creating your first resumes.
      </p>

      <ul className="mt-8 space-y-4 text-gray-300">
        <li>• 2 resume generations</li>
        <li>• Job-tailored resume writing</li>
        <li>• PDF download</li>
      </ul>

      <Link
        href="/signup"
        className="mt-8 inline-block w-full rounded-xl bg-white px-4 py-3 text-center font-semibold text-black transition hover:scale-[1.01]"
      >
        Start Free
      </Link>
    </div>

    <div className="rounded-3xl border border-yellow-500/30 bg-yellow-500/10 p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">
        Pro
      </p>
      <h3 className="mt-4 text-4xl font-bold">$5/month</h3>
      <p className="mt-4 text-gray-200">
        For users who want unlimited tailored resumes and ongoing access.
      </p>

      <ul className="mt-8 space-y-4 text-gray-200">
        <li>• Unlimited resume generations</li>
        <li>• Tailored to job descriptions</li>
        <li>• PDF download</li>
        <li>• Faster iteration for applications</li>
      </ul>

      <Link
        href="/signup"
        className="mt-8 inline-block w-full rounded-xl bg-white px-4 py-3 text-center font-semibold text-black transition hover:scale-[1.01]"
      >
        Upgrade to Pro
      </Link>
    </div>
  </div>
</section>
        </div>
      </section>
    </main>
  );
}