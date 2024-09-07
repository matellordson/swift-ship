import { SignIn } from "@/components/sign-in";
import { PackageForm } from "@/components/new-package";

export default function Home() {
  return (
    <div>
      <SignIn />
      <PackageForm />
    </div>
  );
}
