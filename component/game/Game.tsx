"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { playAudio } from "@/utils/playAudio";
import TimeProgressBar from "../TimeProgressBar";
import Loading from "../Loading";
import GameOverModal from "./GameOverModal";
import { showToast } from "@/utils/toast";
import catLogo from "@/public/images/cat-logo.png";

const cats = [
  "/images/cat1.png",
  "/images/cat2.png",
  "/images/cat3.png",
  "/images/cat4.png",
  "/images/cat5.png",
  "/images/cat6.png",
  "/images/cat7.png",
  "/images/cat8.png",
  "/images/cat9.png",
  "/images/cat10.png",
  "/images/cat11.png",
  "/images/cat12.png",
];

const TIME = 90;

export default function Game() {
  const [time, setTime] = useState(TIME);
  const [cards, setCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState({
    isError: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const initializeCards = () => {
    const duplicatedCats = [...cats, ...cats];
    const shuffledCards = duplicatedCats.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

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
    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards;
      if (cards[firstCard] === cards[secondCard]) {
        setTimeout(() => {
          playAudio("success");
          setMatchedCards((prev) => [...prev, firstCard, secondCard]);
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
    setTime(TIME);
    setIsGameOver(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    initializeCards();
  };

  const handleRestartGame = () => {
    playAudio("click");
    setGameStarted(false);
    setTime(TIME);
    setIsGameOver(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    initializeCards();
  };

  const handleSubmit = async () => {
    playAudio("click");
    setIsLoading(true);
    if (!name.trim()) {
      setNameError({
        isError: true,
        message: "Name is required",
      });
      setIsLoading(false);
      return;
    }

    if (!(await isUniqueName(name.trim()))) {
      setNameError({
        isError: true,
        message: "Name is already taken",
      });
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/submit-score", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          score,
          timeTaken: TIME - time,
          timeLeft: time,
          isWin: score === 120,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit score");
      }

      showToast("Score submitted successfully", "success");
      setGameStarted(false);
      setIsGameOver(false);
      setFlippedCards([]);
      setMatchedCards([]);
      setScore(0);
      setTime(TIME);
      initializeCards();
      setName("");
      setNameError({
        isError: false,
        message: "",
      });
    } catch (error) {
      console.error(error);
      showToast("Failed to submit score", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAgain = () => {
    playAudio("click");
    setTime(TIME);
    setIsGameOver(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setGameStarted(false);
    initializeCards();
    setName("");
    setNameError({
      isError: false,
      message: "",
    });
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

  const isUniqueName = async (name: string) => {
    try {
      const response = await fetch(`/api/unique?name=${name}`);
      if (!response.ok) {
        throw new Error("Failed to check unique name");
      }
      const data = await response.json();
      return data.unique;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setIsGameOver(true);
      setGameStarted(false);
    }
  }, [cards, matchedCards]);

  useEffect(() => {
    initializeCards();
  }, []);

  return (
    <div className="relative mx-auto flex w-full max-w-screen-lg flex-1 flex-col items-center justify-center px-6 pb-6">
      {cards.length > 0 ? (
        <>
          <div className="mt-8 flex w-full flex-col gap-8">
            <div className="flex w-full flex-1 flex-col items-center justify-between gap-10 md:flex-row">
              <div className="flex items-center gap-6">
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
                <div className="font-bold">Score: {score}</div>
              </div>
              <div className="-mt-5">
                <TimeProgressBar value={time} totalTime={TIME} />
              </div>
            </div>
            <div className="grid grid-cols-4 justify-center gap-4 md:grid-cols-6">
              {cards.map((cat, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`h-24 cursor-pointer shadow-[inset_-4px_-4px_0px_0px_#4aa52e] transition-all duration-500 before:absolute before:inset-0 before:-inset-x-1 before:-z-10 before:border-x-4 before:border-black after:absolute after:inset-0 after:-inset-y-1 after:-z-10 after:border-y-4 after:border-black hover:shadow-[inset_-6px_-6px_0px_0px_#4aa52e] active:shadow-[inset_4px_4px_0px_0px_#4aa52e] md:h-38 ${
                    matchedCards.includes(index)
                      ? "before:border-lime-500 after:border-lime-500"
                      : "before:border-black after:border-black"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${
                      flippedCards.includes(index) ||
                      matchedCards.includes(index)
                        ? "180deg"
                        : "0deg"
                    })`,
                  }}
                >
                  {/* back */}
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-white"
                    style={{
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="relative size-12 md:size-20">
                      <Image
                        src={catLogo}
                        alt="cat"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  {/* front */}
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-white"
                    style={{
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <Image
                      src={cat}
                      alt="cat"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {isGameOver && (
            <GameOverModal
              timeLeft={time}
              score={score}
              handleSubmit={handleSubmit}
              handlePlayAgain={handlePlayAgain}
              name={name}
              setName={setName}
              nameError={nameError}
              setNameError={setNameError}
              isLoading={isLoading}
            />
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
