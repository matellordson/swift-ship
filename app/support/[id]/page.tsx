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
    <div className="fixed bottom-0 left-0 right-0 top-0">
      <div className="flex h-screen flex-col">
        {/* Header */}
        <header className="flex h-[10vh] items-center justify-center bg-background/50 backdrop-blur-md">
          <h1 className="text-2xl font-bold">Transparent Header</h1>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="mx-auto max-w-4xl p-6">
              <h2 className="mb-4 text-xl font-semibold">Scrollable Content</h2>
              {[...Array(50)].map((_, i) => (
                <p key={i} className="mb-4">
                  This is paragraph {i + 1}. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.
                </p>
              ))}
            </div>
          </ScrollArea>
        </main>

        {/* Footer */}
        <footer className="flex h-[10vh] items-center justify-center bg-background/50 backdrop-blur-md">
          <p>Transparent Footer</p>
        </footer>

        {/* Gradient overlays for scroll indication */}
        <div className="pointer-events-none absolute left-0 right-0 top-[10vh] h-8 bg-gradient-to-b from-background to-transparent"></div>
        <div className="pointer-events-none absolute bottom-[10vh] left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent"></div>
      </div>
    </div>
  );
}
