"use client";
import { X } from "lucide-react";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  const handleEndSessionClick = async () => {
    await handleEndSession();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <Button onClick={handleEndSessionClick} disabled={isPending}>
            generate report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
