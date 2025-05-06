import { getSessions } from "@/app/actions/chat";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function HistoryPage() {
  const sessions = await getSessions();
  return (
    <div className="space-y-10 py-10">
      <div>
        <h1 className="text-2xl font-bold">past sessions</h1>
        <p className="text-neutral-500">your previous sessions</p>
      </div>
      <div className="space-y-5">
        {sessions.length > 0 ? (
          sessions.map((session, idx) => (
            <Link
              href={`/home/history/${session.session_id}`}
              key={session.session_id}
              className="block space-y-5 rounded-md border bg-white p-5 hover:bg-neutral-50"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">session {idx + 1}</p>
                <p className="text-sm opacity-75">
                  {new Date(session.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="block truncate text-sm text-neutral-500 lowercase">
                  {session.session_goal ? session.session_goal : "..."}
                </p>
                <ChevronRight />
              </div>
            </Link>
          ))
        ) : (
          <div className="space-y-5 text-center text-lg font-bold text-gray-500">
            <p>No chat history available.</p>
            <Button asChild>
              <Link href="/chat">begin session</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
