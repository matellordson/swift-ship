"use client";

import * as React from "react";
import {
  HeadsetIcon,
  LogOutIcon,
  MessageCircleDashedIcon,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export function Navbar() {
  return (
    <nav className="fixed top-0 flex h-14 w-screen items-center justify-end gap-2 border-b px-5 backdrop-blur-sm">
      <Button
        variant={"outline"}
        size={"sm"}
        className="flex w-fit items-center justify-center gap-2"
      >
        <HeadsetIcon size={20} />
      </Button>
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Copy tracking ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="flex items-center justify-between px-2">
              <p>Theme</p>
              <ModeToggle />
            </div>
            <DropdownMenuSeparator />
            <Button variant={"ghost"} className="gap-4">
              Log out <LogOutIcon size={20} />
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
