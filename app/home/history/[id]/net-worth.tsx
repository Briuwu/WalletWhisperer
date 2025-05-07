import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { WalletWhispererReportSchema } from "@/app/actions/reports/schema";

type NetWorthProps = {
  netWorth?: z.infer<typeof WalletWhispererReportSchema>["netWorth"];
  currency: string;
};

export function NetWorth({ netWorth, currency = "USD" }: NetWorthProps) {
  // Check if netWorth data exists
  if (
    !netWorth ||
    netWorth.total === undefined ||
    netWorth.changeSinceLast === undefined
  ) {
    return (
      <div className="bg-card text-card-foreground rounded-xl border p-6 text-center shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <Wallet className="h-8 w-8 text-neutral-400" />
          <p className="text-lg font-medium">Net Worth Data Unavailable</p>
          <p className="text-sm text-neutral-500">
            Net worth tracking is not available for this session.
          </p>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Wallet className="h-5 w-5" />
        <p className="text-lg font-bold">Net Worth Overview</p>
      </div>

      <div className="grid gap-4">
        {/* Total Net Worth Card */}
        <div className="rounded-xl border border-emerald-500 p-4 shadow-sm">
          <p className="text-sm text-neutral-500">Total Net Worth</p>
          <p className="text-2xl font-bold">{formatCurrency(netWorth.total)}</p>
          <div className="mt-2 flex items-center gap-2">
            {netWorth.changeSinceLast >= 0 ? (
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={cn(
                "text-sm",
                netWorth.changeSinceLast >= 0
                  ? "text-emerald-500"
                  : "text-red-500",
              )}
            >
              {netWorth.changeSinceLast >= 0 ? "+" : ""}
              {formatCurrency(netWorth.changeSinceLast)} since last session
            </span>
          </div>
        </div>

        {/* Assets Breakdown */}
        <div className="rounded-xl border p-4 shadow-sm">
          <p className="mb-3 font-medium">Assets</p>
          {!netWorth.assetBreakdown || netWorth.assetBreakdown.length === 0 ? (
            <p className="text-sm text-neutral-500">No asset data available</p>
          ) : (
            <div className="space-y-3">
              {netWorth.assetBreakdown.map((asset, idx) => {
                if (
                  !asset.type ||
                  asset.value === undefined ||
                  asset.percentageOfTotal === undefined
                ) {
                  return null;
                }
                return (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{asset.type}</p>
                      <p className="text-xs text-neutral-500">
                        {formatPercentage(asset.percentageOfTotal)} of total
                      </p>
                    </div>
                    <p className="font-medium">{formatCurrency(asset.value)}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Liabilities Breakdown */}
        <div className="rounded-xl border p-4 shadow-sm">
          <p className="mb-3 font-medium">Liabilities</p>
          {!netWorth.liabilityBreakdown ||
          netWorth.liabilityBreakdown.length === 0 ? (
            <p className="text-sm text-neutral-500">
              No liability data available
            </p>
          ) : (
            <div className="space-y-3">
              {netWorth.liabilityBreakdown.map((liability, idx) => {
                if (
                  !liability.type ||
                  liability.value === undefined ||
                  liability.percentageOfTotal === undefined
                ) {
                  return null;
                }
                return (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{liability.type}</p>
                      <p className="text-xs text-neutral-500">
                        {formatPercentage(liability.percentageOfTotal)} of total
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatCurrency(liability.value)}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
