import React from "react";
import Navbar from "./navbar";
import { PremiumModal } from "@/components/premium/premium-modal";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
      <PremiumModal />
    </div>
  );
}
