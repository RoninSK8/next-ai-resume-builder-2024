"use client";
import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/use-premium-modal";
import { PlusSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

interface CreateResumeButtonProps {
  canCreate: boolean;
}

export const CreateResumeButton: React.FC<CreateResumeButtonProps> = ({
  canCreate,
}) => {
  const t = useTranslations();
  const premiumModal = usePremiumModal();
  if (canCreate) {
    return (
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          {t("new-resume")}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className="mx-auto flex w-fit gap-2"
      onClick={() => premiumModal.setOpen(true)}
    >
      <PlusSquare className="size-5" />
      {t("new-resume")}
    </Button>
  );
};
