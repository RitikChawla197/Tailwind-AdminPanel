// src/components/ModeToggle.jsx
import { useTheme } from "./theme-provider.jsx";
import { Sun, Moon } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative">
      <button
        className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        onClick={() => {
          const nextTheme = theme === "light" ? "dark" : "light";
          setTheme(nextTheme);
        }}
        aria-label="Toggle theme"
      >
        {theme === "light" && <Sun className="w-4 h-4" />}
        {theme === "dark" && <Moon className="w-4 h-4" />}
      </button>
    </div>
  );
}