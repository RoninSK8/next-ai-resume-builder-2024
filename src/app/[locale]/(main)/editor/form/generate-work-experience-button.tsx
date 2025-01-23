import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { generateWorkExperience } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/loading-button";
import { useSubscriptionLevel } from "../../subscription-level-provider";
import usePremiumModal from "@/hooks/use-premium-modal";
import { canUseAITools } from "@/lib/permissions";
import { useTranslations } from "next-intl";
import { AutosizeTextarea } from "@/components/ui/auto-size-textarea";

interface GenerateWorkExperienceButtonProps {
  onWorkExperienceGenerated: (workExperience: WorkExperience) => void;
}

export const GenerateWorkExperienceButton: React.FC<
  GenerateWorkExperienceButtonProps
> = ({ onWorkExperienceGenerated }) => {
  const subscriptionLevel = useSubscriptionLevel();
  const premiumModal = usePremiumModal();
  const [showInputDialog, setShowInputDialog] = React.useState(false);

  const t = useTranslations("GenerateWorkExperienceButton");

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          if (!canUseAITools(subscriptionLevel)) {
            premiumModal.setOpen(true);
            return;
          }
          setShowInputDialog(true);
        }}
      >
        <WandSparklesIcon className="size-4" />
        {t("smart-fill-ai")}
      </Button>
      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onWorkExperienceGenerated={(workExperience) => {
          onWorkExperienceGenerated(workExperience);
          setShowInputDialog(false);
        }}
      />
    </>
  );
};

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkExperienceGenerated: (workExperience: WorkExperience) => void;
}

const InputDialog: React.FC<InputDialogProps> = ({
  open,
  onOpenChange,
  onWorkExperienceGenerated,
}) => {
  const { toast } = useToast();

  const form = useForm<GenerateWorkExperienceInput>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (data: GenerateWorkExperienceInput) => {
    try {
      const aiResponse = await generateWorkExperience(data);
      onWorkExperienceGenerated(aiResponse);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const t = useTranslations("GenerateWorkExperienceButton");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("generate-work-experience")}</DialogTitle>
          <DialogDescription>
            {t(
              "describe-this-work-experience-and-the-ai-will-generate-an-optimized-entry-for-you",
            )}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("description")}</FormLabel>
                  <FormControl>
                    <AutosizeTextarea
                      maxHeight={400}
                      minHeight={100}
                      {...field}
                      placeholder={t("example")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <LoadingButton type="submit" loading={form.formState.isSubmitting}>
            {t("generate")}
          </LoadingButton>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
