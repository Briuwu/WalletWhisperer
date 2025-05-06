import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import whisperer from "@/public/whisperer.png";

export const CTASection = () => {
  return (
    <section
      className="w-full space-y-10 py-12 md:py-24 lg:py-32 xl:py-48"
      id="cta"
    >
      <div className="border bg-gradient-to-b from-violet-50 to-white py-12 md:py-24">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Image
            src={whisperer}
            width={200}
            height={200}
            alt="Start Your Journey"
            className="mb-8"
          />
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Let&apos;s Make Money Make Sense
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              WalletWhisperer is ready to chat whenever you are.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button
              className="rounded-full bg-violet-600 px-8 py-6 text-lg text-white hover:bg-violet-700"
              asChild
            >
              <Link href="/home">
                Launch WalletWhisperer <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
