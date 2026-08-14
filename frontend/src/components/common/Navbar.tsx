import { Moon, Sun, Menu, Bell } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { theme, setTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background/80 backdrop-blur-md px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex flex-1 justify-end items-center gap-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-destructive"></span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" aria-hidden="true" />
          
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <div className="flex items-center gap-x-3">
              <img
                className="h-8 w-8 rounded-full bg-muted object-cover"
                src={`https://ui-avatars.com/api/?name=Administrator&background=random`}
                alt="Avatar"
              />
              <span className="hidden lg:flex lg:items-center">
                <span className="text-sm font-semibold leading-6 text-foreground" aria-hidden="true">
                  Administrator
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
