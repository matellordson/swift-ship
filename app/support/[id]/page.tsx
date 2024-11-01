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
import Image from "next/image";
import Logo from "@/app/public/logo2.svg";

export const revalidate = 0;

async function submitMessage(formData: FormData) {
  "use server";
  await handleCustomerSend(formData);
}

export default async function CustomerSupport({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await supabase
    .from("chat")
    .select("*")
    .eq("user_id", params.id);

  const { user } = await validateRequest();
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0">
      <div className="fixed bottom-0 left-0 right-0 top-0">
        <div className="flex h-[10%] items-center justify-start border-b px-3 lg:rounded lg:rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Link href={"/dashboard"}>
              <ArrowLeft />
            </Link>
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Support Agent"
              />
              <AvatarFallback className="border bg-primary text-primary-foreground">
                <Image src={Logo} alt="logo" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold">Support Chat</h1>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm">Online</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[80%]">
          <RealtimePosts serverPosts={data ?? []} />
        </div>
        <div className="flex h-[10%] items-center justify-center border-t">
          <ChatForm onSubmit={submitMessage} user={user.id} />
        </div>
      </div>
    </div>
  );
}
