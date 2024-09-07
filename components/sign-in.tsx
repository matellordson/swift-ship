import { signIn } from "@/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function SignIn() {
  return (
    <Dialog>
      <DialogTrigger>Get Started</DialogTrigger>
      <DialogContent className="mx-auto max-w-sm">
        <DialogHeader>
          <DialogTitle>Get Authenticated</DialogTitle>
          <DialogDescription>
            Provide your email address to create an account. <br /> A code will
            be sent to verify your email
          </DialogDescription>
        </DialogHeader>
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <Button type="submit">Signin with GitHub</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
