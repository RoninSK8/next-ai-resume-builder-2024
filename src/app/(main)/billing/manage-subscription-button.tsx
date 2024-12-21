"use client";

import { LoadingButton } from "@/components/loading-button";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { createCustomerPortalSession } from "./actions";

export const ManageSubscriptionButton: React.FC = () => {
  const { toast } = useToast();

  const [loading, setLoading] = React.useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const redirectUrl = await createCustomerPortalSession();
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
  }

  return (
    <LoadingButton onClick={handleClick} loading={loading}>
      Manage subscription
    </LoadingButton>
  );
};
