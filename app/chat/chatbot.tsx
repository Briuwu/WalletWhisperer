"use client";

import { useChat } from "@ai-sdk/react";
import Image from "next/image";
import Markdown from "react-markdown";

import { LoaderPinwheel, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import whisperer from "@/public/whisperer.png";
import { EndSession } from "./end-session";
import { generateId } from "ai";
import { useTransition } from "react";
import { toast } from "sonner";
import { endSession } from "@/app/actions/chat";
import { useRouter } from "next/navigation";

export const Chatbot = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hey there! I’m WalletWhisperer, your friendly AI personal finance coach here to help you navigate the wild world of money.",
      },
    ],
  });

  const handleEndSession = async () => {
    const id = generateId();
    const messagesData = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));
    startTransition(async () => {
      try {
        await endSession(id, messagesData);
        toast.success("Session ended successfully!");
        router.push("/home/history");
      } catch (error) {
        console.error("Error ending session:", error);
        toast.error("Error ending session. Please try again.");
      }
    });
  };

  return (
    <>
      {isPending && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <div className="grid min-h-[90dvh] place-content-center">
            <div className="flex items-center gap-3">
              <LoaderPinwheel className="animate-spin" />
              <p className="animate-pulse">Ending session...</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex max-h-[500px] flex-col gap-4 overflow-y-auto">
        {/* Chat messages */}
        <div className="flex flex-col gap-4 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 text-sm",
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
                <Markdown>{message.content}</Markdown>
              </div>
              {message.role === "user" && (
                <div className="grid h-12 w-12 place-content-center rounded-full border p-2">
                  <User />
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator for upcoming message */}
          {status !== "streaming" && status !== "ready" && (
            <div className="flex items-start justify-start gap-3 text-sm">
              <div className="w-12 rounded-full border p-2">
                <Image src={whisperer} alt="WalletWhisperer" />
              </div>
              <div className="flex max-w-sm items-center gap-2 rounded-md bg-gray-200 p-3">
                <span className="animate-pulse">
                  WalletWhisperer is thinking...
                </span>
                <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-emerald-500"></span>
              </div>
            </div>
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="absolute right-5 bottom-10 left-5 space-y-3"
      >
        <Input
          placeholder="type your message..."
          className="h-12 w-full rounded"
          value={input}
          onChange={handleInputChange}
          disabled={status !== "ready"}
          autoFocus
        />
        <div className="flex items-center justify-between">
          <EndSession
            status={status}
            handleEndSession={handleEndSession}
            isPending={isPending}
          />
          <Button
            type="submit"
            disabled={status !== "ready"}
            className="rounded-full"
          >
            <Send />
          </Button>
        </div>
      </form>
    </>
  );
};
