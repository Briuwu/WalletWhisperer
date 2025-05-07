import { generateReport } from "@/app/actions/reports";
import { WalletWhispererReportSchema } from "@/app/actions/reports/schema";
import {
  ArrowRightCircle,
  Eye,
  Goal,
  MessagesSquare,
  NotebookText,
  ThumbsUp,
  User,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { deleteSession } from "@/app/actions/chat";
import { redirect } from "next/navigation";
import { DeleteSessionDialog } from "./delete-session-dialog";
import Link from "next/link";
import { FinancialHealthCard } from "./financial-health-card";
import { FinancialSnapshot } from "./financial-snapshot";
import { RecentAchievements } from "./recent-achievements";
import { NetWorth } from "./net-worth";
import Markdown from "react-markdown";
import whisperer from "@/public/whisperer.png";
import ForecastsAndProjections from "./forecasts-and-projections";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SpecificHistoryPage({ params }: Props) {
  const { id } = await params;

  const reports = await generateReport(id);

  async function handleDelete() {
    "use server";
    await deleteSession(id);
    redirect("/home/history");
  }

  if (!reports) {
    return (
      <div className="space-y-2 text-center">
        <p className="text-lg font-bold">No report available.</p>
        <p className="text-sm text-neutral-500">
          It seems like the session data was not enough to generate a report.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/chat"
            className="block w-fit rounded-full bg-emerald-500 px-3 py-2 text-white"
          >
            start new session
          </Link>
          <DeleteSessionDialog onDelete={handleDelete} variant="error" />
        </div>
      </div>
    );
  }

  if (reports.session_goal === "") {
    return (
      <div className="space-y-2 text-center">
        <p className="text-lg font-bold">No report available.</p>
        <p className="text-sm text-neutral-500">
          It seems like the session data was not enough to generate a report.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/chat"
            className="block w-fit rounded-full bg-emerald-500 px-3 py-2 text-white"
          >
            start new session
          </Link>
          <DeleteSessionDialog onDelete={handleDelete} variant="error" />
        </div>
      </div>
    );
  }

  const reportsData = reports.reports as z.infer<
    typeof WalletWhispererReportSchema
  >;

  const messageHistory = reports.history
    ? (JSON.parse(reports.history as string) as {
        role: "assistant" | "user";
        content: string;
      }[])
    : [];

  return (
    <div className="space-y-15 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">session rundown</h1>
          <p className="text-neutral-500">
            your generated insightful, and user-friendly post-session finance
            reports
          </p>
        </div>
        <DeleteSessionDialog onDelete={handleDelete} />
      </div>
      <div className="grid gap-5 lg:grid-cols-[.5fr_1fr]">
        <div className="space-y-3 rounded-md border border-blue-500 p-4">
          <Goal />
          <p className="text-neutral-600">{reportsData.sessionGoal}</p>
        </div>

        <div className="space-y-3 rounded-md border border-green-500 p-4">
          <NotebookText />
          <p className="text-neutral-600">
            {reportsData.sessionSummary.userIntent}
          </p>

          <p className="text-sm font-bold">topics discussed:</p>
          <ul className="flex flex-wrap gap-2">
            {reportsData.sessionSummary.topicsDiscussed.map((topic, idx) => (
              <li
                key={idx}
                className="rounded-full border px-3 py-2 text-sm text-neutral-600"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-3 border-l-4 pl-2">
        <div className="flex items-center gap-2">
          <Eye />
          <p className="text-lg font-bold">key observations:</p>
        </div>
        <ul className="list-disc pl-5">
          {reportsData.keyObservations.map((observation, idx) => (
            <li key={idx} className="text-neutral-600">
              {observation}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <ThumbsUp />
          <p className="text-lg font-bold">suggestions:</p>
        </div>
        <ul className="space-y-2">
          {reportsData.smartSuggestions.map((suggestion, idx) => (
            <li
              key={idx}
              className="rounded border p-3 odd:border-violet-500 even:border-amber-500"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <FinancialHealthCard
          financialHealthScore={reportsData.financialHealthScore}
        />
        <FinancialSnapshot financialSnapshot={reportsData.financialSnapshot} />
        <ForecastsAndProjections
          forecastsAndProjections={reportsData.forecastsAndProjections}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <RecentAchievements achievements={reportsData.recentAchievements} />
        <NetWorth
          netWorth={reportsData.netWorth}
          currency={reportsData.financialSnapshot.currency}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MessagesSquare />
          <p className="text-lg font-bold">message history</p>
        </div>
        <div className="rounded-xl border p-2">
          <div className="flex max-h-[300px] flex-col gap-4 overflow-y-auto p-4">
            {messageHistory.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3 text-sm",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {message.role === "assistant" && (
                  <div className="w-10 rounded-full border p-2">
                    <Image src={whisperer} alt="WalletWhisperer" />
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-sm rounded-md p-3 text-xs",
                    message.role === "user"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-200",
                  )}
                >
                  <Markdown>{message.content}</Markdown>
                </div>
                {message.role === "user" && (
                  <div className="grid h-10 w-10 place-content-center rounded-full border p-2">
                    <User className="w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <ArrowRightCircle />
          <p className="text-lg font-bold">next step focus</p>
        </div>
        <p className="text-neutral-600">{reportsData.nextStepsPrompt}</p>
      </div>
    </div>
  );
}
