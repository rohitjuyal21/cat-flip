import React from "react";
import Image from "next/image";
import confetti from "@/public/images/confetti.png";
import clock from "@/public/images/clock.png";
export default function GameOverModal({
  timeLeft,
  score,
  handleSubmit,
  handlePlayAgain,
}: {
  timeLeft: number;
  score: number;
  handleSubmit: () => void;
  handlePlayAgain: () => void;
}) {
  const isWin = timeLeft > 0 && score === 120;

  const message = isWin ? (
    <div className="flex items-center gap-2">
      Congratulations!
      <Image src={confetti} width={48} height={48} alt="Congratulations" />
    </div>
  ) : (
    <div className="flex items-center gap-2">
      Time&apos;s up!
      <Image src={clock} width={24} height={24} alt="Clock" />
    </div>
  );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="m-4 flex w-full max-w-lg flex-col items-center border-4 border-black bg-white p-4 md:p-6">
        <div className="mb-6 text-xl font-bold">{message}</div>
        <div className="mb-3 text-3xl font-bold">{score}</div>
        <div className="mb-4 font-medium">Final Score</div>

        <div>
          <label htmlFor="name" className="text-xs font-medium">
            Enter your name for the leaderboard
          </label>
          <input
            type="text"
            id="name"
            className="mt-2 w-full border-none px-2 py-1.5 text-sm outline-4 outline-black outline-dashed"
          />
        </div>
        <div className="mt-6 flex w-full gap-6">
          <button
            onClick={handleSubmit}
            className="relative z-10 flex-1 cursor-pointer bg-lime-500 px-4 py-2 text-white shadow-[inset_-4px_-4px_0px_0px_#4aa52e] before:absolute before:inset-0 before:-inset-x-1 before:-z-10 before:border-x-4 before:border-black after:absolute after:inset-0 after:-inset-y-1 after:-z-10 after:border-y-4 after:border-black hover:bg-lime-500/90 hover:shadow-[inset_-6px_-6px_0px_0px_#4aa52e] active:shadow-[inset_4px_4px_0px_0px_#4aa52e]"
          >
            Submit
          </button>
          <button
            onClick={handlePlayAgain}
            className="relative z-10 flex-1 cursor-pointer bg-blue-500/90 px-4 py-2 text-white shadow-[inset_-4px_-4px_0px_0px_#1d4ed8] before:absolute before:inset-0 before:-inset-x-1 before:-z-10 before:border-x-4 before:border-black after:absolute after:inset-0 after:-inset-y-1 after:-z-10 after:border-y-4 after:border-black hover:bg-blue-600/80 hover:shadow-[inset_-6px_-6px_0px_0px_#1d4ed8] active:shadow-[inset_4px_4px_0px_0px_#1d4ed8]"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
