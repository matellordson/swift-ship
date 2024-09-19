import { ScrollArea } from "@/components/ui/scroll-area";
import handleCustomerSend from "@/app/_action/customer_send";
import { supabase } from "@/src/db/supabase";
import RealtimePosts from "./realtime-post";
import ChatForm from "./chat-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background lg:p-0">
      <div className="flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-lg border-0 bg-background shadow-xl lg:h-[calc(100vh-2rem)] lg:w-[calc(100vw-2rem)] lg:border">
        <div className="flex h-14 items-center justify-between border-b p-4">
          <Link href={"/dashboard"}>
            <ArrowLeft />
          </Link>
          <h1 className="text-lg font-semibold">Support Chat</h1>
          <div className="h-8 w-8 rounded-full bg-foreground"></div>
        </div>
        <div className="overflow-hidden">
          <ScrollArea className="mb-20" id="chat-scroll-area">
            <div className="h-full">
              <RealtimePosts serverPosts={data ?? []} />
            </div>
          </ScrollArea>
        </div>
        <div className="border-t bg-background p-4">
          <ChatForm onSubmit={submitMessage} />
        </div>
      </div>
    </div>
  );
}
