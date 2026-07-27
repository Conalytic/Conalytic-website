"use client";

import { Moon, Sun } from "lucide-react";
import { StudioIconButton } from "@/components/admin/ui/StudioIconButton";
import { useStudioTheme } from "@/components/admin/ui/StudioThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme, resolved } = useStudioTheme();

  function cycle() {
    if (theme === "system") setTheme(resolved === "dark" ? "light" : "dark");
    else if (theme === "light") setTheme("dark");
    else setTheme("light");
  }

  return (
    <StudioIconButton
      label={resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={cycle}
      variant="chrome"
    >
      {resolved === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </StudioIconButton>
  );
}
