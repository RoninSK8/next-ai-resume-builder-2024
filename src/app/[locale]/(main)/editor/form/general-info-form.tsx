import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalInfoSchema, GeneralInfoValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { useTranslations } from "next-intl";

export default function GeneralInfoForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        ...values,
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const t = useTranslations("GeneralInfoForm");

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">{t("general-info")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("this-will-not-appear-on-your-resume")}
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("project-name")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("my-cool-resume")}
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("description")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("a-resume-for-my-next-job")}
                  />
                </FormControl>
                <FormDescription>
                  {t("describe-what-this-resume-is-for")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
