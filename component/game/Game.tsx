"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import pokemonLogo from "/public/images/pokemon-logo.png";
import { playAudio } from "@/utils/playAudio";

const pokemon = [
  "/images/pokemon1.png",
  "/images/pokemon2.png",
  "/images/pokemon3.png",
  "/images/pokemon4.png",
  "/images/pokemon5.png",
  "/images/pokemon6.png",
  "/images/pokemon7.png",
  "/images/pokemon8.png",
  "/images/pokemon9.png",
  "/images/pokemon10.png",
  "/images/pokemon11.png",
  "/images/pokemon12.png",
];

const TIME = 5;

export default function Game() {
  const [time, setTime] = useState(TIME);
  const cards = [...pokemon, ...pokemon];
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleCardClick = (index: number) => {
    if (
      matchedCards.includes(index) ||
      flippedCards.includes(index) ||
      flippedCards.length >= 2 ||
      !gameStarted
    )
      return;
    playAudio("click");
    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);
    console.log("flippedCards", newFlippedCards);
    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards;
      console.log("firstCard", firstCard);
      console.log("secondCard", secondCard);

      if (cards[firstCard] === cards[secondCard]) {
        setTimeout(() => {
          playAudio("success");
          setMatchedCards((prev) => [...prev, firstCard, secondCard]);
          console.log("matchedCards", matchedCards);
          setFlippedCards([]);
          setScore(score + 10);
        }, 500);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleStartGame = () => {
    playAudio("click");
    setGameStarted(true);
  };

  const handleRestartGame = () => {
    playAudio("click");
    setGameStarted(false);
  };

  const handleSubmit = () => {
    playAudio("click");
    console.log("submit");
  };

  const handlePlayAgain = () => {
    playAudio("click");
    setTime(TIME);
    setIsGameOver(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setGameStarted(false);
  };

  useEffect(() => {
    if (!gameStarted) return;
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    if (time <= 0) {
      clearInterval(timer);
      setIsGameOver(true);
      setGameStarted(false);
    }
    return () => clearInterval(timer);
  }, [time, gameStarted]);

  return (
    <div className="font-press-start-2p relative mx-auto flex max-w-screen-lg flex-col items-center justify-center p-6">
      <div>
        <Image src={pokemonLogo} alt="pikachu" width={120} height={120} />
      </div>

      <div className="mt-8 flex w-full flex-col gap-6">
        <div className="flex w-full flex-1 items-center justify-between gap-6">
          {gameStarted ? (
            <button
              onClick={handleRestartGame}
              className="relative z-10 cursor-pointer bg-red-500/90 px-4 py-2 text-white shadow-[inset_-4px_-4px_0px_0px_#b91c1c] before:absolute before:inset-0 before:-inset-x-1 before:-z-10 before:border-x-4 before:border-black after:absolute after:inset-0 after:-inset-y-1 after:-z-10 after:border-y-4 after:border-black hover:bg-red-600/80 hover:shadow-[inset_-6px_-6px_0px_0px_#b91c1c] active:shadow-[inset_4px_4px_0px_0px_#b91c1c]"
            >
              Restart
            </button>
          ) : (
            <button
              onClick={handleStartGame}
              className="relative z-10 cursor-pointer bg-lime-500 px-4 py-2 text-white shadow-[inset_-4px_-4px_0px_0px_#4aa52e] before:absolute before:inset-0 before:-inset-x-1 before:-z-10 before:border-x-4 before:border-black after:absolute after:inset-0 after:-inset-y-1 after:-z-10 after:border-y-4 after:border-black hover:bg-lime-500/90 hover:shadow-[inset_-6px_-6px_0px_0px_#4aa52e] active:shadow-[inset_4px_4px_0px_0px_#4aa52e]"
            >
              Start
            </button>
          )}
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">Score: {score}</div>
            <div className="text-2xl font-bold">Time: {time}</div>
          </div>
        </div>
        <div className="grid grid-cols-6 justify-center gap-4">
          {cards.map((pokemon, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              className={`relative h-38 cursor-pointer rounded-xl shadow-sm ring-2 transition-all duration-500 hover:shadow-xl ${
                matchedCards.includes(index)
                  ? "ring-green-500"
                  : "ring-transparent"
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${
                  flippedCards.includes(index) || matchedCards.includes(index)
                    ? "180deg"
                    : "0deg"
                })`,
              }}
            >
              {/* back */}
              <div
                className="absolute inset-0 flex items-center justify-center rounded-xl bg-white"
                style={{
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                }}
              >
                <Image
                  src="/images/pokeball.png"
                  alt="pikachu"
                  width={60}
                  height={60}
                />
              </div>
              {/* front */}
              <div
                className="absolute inset-0 flex items-center justify-center rounded-xl bg-white"
                style={{
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <Image src={pokemon} alt="pikachu" width={100} height={100} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex w-full max-w-lg flex-col items-center border-4 border-black bg-white p-6">
            <div></div>
            <div className="text-3xl font-bold">0</div>
            <div className="mb-2 text-lg font-medium">Final Score</div>
            <div className="mb-2">{TIME - time} seconds</div>
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
      )}
    </div>
  );
}
