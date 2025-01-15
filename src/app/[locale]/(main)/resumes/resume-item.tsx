"use client";
import { ResumePreview } from "@/components/resume-preview";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { MoreVertical, Printer, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";
import { deleteResume } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingButton } from "@/components/loading-button";
import { useReactToPrint } from "react-to-print";
import { useLocale, useTranslations } from "next-intl";
import { enUS, ru, Locale } from "date-fns/locale";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export const ResumeItem: React.FC<ResumeItemProps> = ({ resume }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("ResumeItem");
  const locale = useLocale();
  const dateSettings: {
    dateLocale?: Locale;
    dateFormat?: string;
  } = {};
  if (locale === "en") {
    dateSettings.dateLocale = enUS;
    dateSettings.dateFormat = "MMM d, yyyy h:mm a";
  } else if (locale === "ru") {
    dateSettings.dateLocale = ru;
    dateSettings.dateFormat = "hh:mm dd.MM.yyyy";
  } else {
    dateSettings.dateLocale = enUS;
    dateSettings.dateFormat = "MMM d, yyyy h:mm a";
  }
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || t("resume"),
  });

  const wasUpdated = resume.updatedAt !== resume.createdAt;
  return (
    <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold">
            {resume.title || t("no-title")}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? t("updated") : t("created")} {t("on")}{" "}
            {formatDate(resume.createdAt, dateSettings.dateFormat, {
              locale: dateSettings.dateLocale,
            })}
          </p>
        </Link>
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <ResumePreview
            contentRef={contentRef}
            resumeData={mapToResumeValues(resume)}
            className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>
      <MoreMenu resumeId={resume.id} onPrintClick={reactToPrintFn} />
    </div>
  );
};

interface MoreMenuProps {
  resumeId: string;
  onPrintClick: () => void;
}

const MoreMenu: React.FC<MoreMenuProps> = ({ resumeId, onPrintClick }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    React.useState(false);
  const t = useTranslations("ResumeItem");

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setShowDeleteConfirmation(true)}
            className="flex items-center gap-2"
          >
            <Trash2 className="size-4" />
            {t("delete")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onPrintClick}
            className="flex items-center gap-2"
          >
            <Printer className="size-4" />
            {t("print")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmationDialog
        resumeId={resumeId}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      />
    </>
  );
};

interface DeleteConfirmationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  resumeId,
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();

  const [isPending, startTransition] = React.useTransition();
  const t = useTranslations("ResumeItem");
  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          description: t("something-went-wrong"),
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("delete-resume")}</DialogTitle>
          <DialogDescription>
            {t("this-will-permanently-delete")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
          >
            {t("delete")}
          </LoadingButton>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
