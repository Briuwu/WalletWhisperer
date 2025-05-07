"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarClock,
  Plane,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  BanknoteIcon,
} from "lucide-react";
import { z } from "zod";
import { WalletWhispererReportSchema } from "@/app/actions/reports/schema";

type Props = {
  forecastsAndProjections?: z.infer<
    typeof WalletWhispererReportSchema
  >["forecastsAndProjections"];
};

export default function ForecastsAndProjections({
  forecastsAndProjections,
}: Props) {
  const [activeTab, setActiveTab] = useState("savings");

  // Check if the entire data is missing
  if (!forecastsAndProjections) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Forecasts & Projections</CardTitle>
          <CardDescription>
            Financial goals and debt payoff timeline projections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <BanknoteIcon className="h-12 w-12 text-neutral-300" />
            <p className="mt-4 text-lg font-medium">No Projections Available</p>
            <p className="text-sm text-neutral-500">
              We don&apos;t have enough information to generate financial
              projections for this session.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    } catch {
      return "Date not available";
    }
  };

  // Calculate days remaining until target date
  const calculateDaysRemaining = (targetDate: string) => {
    try {
      const target = new Date(targetDate);
      const today = new Date();
      const diffTime = target.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch {
      return 0;
    }
  };

  // Calculate progress percentage towards target date
  const calculateDateProgress = () => {
    try {
      const targetDate = new Date(
        forecastsAndProjections.vacationSavingsGoal.targetDate,
      );
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);

      const totalDuration = targetDate.getTime() - startDate.getTime();
      const elapsedDuration = new Date().getTime() - startDate.getTime();

      return Math.min(Math.round((elapsedDuration / totalDuration) * 100), 100);
    } catch {
      return 0;
    }
  };

  // Format currency using the dynamic currency value
  const formatCurrency = (amount: number) => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: forecastsAndProjections.currency || "USD",
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      return "N/A";
    }
  };

  // Get appropriate currency icon based on currency type
  const getCurrencyIcon = () => {
    switch (forecastsAndProjections.currency) {
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "JPY":
        return "¥";
      case "PHP":
        return "₱";
      default:
        return "$";
    }
  };

  const daysRemaining = calculateDaysRemaining(
    forecastsAndProjections.vacationSavingsGoal?.targetDate || "",
  );
  const dateProgress = calculateDateProgress();

  // Check if savings goal data exists
  const hasSavingsGoalData =
    forecastsAndProjections.vacationSavingsGoal?.amount &&
    forecastsAndProjections.vacationSavingsGoal?.targetDate;

  // Check if debt projection data exists
  const hasDebtProjectionData =
    forecastsAndProjections.debtPayoffProjection?.currentPlan &&
    forecastsAndProjections.debtPayoffProjection?.acceleratedPlan;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Forecasts & Projections</CardTitle>
        <CardDescription>
          Your financial goals and debt payoff timeline (
          {forecastsAndProjections.currency || "USD"})
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs
          defaultValue="savings"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="savings">Savings Goal</TabsTrigger>
            <TabsTrigger value="debt">Debt Payoff</TabsTrigger>
          </TabsList>

          {/* Vacation Savings Goal Tab */}
          <TabsContent value="savings" className="p-6">
            {!hasSavingsGoalData ? (
              <div className="flex flex-col items-center justify-center py-6">
                <Plane className="h-8 w-8 text-neutral-300" />
                <p className="mt-2 text-sm font-medium">No Savings Goal Set</p>
                <p className="text-center text-xs text-neutral-500">
                  No savings goal information was discussed in this session.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Vacation Savings Goal</h3>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Target Amount
                    </span>
                    <span className="font-bold">
                      {formatCurrency(
                        forecastsAndProjections.vacationSavingsGoal.amount,
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Target Date
                    </span>
                    <span className="font-medium">
                      {formatDate(
                        forecastsAndProjections.vacationSavingsGoal.targetDate,
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Projected Completion
                    </span>
                    <span className="font-medium">
                      {formatDate(
                        forecastsAndProjections.vacationSavingsGoal
                          .projectedCompletionDate,
                      )}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">{dateProgress}%</span>
                  </div>
                  <Progress value={dateProgress} className="h-2" />
                </div>

                <div className="flex items-center gap-2 rounded-md bg-slate-50 p-3 dark:bg-slate-900">
                  {forecastsAndProjections.vacationSavingsGoal.onTrack ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">On Track</p>
                        <p className="text-muted-foreground text-xs">
                          You&apos;re projected to reach your goal{" "}
                          {daysRemaining} days ahead of schedule!
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="text-sm font-medium">Off Track</p>
                        <p className="text-muted-foreground text-xs">
                          You&apos;re projected to miss your target date by{" "}
                          {Math.abs(daysRemaining)} days.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Debt Payoff Projection Tab */}
          <TabsContent value="debt" className="p-6">
            {!hasDebtProjectionData ? (
              <div className="flex flex-col items-center justify-center py-6">
                <CreditCard className="h-8 w-8 text-neutral-300" />
                <p className="mt-2 text-sm font-medium">No Debt Projections</p>
                <p className="text-center text-xs text-neutral-500">
                  No debt-related information was discussed in this session.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-red-500" />
                  <h3 className="font-medium">Debt Payoff Projection</h3>
                </div>

                <div className="rounded-md border p-4">
                  <h4 className="mb-2 text-sm font-medium">Current Plan</h4>
                  <div className="mb-1 flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-slate-500" />
                    <span className="text-sm">
                      Estimated payoff in{" "}
                      {forecastsAndProjections.debtPayoffProjection.currentPlan}
                    </span>
                  </div>
                </div>

                <div className="rounded-md border bg-slate-50 p-4 dark:bg-slate-900">
                  <h4 className="mb-2 text-sm font-medium">Accelerated Plan</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        Extra monthly payment:{" "}
                        {formatCurrency(
                          forecastsAndProjections.debtPayoffProjection
                            .acceleratedPlan.extraPayment,
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        New payoff timeline:{" "}
                        {
                          forecastsAndProjections.debtPayoffProjection
                            .acceleratedPlan.newDuration
                        }
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex h-4 w-4 items-center justify-center text-xs font-bold text-green-500">
                        {getCurrencyIcon()}
                      </div>
                      <span className="text-sm">
                        Interest saved:{" "}
                        {formatCurrency(
                          forecastsAndProjections.debtPayoffProjection
                            .acceleratedPlan.interestSaved,
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Apply Accelerated Plan</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
