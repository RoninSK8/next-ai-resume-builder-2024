import React from "react";

import { ResumeValues } from "@/lib/validation";

import { ResumePreview } from "@/components/resume-preview";
import { ColorPicker } from "./color-picker";
import { BorderStyleButton } from "./border-style-button";
import { cn } from "@/lib/utils";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (resumeData: ResumeValues) => void;
  className?: string;
}

export const ResumePreviewSection: React.FC<ResumePreviewSectionProps> = ({
  resumeData,
  setResumeData,
  className,
}) => {
  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
    >
      {/* TODO: fix color picker that hides profile photo */}
      <div className="absolute right-1 top-1 flex flex-none flex-row gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:right-3 lg:top-3 xl:opacity-100">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
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
