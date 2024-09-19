"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChatFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function ChatForm({ onSubmit }: ChatFormProps) {
  const [isDisabled, setIsDisabled] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (buttonRef.current) {
    buttonRef.current.disabled = true;
    buttonRef.current.innerHTML = '<span class="loading"></span>';
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.disabled = true;
        buttonRef.current.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-20"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg><span class="sr-only">Send message</span>';
      }
    }, 1000);
  }

  const scrollToBottom = () => {
    const scrollArea = document.getElementById("chat-scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit(formData);

    if (textareaRef.current) textareaRef.current.value = "";

    setTimeout(scrollToBottom, 100);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsDisabled(e.target.value.trim() === "");
    adjustTextareaHeight(e.target);
  };

  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    const newHeight = Math.min(element.scrollHeight, 3 * 20); // Assuming 20px per row
    element.style.height = `${newHeight}px`;
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mt-3 flex items-center justify-center gap-3 gap-x-2"
    >
      <Textarea
        ref={textareaRef}
        name="message"
        placeholder="Say something..."
        onChange={handleTextareaChange}
        className="max-h-[60px] min-h-[40px] resize-none"
        rows={1}
      />
      <Button
        type="submit"
        size="sm"
        className="h-[40px] w-[40px] rounded-full bg-primary text-primary-foreground active:opacity-80"
        disabled={isDisabled}
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
