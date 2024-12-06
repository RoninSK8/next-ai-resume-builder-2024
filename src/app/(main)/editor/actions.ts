"use server";
import { auth } from "@clerk/nextjs/server";
import { resumeSchema } from "./../../../lib/validation";

import { ResumeValues } from "@/lib/validation";
import prisma from "@/lib/prisma";
import { del, put } from "@vercel/blob";
import path from "path";

export async function saveResume(values: ResumeValues) {
  const { id } = values;
  console.log("received values", values);
  console.log("id", id);

  const { photo, workExperiences, educations, ...resumeValues } =
    resumeSchema.parse(values);
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
      access: "public",
    });
    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  }

  if (id) {
    return prisma.resume.update({
      where: {
        id,
      },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,

        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((workExp) => ({
            ...workExp,
            startDate: workExp.startDate
              ? new Date(workExp.startDate)
              : undefined,
            endDate: workExp.endDate ? new Date(workExp.endDate) : undefined,
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((education) => ({
            ...education,
            startDate: education.startDate
              ? new Date(education.startDate)
              : undefined,
            endDate: education.endDate
              ? new Date(education.endDate)
              : undefined,
          })),
        },
        updatedAt: new Date(),
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,

        workExperiences: {
          create: workExperiences?.map((workExp) => ({
            ...workExp,
            startDate: workExp.startDate
              ? new Date(workExp.startDate)
              : undefined,
            endDate: workExp.endDate ? new Date(workExp.endDate) : undefined,
          })),
        },
        educations: {
          create: educations?.map((education) => ({
            ...education,
            startDate: education.startDate
              ? new Date(education.startDate)
              : undefined,
            endDate: education.endDate
              ? new Date(education.endDate)
              : undefined,
          })),
        },
      },
    });
  }
}
