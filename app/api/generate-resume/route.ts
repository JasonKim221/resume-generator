import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
  fullName,
  email,
  jobTitle,
  jobDescription,
  skills,
  experience,
  education,
} = body;

    const prompt = `
You are an expert resume writer specializing in students and internships.

Your goal is to transform the candidate’s background into a strong, tailored resume for the job.

CRITICAL RULES:
- Do NOT invent fake experience or companies
- You MAY enhance wording and reframe experience to match the job
- Use strong action verbs
- Add measurable impact where reasonable (even estimated)
- Make the candidate sound confident, capable, and professional

TAILORING:
- Strongly align the resume with the job description
- Extract and use important keywords from the job posting
- Reframe non-marketing roles to highlight transferable skills (communication, analytics, organization, teamwork)

SUMMARY:
- Write a sharp, specific summary (not generic)
- Mention the job title and key strengths clearly

SKILLS:
- Keep it concise and relevant
- Remove redundancy
- Focus on job-relevant tools and abilities

EXPERIENCE:
- Use bullet points
- Focus on impact, results, and transferable skills
- Use numbers where possible (e.g., managed X clients, handled X transactions)

STRUCTURE:
1. Name and Contact
2. Professional Summary
3. Skills
4. Experience
5. Education

CANDIDATE INFORMATION:
Full Name: ${fullName}
Email: ${email}
Target Job Title: ${jobTitle}
Skills: ${skills}
Experience: ${experience}
Education: ${education}

JOB DESCRIPTION:
${jobDescription}

OUTPUT:
Return ONLY the final resume text.
`;

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1200,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text =
      message.content[0] && message.content[0].type === "text"
        ? message.content[0].text
        : "No resume generated.";

    return Response.json({ resume: text });
  } catch (error: any) {
    console.error("FULL ANTHROPIC ERROR:");
    console.error(JSON.stringify(error, null, 2));
    console.error("ERROR MESSAGE:", error?.message);
    console.error("ERROR STATUS:", error?.status);
    console.error("ERROR DETAILS:", error?.error);

    return Response.json(
      { error: error?.message || "Resume generation failed." },
      { status: 500 }
    );
  }
}