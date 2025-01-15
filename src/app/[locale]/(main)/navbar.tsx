"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import LocaleSelector from "@/components/locale-selector";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const { theme, systemTheme } = useTheme();
  const selectedTheme = theme === "system" ? systemTheme : theme;
  const t = useTranslations("Navbar");
  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link className="flex items-center gap-2" href="/resumes">
          <Image
            src={logo}
            alt="logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">
            AI Resume Builder
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <LocaleSelector />
          <ThemeToggle />
          <UserButton
            appearance={{
              baseTheme: selectedTheme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label={t("billing")}
                labelIcon={<CreditCard className="size-4" />}
                href="/billing"
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
}
