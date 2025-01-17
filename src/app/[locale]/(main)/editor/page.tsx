import { Metadata } from "next";
import ResumeEditor from "./resume-editor";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Locale } from "date-fns";

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("design-your-resume"),
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { resumeId } = await searchParams;
  const { userId } = await auth();

  if (!userId) return null;

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
}
