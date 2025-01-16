import { routing } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import LocaleSelectorItem from "./locale-selector-item";

export default function LocaleSelector() {
  const locale = useLocale();
  const t = useTranslations("LocaleSelector");

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <LocaleSelectorItem defaultValue={locale} label={t("select-a-locale")}>
        {routing.locales.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </LocaleSelectorItem>
    </div>
  );
}
