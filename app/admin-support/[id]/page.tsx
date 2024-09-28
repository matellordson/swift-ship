import { ScrollArea } from "@/components/ui/scroll-area";
import handleCustomerSend from "@/app/_action/customer_send";
import { supabase } from "@/src/db/supabase";
import RealtimePosts from "./realtime-post";
import ChatForm from "./chat-form";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";
import { validateRequest } from "@/utils/auth";
import Link from "next/link";
import handleAdminSend from "@/app/_action/admin_send";

export const revalidate = 0;

export default async function CustomerSupport({
  params,
}: {
  params: { id: string };
}) {
  async function submitMessage(formData: FormData) {
    "use server";
    await handleAdminSend(formData, { params });
  }

  const { data } = await supabase
    .from("chat")
    .select("*")
    .eq("user_id", params.id);

  const user = await validateRequest();
  if (!user) {
    redirect("/auth/signup");
  }

  const { data: userProfile } = await supabase
    .from("user")
    .select("id, user_name")
    .eq("id", params.id)
    .single();

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0">
      <div className="fixed bottom-0 left-0 right-0 top-0">
        <div className="flex h-[10%] items-center justify-start border-b px-3 lg:rounded lg:rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Link href={"/admin-support"}>
              <ArrowLeft />
            </Link>
            <Avatar>
              <AvatarFallback className="bg-gradient-to-r from-neutral-200 to-neutral-300 text-xl font-semibold uppercase text-foreground shadow-sm dark:from-neutral-500 dark:to-neutral-700">
                {userProfile?.user_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold capitalize">
                {userProfile?.user_name}
              </h1>
            </div>
          </div>
        </div>
        <div className="h-[80%]">
          <RealtimePosts serverPosts={data ?? []} />
        </div>
        <div className="flex h-[10%] items-center justify-center border-t">
          <ChatForm onSubmit={submitMessage} />
        </div>
      </div>
    </div>
  );
}
