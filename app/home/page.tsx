"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import whisperer from "@/public/whisperer.png";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid min-h-[90dvh] place-content-center gap-10">
      <Image src={whisperer} alt="" className="w-96" />
      <Button className="text-lg" asChild>
        <Link href="/chat">begin session</Link>
      </Button>
    </div>
  );
}
