"use client";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          disabled={status !== "ready"}
          className="rounded-full"
          variant="destructive"
        >
          <X /> end session
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to end this session?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will not be able to continue this session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} asChild>
            <Link href="/home"> go back (no save)</Link>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleEndSession} disabled={isPending}>
            generate report
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
