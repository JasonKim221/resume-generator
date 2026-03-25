"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import jsPDF from "jspdf";

export default function DashboardPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [generatedResume, setGeneratedResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
 
  const [savedResumes, setSavedResumes] = useState<any[]>([]);

  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
  const loadResumes = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading resumes:", error);
    } else {
      setSavedResumes(data || []);
    }
  };

  loadResumes();
}, []);

useEffect(() => {
  const loadPlan = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: subscriber } = await supabase
      .from("subscribers")
      .select("*")
      .eq("user_id", user.id)
      .in("status", ["active", "trialing"])
      .maybeSingle();

    if (subscriber) {
      setIsPro(true);
      setShowUpgrade(false);
    } else {
      setIsPro(false);
    }
  };

  loadPlan();
}, []);

const handleDownloadPDF = () => {
  if (!generatedResume) return;

  const doc = new jsPDF();

  const lines = doc.splitTextToSize(generatedResume, 180);

  doc.text(lines, 10, 10);

  doc.save("resume.pdf");
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedResume("");
    
    const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  alert("You must be logged in.");
  return;
}
const { data: subscriber } = await supabase
  .from("subscribers")
  .select("*")
  .eq("user_id", user.id)
  .in("status", ["active", "trialing"])
  .maybeSingle();

  if (subscriber) {
  setIsPro(true);
  setShowUpgrade(false);
} else {
  setIsPro(false);
}

    const { data: existingResumes } = await supabase
  .from("resumes")
  .select("*")
  .eq("user_id", user.id);

if (!subscriber && existingResumes && existingResumes.length >= 2) {
  setLoading(false);
  setShowUpgrade(true);
  return;
}

    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          jobTitle,
          jobDescription,
          skills,
          experience,
          education,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
  alert(data.error || "Something went wrong.");
} else {
  setGeneratedResume(data.resume); 
  setSavedResumes((prev) => [
  {
    full_name: fullName,
    email,
    job_title: jobTitle,
    skills,
    experience,
    education,
    generated_resume: data.resume,
    created_at: new Date().toISOString(),
  },
  ...prev,
]);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { error: saveError } = await supabase.from("resumes").insert([
      {
        user_id: user.id,
        full_name: fullName,
        email,
        job_title: jobTitle,
        skills,
        experience,
        education,
        generated_resume: data.resume,
      },
    ]);

    if (saveError) {
      console.error("Error saving resume:", saveError);
    }
  }
}
    } catch (error) {
      alert("Failed to generate resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Resume Builder</h1>
          <p className="mt-2 text-sm text-gray-400">
  Plan: {isPro ? "Pro" : "Free"}
</p>
          <p className="mt-3 text-gray-400">
            Fill out your information below to generate an AI-powered resume.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-gray-800 bg-gray-950 p-8"
          >
            <div>
              <label className="mb-2 block text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Smith"
                className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Target Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Marketing Intern"
                className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Skills</label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Communication, Excel, Social Media, Research..."
                className="min-h-[100px] w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
              />
            </div>
            <div>
  <label className="mb-2 block text-sm font-medium">Job Description</label>
  <textarea
    value={jobDescription}
    onChange={(e) => setJobDescription(e.target.value)}
    placeholder="Paste the job posting here..."
    className="min-h-[140px] w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
  />
</div>
            <div>
              <label className="mb-2 block text-sm font-medium">Work Experience</label>
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Describe your work experience, internships, leadership roles, or projects..."
                className="min-h-[140px] w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Education</label>
              <textarea
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Penn State University, major, graduation year, relevant coursework..."
                className="min-h-[100px] w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:scale-[1.01] disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Resume"}
            </button>
          </form>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8">
            <h2 className="mb-4 text-2xl font-bold">Generated Resume</h2>
            {showUpgrade ? (
  <div className="rounded-xl border border-yellow-500/30 p-4">
    <h3 className="text-xl font-semibold text-yellow-300">
      Upgrade Required
    </h3>
    <p className="mt-3 text-sm text-gray-300">
      You've used all free resume generations. Upgrade to continue.
    </p>

    <button
  onClick={async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("You must be logged in.");
        return;
      }

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to start checkout");
      }
    } catch (error) {
      alert("Something went wrong starting checkout.");
    }
  }}
  className="mt-4 w-full rounded-xl bg-white px-4 py-3 font-semibold text-black"
>
  Upgrade Now
</button>

  </div>
) : generatedResume ? (
  <pre className="whitespace-pre-wrap text-sm leading-7 text-gray-300">
    {generatedResume}
  </pre>
) : (
  <p className="text-gray-400">
    Your generated resume will appear here.
  </p>
)} 
            {generatedResume && (
  <button
    onClick={handleDownloadPDF}
    className="mt-4 w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:scale-[1.01]"
  >
    Download PDF
  </button>
)}
          </div>
        </div>
      </div>
      <div className="mt-12 rounded-2xl border border-gray-800 bg-gray-950 p-8">
  <h2 className="mb-6 text-2xl font-bold">Saved Resumes</h2>

  {savedResumes.length === 0 ? (
    <p className="text-gray-400">No saved resumes yet.</p>
  ) : (
    <div className="space-y-6">
      {savedResumes.map((resume, index) => (
        <div
          key={resume.id || index}
          className="rounded-xl border border-gray-800 bg-black p-6"
        >
          <h3 className="text-lg font-semibold">
            {resume.full_name || "Untitled Resume"}
          </h3>
          <p className="mt-1 text-sm text-gray-400">
            {resume.job_title || "No job title"}
          </p>

          <pre className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-200">
            {resume.generated_resume}
          </pre>
        </div>
      ))}
    </div>
  )}
</div>
    </main>
  );
}