"use client";
import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/use-premium-modal";
import React from "react";

export const GetSubscriptionButton: React.FC = () => {
  const premiumModal = usePremiumModal();
  return (
    <Button onClick={() => premiumModal.setOpen(true)} variant="premium">
      Get Premium subscription
    </Button>
  );
};
