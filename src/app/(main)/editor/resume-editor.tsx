"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./breadcrumbs";
import { Footer } from "./footer";
import { ResumeValues } from "@/lib/validation";
import { ResumePreviewSection } from "./resume-preview-section";

export default function ResumeEditor() {
  const [resumeData, setResumeData] = React.useState<ResumeValues>({});
  const searParams = useSearchParams();
  const currentStep = searParams.get("step") || steps[0].key;

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design your resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to create your resume. Your progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="w-full space-y-6 overflow-y-auto p-3 md:w-1/2">
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
}
