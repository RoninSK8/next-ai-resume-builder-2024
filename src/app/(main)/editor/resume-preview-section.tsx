import React from "react";

import { ResumeValues } from "@/lib/validation";

import { ResumePreview } from "@/components/resume-preview";
import { ColorPicker } from "./color-picker";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (resumeData: ResumeValues) => void;
}

export const ResumePreviewSection: React.FC<ResumePreviewSectionProps> = ({
  resumeData,
  setResumeData,
}) => {
  return (
    <div className="relative hidden w-1/2 md:flex">
      {/* TODO: fix color picker that hides profile photo */}
      <div className="absolute left-1 top-1 flex flex-none flex-col gap-3 lg:left-3 lg:top-3">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
};
