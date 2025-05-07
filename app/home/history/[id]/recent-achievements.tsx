import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { WalletWhispererReportSchema } from "@/app/actions/reports/schema";

type RecentAchievementsProps = {
  achievements?: z.infer<
    typeof WalletWhispererReportSchema
  >["recentAchievements"];
};

export function RecentAchievements({ achievements }: RecentAchievementsProps) {
  // Check if achievements exists and is an array
  if (!achievements || !Array.isArray(achievements)) {
    return (
      <div className="bg-card text-card-foreground rounded-xl border p-6 text-center shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <Trophy className="h-8 w-8 text-neutral-400" />
          <p className="text-lg font-medium">No Achievements Data</p>
          <p className="text-sm text-neutral-500">
            Achievement tracking is not available for this session.
          </p>
        </div>
      </div>
    );
  }

  // Check if achievements array is empty
  if (achievements.length === 0) {
    return (
      <div className="bg-card text-card-foreground rounded-xl border p-6 text-center shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <Trophy className="h-8 w-8 text-neutral-400" />
          <p className="text-lg font-medium">No Recent Achievements</p>
          <p className="text-sm text-neutral-500">
            Keep working on your financial goals to earn achievements!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5" />
        <p className="text-lg font-bold">Recent Achievements</p>
      </div>
      <div className="grid gap-4">
        {achievements.map((achievement, idx) => {
          // Validate achievement data
          if (!achievement.achievement || !achievement.impact) {
            return null;
          }

          return (
            <div
              key={idx}
              className={cn(
                "rounded-xl border p-4 shadow-sm",
                idx % 2 === 0 ? "border-emerald-500" : "border-blue-500",
              )}
            >
              <div className="flex items-start justify-between">
                <p className="max-w-52 font-medium">
                  {achievement.achievement}
                </p>
                <span className="text-sm text-neutral-500">
                  {achievement.date
                    ? new Date(achievement.date).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-600">
                {achievement.impact}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
