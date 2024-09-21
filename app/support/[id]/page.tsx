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
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-10 flex h-[10vh] items-center justify-center bg-background/50 backdrop-blur-md">
        <h1 className="text-2xl font-bold">Page Heading</h1>
      </header>

      {/* Scrollable Content */}
      <main className="mb-[10vh] mt-[10vh] flex-grow overflow-y-auto p-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-xl font-semibold">Scrollable Content</h2>
          {[...Array(50)].map((_, i) => (
            <p key={i} className="mb-4">
              This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 flex h-[10vh] items-center justify-center bg-background/50 backdrop-blur-md">
        <p>Footer Content</p>
      </footer>

      {/* Gradient overlays for scroll indication */}
      <div className="pointer-events-none fixed left-0 right-0 top-[10vh] z-20 h-8 bg-gradient-to-b from-background to-transparent"></div>
      <div className="pointer-events-none fixed bottom-[10vh] left-0 right-0 z-20 h-8 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
}
