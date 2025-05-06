import Link from "next/link";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block text-xl font-bold">
              WalletWhisperer
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-3">
            <Button variant="default" size="sm" asChild>
              <Link href="/login">login</Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/sign-up">sign up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
