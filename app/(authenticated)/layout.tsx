import { db } from "@/src/db";
import { Nav } from "./nav-item";
import { validateRequest } from "@/utils/auth";
import { userTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/");
  }

  const currentUserResult = await db
    .select({ username: userTable.username })
    .from(userTable)
    .where(eq(userTable.id, user.id))
    .limit(1);

  const currentUserName = currentUserResult[0]?.username || "Unknown User";

  return (
    <div className="min-h-screen bg-background">
      <Nav user={currentUserName} />
      <main className="container mx-auto py-6">{children}</main>
    </div>
  );
}
