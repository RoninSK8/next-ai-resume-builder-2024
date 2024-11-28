import React from "react";

import { ResumeValues } from "@/lib/validation";

import { ResumePreview } from "@/components/resume-preview";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (resumeData: ResumeValues) => void;
}

export const ResumePreviewSection: React.FC<ResumePreviewSectionProps> = ({
  resumeData,
  setResumeData,
}) => {
  return (
    <div className="hidden w-1/2 md:flex">
      <div className="flex w-full justify-center overflow-y-auto bg-secondary">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
};
