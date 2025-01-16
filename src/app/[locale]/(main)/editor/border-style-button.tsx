import { Button } from "@/components/ui/button";
import { Circle, Square, Squircle } from "lucide-react";
import React from "react";
import { useSubscriptionLevel } from "../subscription-level-provider";
import usePremiumModal from "@/hooks/use-premium-modal";
import { canUseCustomizations } from "@/lib/permissions";
import { useTranslations } from "next-intl";

export const BorderStyles = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQUIRCLE: "squircle",
};

const borderStyles = Object.values(BorderStyles);

interface BorderStyleButtonProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}

export const BorderStyleButton: React.FC<BorderStyleButtonProps> = ({
  borderStyle,
  onChange,
}) => {
  const subscriptionLevel = useSubscriptionLevel();
  const premiumModal = usePremiumModal();
  const handleClick = () => {
    if (!canUseCustomizations(subscriptionLevel)) {
      premiumModal.setOpen(true);
      return;
    }
    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[nextIndex]);
  };

  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
        ? Circle
        : Squircle;

  const t = useTranslations("BorderStyleButton");

  return (
    <Button
      variant="outline"
      size="icon"
      title={t("change-border-style")}
      onClick={handleClick}
    >
      <Icon className="size-5" />
    </Button>
  );
};
