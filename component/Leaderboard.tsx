"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import trophy from "@/public/images/trophy.png";
import gold from "@/public/images/gold.png";
import silver from "@/public/images/silver.png";
import bronze from "@/public/images/bronze.png";
import Loading from "./Loading";
import { playAudio } from "@/utils/playAudio";
import Link from "next/link";

interface Score {
  _id: string;
  name: string;
  score: number;
  timeTaken: number;
}

export default function Leaderboard() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const initialFetch = useRef(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const fetchScores = async () => {
    setLoadingMore(true);
    if (initialFetch.current) {
      setLoading(true);
    }
    try {
      const response = await fetch(`/api/scores?page=${page}&limit=10`);
      if (response.ok) {
        const data = await response.json();
        setScores((prevScores) => [...prevScores, ...data]);
        if (data.length === 10) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      } else {
        console.error("Failed to fetch scores");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMore(false);
      if (initialFetch.current) {
        setLoading(false);
        initialFetch.current = false;
      }
    }
  };

  const handleLoadMore = () => {
    playAudio("click");
    setPage((prevPage) => prevPage + 1);
  };

  const medal = (index: number) => {
    if (index === 0)
      return <Image src={gold} alt="gold" width={16} height={16} />;
    if (index === 1)
      return <Image src={silver} alt="silver" width={16} height={16} />;
    if (index === 2)
      return <Image src={bronze} alt="bronze" width={16} height={16} />;
    return "";
  };

  useEffect(() => {
    fetchScores();
  }, [page]);

  return (
    <>
      {!loading ? (
        <div className="flex flex-col items-center justify-center gap-8 p-6">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <Image src={trophy} alt="trophy" width={24} height={24} />
            Leaderboard
          </h1>
          <table className="relative w-full max-w-4xl before:absolute before:-inset-x-1 before:inset-y-0 before:border-x-4 before:border-black after:absolute after:inset-x-0 after:-inset-y-1 after:border-y-4 after:border-black">
            <thead>
              <tr className="border-b-4 border-dashed border-black text-[10px] uppercase">
                <th className="w-36 p-3 text-left">Rank</th>
                <th className="col-span-1 p-3 text-left">Trainer</th>
                <th className="w-36 p-3 text-right">Score</th>
                <th className="w-36 p-3 text-right">
                  Time <span className="lowercase">(sec)</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-4 divide-dashed divide-black text-xs">
              {scores.length > 0 ? (
                scores.map((score, index) => (
                  <tr key={score._id}>
                    <td className="w-36 p-3 text-left">
                      <div className="flex w-8 items-center justify-end gap-1">
                        {medal(index)} {index + 1}
                      </div>
                    </td>
                    <td className="p-3 text-left">{score.name}</td>
                    <td className="w-36 p-3 text-right">{score.score}</td>
                    <td className="w-36 p-3 text-right">{score.timeTaken}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <span className="max-w-md text-center text-xs">
                        Leaderboard is empty. Start playing to add your name.
                      </span>
                      <Link
                        href="/"
                        onClick={() => {
                          playAudio("click");
                        }}
                        className="relative z-10 flex-1 cursor-pointer bg-blue-500/90 px-4 py-2 text-white shadow-[inset_-4px_-4px_0px_0px_#1d4ed8] before:absolute before:inset-0 before:-inset-x-1 before:-z-10 before:border-x-4 before:border-black after:absolute after:inset-0 after:-inset-y-1 after:-z-10 after:border-y-4 after:border-black hover:bg-blue-600/80 hover:shadow-[inset_-6px_-6px_0px_0px_#1d4ed8] active:shadow-[inset_4px_4px_0px_0px_#1d4ed8]"
                      >
                        Start Playing
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {hasMore && scores.length > 0 && (
            <button
              onClick={handleLoadMore}
              className="relative z-10 flex-1 cursor-pointer bg-blue-500/90 px-4 py-2 text-white shadow-[inset_-4px_-4px_0px_0px_#1d4ed8] before:absolute before:inset-0 before:-inset-x-1 before:-z-10 before:border-x-4 before:border-black after:absolute after:inset-0 after:-inset-y-1 after:-z-10 after:border-y-4 after:border-black hover:bg-blue-600/80 hover:shadow-[inset_-6px_-6px_0px_0px_#1d4ed8] active:shadow-[inset_4px_4px_0px_0px_#1d4ed8]"
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      ) : (
        <div className="flex w-full flex-1 items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
}
