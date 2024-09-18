import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { SendIcon } from "lucide-react";
import handleCustomerSend from "@/app/_action/customer_send";
import { supabase } from "@/src/db/supabase";
import RealtimePosts from "./realtime-post";
import { FormEvent, SyntheticEvent } from "react";

export const revalidate = 0;

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
    <Card className="mx-auto max-w-3xl">
      <ScrollArea className="flex-grow p-4">
        <CardContent>
          <div className="">
            <RealtimePosts serverPosts={data ?? []} />

            {/* <div className="flex justify-start">
                <p className="mt-4 w-fit rounded-r-xl rounded-bl-xl border bg-primary-foreground px-3 py-2 leading-none">
                  Hello, how are you?
                </p>
              </div> */}
            {/* <div className="flex justify-end">
                <p className="mt-4 w-fit rounded-l-xl rounded-br-xl border bg-primary px-3 py-2 leading-none text-primary-foreground">
                  Am fine, how are doing?
                </p>
              </div> */}
          </div>
        </CardContent>
      </ScrollArea>
      <CardFooter className="border-t">
        <form
          // onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}
          className="mt-3 flex items-center justify-center gap-x-2"
        >
          <Input name="message" placeholder="Say something..." />
          <Button formAction={handleCustomerSend} size={"icon"}>
            <SendIcon />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
