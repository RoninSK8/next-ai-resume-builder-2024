"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import usePremiumModal from "@/hooks/use-premium-modal";
import { AvailablePlansTable } from "./available-plans-table";
import useModalLoading from "@/hooks/use-modal-loading";

export const PremiumModal: React.FC = () => {
  const { open, setOpen } = usePremiumModal();
  const { loading } = useModalLoading();

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            AI Resume Builder Premium
          </DialogTitle>
        </DialogHeader>
        <AvailablePlansTable />
      </DialogContent>
    </Dialog>
  );
};
