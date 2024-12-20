import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  return <main>Billing</main>;
}
