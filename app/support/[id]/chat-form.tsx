"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, SendHorizontal } from "lucide-react";

interface ChatFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function ChatForm({ onSubmit }: ChatFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-3 flex w-full items-center justify-center gap-x-2"
    >
      <Input
        name="message"
        placeholder="Send a message..."
        className="max-h-[60px] min-h-[40px] resize-none rounded-full bg-muted py-6"
      />
      <Button
        type="submit"
        size="sm"
        className="h-[50px] w-[50px] rounded-full bg-primary text-primary-foreground active:opacity-80"
      >
        <SendHorizontal className="" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
