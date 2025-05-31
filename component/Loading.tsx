import React from "react";

export default function Loading() {
  return (
    <div className="space-y-2">
      <p className="text-center text-xs uppercase">Loading...</p>
      <div className="relative h-6 w-56 p-1 before:absolute before:-inset-x-1 before:inset-y-0 before:border-x-4 before:border-black after:absolute after:inset-x-0 after:-inset-y-1 after:border-y-4 after:border-black">
        <div className="h-full w-[80%] bg-lime-500"></div>
      </div>
    </div>
  );
}
