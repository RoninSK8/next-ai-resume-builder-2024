import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import React, { useRef } from "react";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resumeData,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        <h1 className="p-6 text-3xl font-bold">
          This text should change with the size of the container div
        </h1>
      </div>
    </div>
  );
};
