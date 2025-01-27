"use client";
import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { createCheckoutSession } from "./actions";
import { canPurchasePro, canPurchaseProPlus } from "@/lib/permissions";
import { env } from "@/env";
import useModalLoading from "@/hooks/use-modal-loading";
import { useSubscriptionLevel } from "@/app/[locale]/(main)/subscription-level-provider";
import { useTranslations } from "next-intl";

export const AvailablePlansTable: React.FC = () => {
  const t = useTranslations("AvailablePlansTable");
  const freeFeatures = [t("add-single-resume")];
  const premiumFeatures = [t("up-to-3-resumes"), t("ai-tools")];
  const premiumPlusFeatures = [
    t("infinite-resumes"),
    t("ai-tools"),
    t("design-customizations"),
  ];
  const { toast } = useToast();
  const { loading, setLoading } = useModalLoading();
  const subscriptionLevel = useSubscriptionLevel();
  const handlePremiumClick = async (priceId: string) => {
    try {
      setLoading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="space-y-6">
        <p className="text-center">
          {t("get-a-premium-subscription-to-unlock-more-features")}
        </p>
        <div className="flex">
          <div className="flex w-1/2 flex-col">
            <h3 className="text-center text-lg font-bold">{t("free")}</h3>
            <ul className="my-5 list-inside space-y-2">
              {freeFeatures.map((feature) => (
                <li className="flex items-center gap-2" key={feature}>
                  <Check className="size-4" />
                  {feature}
                </li>
              ))}
              {premiumPlusFeatures.slice(1).map((feature) => (
                <li className="flex items-center gap-2" key={feature}>
                  <X className="size-4" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-6 border-l" />
          <div className="flex w-1/2 flex-col">
            <h3 className="text-center text-lg font-bold">{t("premium")}</h3>
            <ul className="my-5 list-inside space-y-2">
              {premiumFeatures.map((feature) => (
                <li className="flex items-center gap-2" key={feature}>
                  <Check className="size-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              disabled={loading || !canPurchasePro(subscriptionLevel)}
              onClick={() =>
                handlePremiumClick(env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY)
              }
              className="mt-auto"
            >
              {subscriptionLevel !== "free" && (
                <Check className="size-4 text-green-500" />
              )}
              {subscriptionLevel === "free"
                ? t("get-premium")
                : t("already-active")}
            </Button>
          </div>
          <div className="mx-6 border-l" />
          <div className="flex w-1/2 flex-col">
            <h3 className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-center text-lg font-bold text-transparent">
              {t("premium-plus")}
            </h3>
            <ul className="my-5 list-inside space-y-2">
              {premiumPlusFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="size-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant="premium"
              disabled={loading || !canPurchaseProPlus(subscriptionLevel)}
              onClick={() =>
                handlePremiumClick(
                  env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY,
                )
              }
              className="mt-auto"
            >
              {subscriptionLevel === "pro_plus" && (
                <Check className="size-4 text-green-500" />
              )}
              {subscriptionLevel === "pro_plus"
                ? t("already-active")
                : t("get-premium-plus")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
