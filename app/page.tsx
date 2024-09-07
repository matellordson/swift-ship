import { SignIn } from "@/components/sign-in";
import { PackageForm } from "@/components/ui/new-package";

export default function Home() {
  return (
    <div>
      <SignIn />
      <PackageForm />
    </div>
  );
}
