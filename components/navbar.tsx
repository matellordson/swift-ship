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
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-[27px] w-fit px-1">
          <Sun className="h-[15px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[15px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
    <nav className="fixed top-0 flex h-12 w-screen items-center justify-end gap-2 border-b px-3 backdrop-blur-sm">
      <div className="flex items-center justify-center gap-1">
        <Button variant={"ghost"} size={"sm"} className="h-[27px] px-1">
          <HeadsetIcon className="h-[15px]" />
        </Button>
        <ModeToggle />
        <Button variant={"ghost"} size={"sm"} className="h-[27px] px-1">
          <LogOutIcon className="h-[15px]" />
        </Button>
      </div>
    </nav>
  );
}
