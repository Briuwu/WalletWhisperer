"use client";

import { useChat } from "@ai-sdk/react";
import Image from "next/image";
import Markdown from "react-markdown";
import { useEffect, useRef } from "react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hey there! I'm WalletWhisperer, your friendly AI personal finance coach here to help you navigate the wild world of money.",
      },
    ],
  });

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleEndSession = async () => {
    const id = generateId();
    const messagesData = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    startTransition(async () => {
      try {
        const result = await endSession(id, messagesData);

        if (result.success) {
          toast.success(result.message || "Session ended successfully!");
          router.push("/home/history");
        } else {
          toast.error("Failed to end session. Please try again.");
        }
      } catch (error) {
        // Handle specific error types
        if (error instanceof Error) {
          const errorMessage = error.message;

          // Handle specific error codes
          if (errorMessage.includes("AUTH_ERROR")) {
            toast.error("Authentication error. Please log in again.");
            // Optionally redirect to login
            // router.push("/login");
          } else if (errorMessage.includes("DUPLICATE_SESSION")) {
            toast.error("This session already exists. Please try again.");
          } else if (errorMessage.includes("VALIDATION_ERROR")) {
            toast.error("Invalid session data. Please try again.");
          } else if (errorMessage.includes("DB_ERROR")) {
            toast.error("Database error. Please try again later.");
          } else {
            toast.error("An unexpected error occurred. Please try again.");
          }
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }

        console.error("Error ending session:", error);
      }
    });
  };

  return (
    <div className="flex h-full flex-col">
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-lg">
            <LoaderPinwheel className="h-5 w-5 animate-spin text-emerald-500" />
            <p className="text-sm font-medium">Ending session...</p>
          </div>
        </div>
      )}

      {/* Chat container with flexible height */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-2 pt-4 pb-24 md:px-4">
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {message.role === "assistant" && (
                  <div className="hidden h-10 w-10 shrink-0 overflow-hidden rounded-full border sm:flex sm:h-12 sm:w-12 sm:items-center sm:justify-center">
                    <Image
                      src={whisperer || "/placeholder.svg"}
                      alt="WalletWhisperer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div
                  className={cn(
                    "prose prose-sm dark:prose-invert sm:prose-base rounded-2xl px-4 py-3 text-sm sm:text-base",
                    message.role === "user"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800",
                    message.role === "user"
                      ? "rounded-tr-none"
                      : "rounded-tl-none",
                    "max-w-[75%] sm:max-w-[70%] md:max-w-[65%]",
                  )}
                >
                  <Markdown>{message.content}</Markdown>
                </div>

                {message.role === "user" && (
                  <div className="hidden h-10 w-10 shrink-0 overflow-hidden rounded-full border bg-gray-50 sm:flex sm:h-12 sm:w-12 sm:items-center sm:justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator for upcoming message */}
            {status !== "streaming" && status !== "ready" && (
              <div className="flex items-start justify-start gap-3">
                <div className="hidden h-10 w-10 shrink-0 overflow-hidden rounded-full border sm:flex sm:h-12 sm:w-12 sm:items-center sm:justify-center">
                  <Image
                    src={whisperer || "/placeholder.svg"}
                    alt="WalletWhisperer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex max-w-[75%] items-center gap-2 rounded-2xl rounded-tl-none bg-gray-100 px-4 py-3 sm:max-w-[70%] md:max-w-[65%] dark:bg-gray-800">
                  <span className="text-sm sm:text-base">
                    WalletWhisperer is thinking
                  </span>
                  <span className="flex space-x-1">
                    <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:0ms]"></span>
                    <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:150ms]"></span>
                    <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:300ms]"></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input form - fixed at bottom with responsive padding */}
      <div className="bg-opacity-90 dark:bg-opacity-90 fixed right-0 bottom-0 left-0 bg-white p-3 backdrop-blur-sm sm:p-4 dark:bg-gray-950">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Input
                placeholder="Type your message..."
                className="h-12 w-full rounded-full border-gray-300 pr-12 pl-4 text-base focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700"
                value={input}
                onChange={handleInputChange}
                disabled={status !== "ready"}
                autoFocus
              />
              <Button
                type="submit"
                disabled={status !== "ready"}
                className="absolute top-1/2 right-1 h-10 w-10 -translate-y-1/2 rounded-full p-0"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex justify-between">
              <EndSession
                status={status}
                handleEndSession={handleEndSession}
                isPending={isPending}
              />
              <div className="text-xs text-gray-500">
                {status === "ready" ? "Ready to chat" : "Processing..."}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
