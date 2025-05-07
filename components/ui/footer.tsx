import Link from "next/link";
import { Github, Globe, Shield, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="text-muted-foreground w-full border-t py-8">
      <div className="px-5">
        <div className="mx-auto flex max-w-xl justify-between">
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Legal</h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="/privacy"
                className="hover:text-foreground flex items-center space-x-2"
              >
                <Shield className="h-4 w-4" />
                <span>Privacy Policy</span>
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>Terms of Service</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Connect</h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="https://brianmillonte.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground flex items-center space-x-2"
              >
                <Globe className="h-4 w-4" />
                <span>Portfolio</span>
              </Link>
              <Link
                href="https://github.com/Briuwu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground flex items-center space-x-2"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center">
          <p>© {new Date().getFullYear()} AI Finance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
