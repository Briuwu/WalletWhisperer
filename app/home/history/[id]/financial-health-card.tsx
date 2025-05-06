import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { WalletWhispererReportSchema } from "@/app/actions/reports/schema";
import { z } from "zod";

type Props = {
  financialHealthScore: z.infer<
    typeof WalletWhispererReportSchema
  >["financialHealthScore"];
};

export function FinancialHealthCard({ financialHealthScore }: Props) {
  // Determine color based on grade
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "text-green-600";
      case "B":
        return "text-emerald-500";
      case "C":
        return "text-yellow-500";
      case "D":
        return "text-orange-500";
      default:
        return "text-red-500";
    }
  };

  const gradeColor = getGradeColor(financialHealthScore.grade);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-xl">
          Financial Health Score
          <span className={`text-3xl font-bold ${gradeColor}`}>
            {financialHealthScore.grade}
          </span>
        </CardTitle>
        <CardDescription>Your current financial standing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Score</span>
            <span className="text-sm font-medium">
              {financialHealthScore.score}/100
            </span>
          </div>
          <Progress
            value={financialHealthScore.score}
            className="h-2"
            indicatorClassName={
              financialHealthScore.grade === "B" ? "bg-emerald-500" : ""
            }
          />
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">Key Factors</h3>
          <ul className="space-y-2">
            {financialHealthScore.rationale.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
