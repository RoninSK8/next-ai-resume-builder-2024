"use server";

import openai from "@/lib/openai";
import { GenerateSummaryInput, generateSummarySchema } from "@/lib/validation";

export async function generateSummary(input: GenerateSummaryInput) {
  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage =
    "You are an AI that generates a summary of a resume. Your task is to generate a professional introduction summary of a resume based on the user`s provided data. The summary should be concise and professional, highlighting the user`s key skills and experience.";

  const userMessage = `Please generate a summary based on the following data: \n\n
  Job title: ${jobTitle || "N/A"}
  Work experiences: ${
    workExperiences
      ?.map(
        (
          exp,
        ) => `Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "present"}

    Description: ${exp.description}`,
      )
      .join("\n\n") || "N/A"
  }
  Educations: ${
    educations
      ?.map(
        (edu) =>
          `Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}`,
      )
      .join("\n\n") || "N/A"
  }

  Skills: ${skills}
  `;

  console.log("systemMessage", systemMessage);
  console.log("userMessage", userMessage);

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }

  return aiResponse;
}
