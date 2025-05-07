"use client";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-red-50">
          <h2 className="mb-4 text-2xl font-bold text-red-600">
            Something went wrong!
          </h2>
          <p className="mb-4 text-gray-700">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
          <button
            className="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            onClick={() => reset()}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
