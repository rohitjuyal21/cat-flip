import React from "react";

export default function TimeProgressBar({
  value,
  totalTime,
}: {
  value: number;
  totalTime: number;
}) {
  const percentage = (value / totalTime) * 100;
  const barColor =
    percentage > 50
      ? "bg-lime-500"
      : percentage > 40
        ? "bg-yellow-500"
        : percentage > 20
          ? "bg-amber-600"
          : "bg-red-500";

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-[10px]">Time Left</span>
        <span className="text-xs">{value} seconds</span>
      </div>

      <div className="relative h-8 w-72 p-1 before:absolute before:-inset-x-1 before:inset-y-0 before:border-x-4 before:border-black after:absolute after:inset-x-0 after:-inset-y-1 after:border-y-4 after:border-black">
        <div
          style={{
            width: `${percentage}%`,
          }}
          className={`h-full ${barColor}`}
        ></div>
      </div>
    </div>
  );
}
