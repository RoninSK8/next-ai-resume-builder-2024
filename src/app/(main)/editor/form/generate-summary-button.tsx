import { LoadingButton } from "@/components/loading-button";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import React from "react";
import { generateSummary } from "./actions";
import { useSubscriptionLevel } from "../../subscription-level-provider";
import usePremiumModal from "@/hooks/use-premium-modal";
import { canUseAITools } from "@/lib/permissions";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export const GenerateSummaryButton: React.FC<GenerateSummaryButtonProps> = ({
  resumeData,
  onSummaryGenerated,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const subscriptionLevel = useSubscriptionLevel();
  const premiumModal = usePremiumModal();
  const handleClick = async () => {
    if (!canUseAITools(subscriptionLevel)) {
      premiumModal.setOpen(true);
      return;
    }
    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
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
    <LoadingButton
      variant="outline"
      type="button"
      loading={loading}
      onClick={handleClick}
    >
      <WandSparklesIcon className="size-4" />
      Generate (AI)
    </LoadingButton>
  );
};
