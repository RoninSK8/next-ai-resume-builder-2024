"use client";
import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/use-premium-modal";
import { useTranslations } from "next-intl";
import React from "react";

export const GetSubscriptionButton: React.FC = () => {
  const premiumModal = usePremiumModal();
  const t = useTranslations("GetPremiumButton");
  return (
    <Button onClick={() => premiumModal.setOpen(true)} variant="premium">
      {t("get-premium-subscription")}
    </Button>
  );
};
