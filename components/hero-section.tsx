import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

import chatUI from "@/public/chat-ui.png";

export const HeroSection = () => {
  return (
    <section className="w-full space-y-10 py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Let&apos;s Talk Money—
            <br />
            Without the Stress 💸
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl">
            Chat with WalletWhisperer, your chill AI finance coach who helps you
            budget smarter, save faster, and hit your goals—no jargon, no
            judgment.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button
            asChild
            className="rounded-full bg-violet-600 px-8 py-6 text-lg text-white hover:bg-violet-700"
          >
            <Link href="/home">
              Start Chatting <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="border shadow-xl">
        <Image src={chatUI} alt="" />
      </div>
    </section>
  );
};
