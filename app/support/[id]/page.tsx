import { ScrollArea } from "@/components/ui/scroll-area";
import handleCustomerSend from "@/app/_action/customer_send";
import { supabase } from "@/src/db/supabase";
import RealtimePosts from "./realtime-post";
import ChatForm from "./chat-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-background lg:p-0">
    //   <div className="flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-lg border-0 bg-background shadow-xl lg:h-[calc(100vh-2rem)] lg:w-[calc(100vw-2rem)] lg:border">
    //     <div className="flex h-14 items-center justify-between border-b p-4">
    //       <Link href={"/dashboard"}>
    //         <ArrowLeft />
    //       </Link>
    //       <h1 className="text-lg font-semibold">Support Chat</h1>
    //       <div className="h-8 w-8 rounded-full bg-foreground"></div>
    //     </div>
    //     <div className="overflow-hidden">
    //       <ScrollArea className="mb-20" id="chat-scroll-area">
    //         <div className="h-full">
    //           <RealtimePosts serverPosts={data ?? []} />
    //         </div>
    //       </ScrollArea>
    //     </div>
    //     <div className="border-t bg-background p-4">
    //       <ChatForm onSubmit={submitMessage} />
    //     </div>
    //   </div>
    // </div>
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-[10vh] items-center justify-between bg-background/50 px-4 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="Support Agent"
            />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold">Support Chat</h1>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        <Badge variant="outline">Case #1234</Badge>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-4xl p-6">
          <h2 className="mb-4 text-xl font-semibold">Chat History</h2>
          {[...Array(50)].map((_, i) => (
            <p key={i} className="mb-4">
              This is message {i + 1}. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 z-10 flex h-[10vh] items-center justify-center bg-background/50 backdrop-blur-md">
        <p>Chat Input Area</p>
      </footer>

      {/* Gradient overlays for scroll indication */}
      <div className="pointer-events-none fixed left-0 right-0 top-[10vh] z-20 h-8 bg-gradient-to-b from-background to-transparent"></div>
      <div className="pointer-events-none fixed bottom-[10vh] left-0 right-0 z-20 h-8 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
}
