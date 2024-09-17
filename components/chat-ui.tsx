import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { handleSentMessage } from "@/app/_action/send-message";

export default function ChatUI() {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedData = input.trim();
    if (trimmedData) {
      // Here you would typically handle the message submission
      console.log("Message submitted:", input.trim());
      try {
        const formData = new FormData();
        formData.append("message", trimmedData);
        handleSentMessage(formData);
        // Clear the input field
        setInput("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mx-auto flex h-[600px] max-w-md flex-col overflow-hidden rounded-lg border">
      <ScrollArea className="flex-grow p-4">
        {/* {messages.map((message) => (

        ))} */}
      </ScrollArea>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow"
            name="message"
          />
          <Button type="submit" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
