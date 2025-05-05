import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import whisperer from "@/public/whisperer.png";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const messages: Message[] = [
  {
    role: "assistant",
    content: "Hi! I'm here to assist you.",
  },
  {
    role: "user",
    content: "Great! I need help with budgeting.",
  },
];

export default function ChatPage() {
  return (
    <main className="relative mx-auto min-h-dvh max-w-2xl px-5 py-10">
      <div className="flex max-h-[500px] flex-col gap-4 overflow-y-auto">
        {/* Chat messages */}
        <div className="flex flex-col gap-4 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-3 text-sm",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {message.role === "assistant" && (
                <div className="w-12 rounded-full border p-2">
                  <Image src={whisperer} alt="WalletWhisperer" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-sm rounded-md p-3",
                  message.role === "user"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200",
                )}
              >
                <p>{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="grid h-12 w-12 place-content-center rounded-full border p-2">
                  <User />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <form className="absolute right-5 bottom-10 left-5 space-y-3">
        <Input
          placeholder="type your message..."
          className="h-12 w-full rounded"
        />
        <div className="flex items-center justify-between">
          <Button type="button" className="rounded-full" variant="secondary">
            <X /> end session
          </Button>
          <Button type="submit" className="rounded-full">
            <Send />
          </Button>
        </div>
      </form>
    </main>
  );
}
