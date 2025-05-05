import Link from "next/link";
import { LoginForm } from "./login-form";
import Image from "next/image";

import whisperer from "@/public/whisperer.png";

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh content-center">
      <div className="mx-auto w-full max-w-sm text-center">
        <Image src={whisperer} alt="" className="mx-auto w-20 rounded-full" />
        <div>
          <p className="text-xl font-bold">ready when you are</p>
          <p className="text-lg">your AI-Powered Personal Finance Coach</p>
        </div>
        <LoginForm />
        <p className="hover:opacity-75">
          <Link href="/sign-up">don&apos;t have an account? sign up</Link>
        </p>
      </div>
    </main>
  );
}
