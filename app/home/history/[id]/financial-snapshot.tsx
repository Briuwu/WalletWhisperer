"use client";

import { WalletWhispererReportSchema } from "@/app/actions/reports/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUp,
  ArrowDownCircle,
  ArrowUpCircle,
  CreditCard,
} from "lucide-react";
import { z } from "zod";

type Props = {
  financialSnapshot: z.infer<
    typeof WalletWhispererReportSchema
  >["financialSnapshot"];
};

export function FinancialSnapshot({ financialSnapshot }: Props) {
  // Calculate savings amount
  const savingsAmount =
    financialSnapshot.monthlyIncome -
    financialSnapshot.fixedExpenses -
    financialSnapshot.variableExpenses;

  // Format currency using the dynamic currency value
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: financialSnapshot.currency || "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get appropriate currency icon based on currency type
  const getCurrencyIcon = () => {
    switch (financialSnapshot.currency) {
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "JPY":
        return "¥";
      case "PHP":
        return "₱";
      default:
        return "$"; // Default to dollar sign
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Financial Snapshot</CardTitle>
        <CardDescription>
          Monthly income allocation and savings rate (
          {financialSnapshot.currency})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Income and Savings Rate */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <span className="flex h-4 w-4 items-center justify-center font-medium">
                {getCurrencyIcon()}
              </span>
              Monthly Income
            </div>
            <div className="text-2xl font-bold">
              {formatCurrency(financialSnapshot.monthlyIncome)}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4" />
              Savings Rate
            </div>
            <div className="text-2xl font-bold text-emerald-500">
              {financialSnapshot.currentSavingsRatePercent}%
            </div>
          </div>
        </div>

        {/* Expenses Breakdown */}
        <div className="space-y-3 rounded-lg border p-4">
          <h3 className="mb-3 text-sm font-medium">Monthly Breakdown</h3>
          <div className="flex items-center justify-between border-b py-2">
            <div className="flex items-center gap-2">
              <ArrowDownCircle className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Fixed Expenses</span>
            </div>
            <span className="font-medium">
              {formatCurrency(financialSnapshot.fixedExpenses)}
            </span>
          </div>
          <div className="flex items-center justify-between border-b py-2">
            <div className="flex items-center gap-2">
              <ArrowUpCircle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Variable Expenses</span>
            </div>
            <span className="font-medium">
              {formatCurrency(financialSnapshot.variableExpenses)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="text-sm">Monthly Savings</span>
            </div>
            <span className="font-medium text-emerald-500">
              {formatCurrency(savingsAmount)}
            </span>
          </div>
        </div>

        {/* Percentages */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md bg-orange-100 p-3 dark:bg-orange-950/30">
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {Math.round(
                (financialSnapshot.fixedExpenses /
                  financialSnapshot.monthlyIncome) *
                  100,
              )}
              %
            </div>
            <div className="text-muted-foreground text-xs">Fixed</div>
          </div>
          <div className="rounded-md bg-yellow-100 p-3 dark:bg-yellow-950/30">
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              {Math.round(
                (financialSnapshot.variableExpenses /
                  financialSnapshot.monthlyIncome) *
                  100,
              )}
              %
            </div>
            <div className="text-muted-foreground text-xs">Variable</div>
          </div>
          <div className="rounded-md bg-emerald-100 p-3 dark:bg-emerald-950/30">
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {financialSnapshot.currentSavingsRatePercent}%
            </div>
            <div className="text-muted-foreground text-xs">Savings</div>
          </div>
        </div>

        {/* Notable Debts */}
        <div className="pt-2">
          <div className="mb-2 flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <h3 className="text-sm font-medium">Notable Debts</h3>
          </div>
          {financialSnapshot.notableDebts.length > 0 ? (
            <div className="space-y-3">
              {financialSnapshot.notableDebts.map((debt, index) => (
                <div key={index} className="rounded-md border p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">{debt.type}</span>
                    <span className="text-sm font-bold">
                      {formatCurrency(debt.amount)}
                    </span>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Interest Rate:{" "}
                    <span className="font-medium text-red-500">
                      {debt.interestRate}%
                    </span>
                  </div>
                </div>
              ))}
              <div className="text-muted-foreground mt-2 text-xs">
                Total Debt:{" "}
                {formatCurrency(
                  financialSnapshot.notableDebts.reduce(
                    (sum, debt) => sum + debt.amount,
                    0,
                  ),
                )}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm italic">
              No notable debts - great job!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
