import { ScrollArea } from "@/components/ui/scroll-area";
import handleCustomerSend from "@/app/_action/customer_send";
import { supabase } from "@/src/db/supabase";
import RealtimePosts from "./realtime-post";
import ChatForm from "./chat-form";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4 lg:p-0">
      <div className="flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-lg border bg-background shadow-xl lg:h-[calc(100vh-2rem)] lg:w-[calc(100vw-2rem)]">
        <div className="flex-grow overflow-hidden">
          <ScrollArea className="h-full" id="chat-scroll-area">
            <div className="py-4">
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
