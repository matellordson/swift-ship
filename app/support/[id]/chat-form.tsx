"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";

interface ChatFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function ChatForm({ onSubmit }: ChatFormProps) {
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit(formData);
    setMessage("");
  };

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [message]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mx-3 flex w-full items-center justify-center gap-x-2"
    >
      <Input
        name="message"
        placeholder="Send a message..."
        className="max-h-[60px] min-h-[40px] resize-none rounded-full bg-muted"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        type="submit"
        size="sm"
        className="h-[50px] w-[50px] rounded-full bg-primary text-primary-foreground active:opacity-80"
        disabled={!message.trim()}
      >
        <SendHorizontal className="" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
