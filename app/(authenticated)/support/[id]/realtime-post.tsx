"use client";

import { supabase } from "@/src/db/supabase";
import { useEffect, useState, useRef, useCallback } from "react";

export const revalidate = 0;

interface ChatMessage {
  id: string;
  user_id: string;
  customer_message: string | null;
  admin_message: string | null;
}

export default function RealtimePosts({
  serverPosts,
}: {
  serverPosts: ChatMessage[];
}) {
  const [chat, setChats] = useState<ChatMessage[]>(serverPosts);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("realtime chat")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chat" },
        (payload) => {
          setChats((prevChat) => [...prevChat, payload.new as ChatMessage]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chat, scrollToBottom]);

  return (
    <div
      ref={scrollRef}
      className="flex h-full flex-col space-y-4 overflow-y-auto px-4 pb-7 pt-10"
      style={{ maxHeight: "calc(100vh - 130px)" }} // Adjust this value as needed
    >
      {chat.map((message) => (
        <div key={message.id}>
          {message.admin_message && (
            <div className="-mt-3 flex justify-start">
              <div className="max-w-[75%] rounded-xl border bg-primary-foreground px-3 py-2 text-sm shadow-sm sm:text-base">
                {message.admin_message}
              </div>
            </div>
          )}
          {message.customer_message && (
            <div className="-mt-3 flex justify-end">
              <div className="max-w-[75%] rounded-xl bg-primary px-3 py-2 text-sm text-primary-foreground shadow-sm sm:text-base">
                {message.customer_message}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
