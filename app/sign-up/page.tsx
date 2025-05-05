import Link from "next/link";
import { SignUpForm } from "./signup-form";
import Image from "next/image";

import whisperer from "@/public/whisperer.png";

export default function SignUpPage() {
  return (
    <main className="grid min-h-dvh content-center">
      <div className="mx-auto w-full max-w-sm text-center">
        <Image src={whisperer} alt="" className="mx-auto w-20 rounded-full" />
        <div>
          <p className="text-xl font-bold">ready when you are</p>
          <p className="text-lg">your AI-Powered Personal Finance Coach</p>
        </div>
        <SignUpForm />
        <p className="hover:opacity-75">
          <Link href="/login">already have an account? log in</Link>
        </p>
      </div>
    </main>
  );
}
