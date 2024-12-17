import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Check } from "lucide-react";
import { Button } from "../ui/button";

const premiumFeatures = ["AI tools", "Up to 3 resumes"];
const premiumPlusFeatures = ["infinite resumes", "Design customizations"];

export const PremiumModal: React.FC = () => {
  return (
    <Dialog open>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI Resume Builder Premium</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p>Get a premium subscription to unlock more features.</p>
          <div className="flex">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">Premium</h3>
              <ul className="list-inside space-y-2">
                {premiumFeatures.map((feature) => (
                  <li className="flex items-center gap-2" key={feature}>
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button>Get Premium</Button>
            </div>
            <div className="mx-6 border-l" />
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-center text-lg font-bold text-transparent">
                Premium Plus
              </h3>
              <ul className="list-inside space-y-2">
                {premiumPlusFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="premium">Get Premium Plus</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
