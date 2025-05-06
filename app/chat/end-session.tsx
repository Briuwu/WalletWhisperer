"use client";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Link from "next/link";

export const EndSession = ({
  status,
  handleEndSession,
  isPending,
}: {
  status: "ready" | "submitted" | "streaming" | "error";
  handleEndSession: () => void;
  isPending: boolean;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          disabled={status !== "ready"}
          className="rounded-full"
          variant="destructive"
        >
          <X /> end session
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to end this session?</DialogTitle>
          <DialogDescription>
            You will not be able to continue this session.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isPending} asChild variant="destructive">
            <Link href="/home"> go back (no save)</Link>
          </Button>
          <Button onClick={handleEndSession} disabled={isPending}>
            generate report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
