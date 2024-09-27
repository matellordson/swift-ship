import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";
export function CustomerChatButton() {
  return (
    <div className="border">
      <Button
        variant={"outline"}
        size={"icon"}
        className="fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-transparent shadow-lg backdrop-blur transition-shadow duration-300 hover:shadow-xl"
      >
        <MessageSquareText className="h-6 w-6" />
      </Button>
    </div>
  );
}
