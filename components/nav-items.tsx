import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { CircleUserRound } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";

export async function NavbarItems() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <CircleUserRound />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="px-3 hover:bg-primary-foreground">
              <LogoutLink>Logout</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center justify-center gap-3">
          <RegisterLink postLoginRedirectURL="/customer-dashboard">
            <Button size={"sm"}>Get Started</Button>
          </RegisterLink>
        </div>
      )}
    </div>
  );
}
