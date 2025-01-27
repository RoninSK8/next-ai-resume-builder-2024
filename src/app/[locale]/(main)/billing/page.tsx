import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import stripe from "@/lib/stripe";
import Stripe from "stripe";
import { formatDate } from "date-fns";
import { ManageSubscriptionButton } from "./manage-subscription-button";
import { GetSubscriptionButton } from "./get-subscription-button";
import { AvailablePlansTable } from "@/components/premium/available-plans-table";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function Page() {
  const { userId } = await auth();
  const t = await getTranslations("BillingPage");

  if (!userId) {
    return null;
  }

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <h1 className="text-center text-3xl font-bold">{t("billing")}</h1>
      <AvailablePlansTable />
      <div className="my-6 border-t" />
      <p>
        {t("your-current-plan")}{" "}
        <span className="font-bold">
          {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"}
        </span>
      </p>
      {subscription ? (
        <>
          {subscription.stripeCancelAtPeriodEnd && (
            <p className="text-destructive">
              {t("your-subscription-will-be-canceled-on")}{" "}
              {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd, yyyy")}
            </p>
          )}
          <ManageSubscriptionButton />
        </>
      ) : (
        <GetSubscriptionButton />
      )}
    </main>
  );
}
