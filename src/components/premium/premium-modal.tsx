"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import usePremiumModal from "@/hooks/use-premium-modal";
import { createCheckoutSession } from "./actions";
import { env } from "@/env";
import { useSubscriptionLevel } from "@/app/(main)/subscription-level-provider";
import { canPurchasePro, canPurchaseProPlus } from "@/lib/permissions";

const freeFeatures = ["Add single resume"];
const premiumFeatures = ["Up to 3 resumes", "AI tools"];
const premiumPlusFeatures = [
  "infinite resumes",
  "AI tools",
  "Design customizations",
];

export const PremiumModal: React.FC = () => {
  const { open, setOpen } = usePremiumModal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            AI Resume Builder Premium
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-center">
            Get a premium subscription to unlock more features.
          </p>
          <div className="flex">
            <div className="flex w-1/2 flex-col">
              <h3 className="text-center text-lg font-bold">Free</h3>
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
              <h3 className="text-center text-lg font-bold">Premium</h3>
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
                  handlePremiumClick(
                    env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
                  )
                }
                className="mt-auto"
              >
                {subscriptionLevel !== "free" && (
                  <Check className="size-4 text-green-500" />
                )}
                {subscriptionLevel === "free"
                  ? "Get Premium"
                  : "Already active"}
              </Button>
            </div>
            <div className="mx-6 border-l" />
            <div className="flex w-1/2 flex-col">
              <h3 className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-center text-lg font-bold text-transparent">
                Premium Plus
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
                  ? "Already active"
                  : "Get Premium Plus"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
