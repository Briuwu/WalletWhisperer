import { LoaderPinwheel } from "lucide-react";

export default function HistoryLoading() {
  return (
    <div className="grid min-h-[90dvh] place-content-center">
      <div className="flex items-center gap-3">
        <LoaderPinwheel className="animate-spin" />
        <p className="animate-pulse">Loading your history... Please wait.</p>
      </div>
    </div>
  );
}
