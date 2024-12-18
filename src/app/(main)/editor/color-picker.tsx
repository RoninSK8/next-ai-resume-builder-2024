import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { PaletteIcon } from "lucide-react";
import React from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";
import { useSubscriptionLevel } from "../subscription-level-provider";
import usePremiumModal from "@/hooks/use-premium-modal";
import { canUseCustomizations } from "@/lib/permissions";

interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
}) => {
  const [showPopover, setShowPopover] = React.useState(false);
  const subscriptionLevel = useSubscriptionLevel();
  const premiumModal = usePremiumModal();
  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          title="Change resume color"
          onClick={() => {
            if (!canUseCustomizations(subscriptionLevel)) {
              premiumModal.setOpen(true);
              return;
            }
            setShowPopover(true);
          }}
        >
          <PaletteIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none bg-transparent shadow-none"
        align="start"
      >
        <TwitterPicker color={color} onChange={onChange} triangle="top-left" />
      </PopoverContent>
    </Popover>
  );
};
