import React from "react";
import Image from "next/image";
import catLogo from "@/public/images/cat-logo.png";
import trophy from "@/public/images/trophy.png";
import Link from "next/link";

export default function Header() {
  return (
    <header className="font-press-start-2p flex items-center justify-between p-4">
      <div className="">
        <Link href="/">
          <div className="flex items-center justify-center gap-2">
            <Image src={catLogo} alt="cat" width={32} height={32} />
            <h1 className="text-sm text-gray-900 sm:text-base">
              CAT
              <span className="ml-1 inline-block rotate-y-180 text-amber-900">
                FLIP
              </span>
            </h1>
          </div>{" "}
        </Link>
      </div>
      <Link
        href="/leaderboard"
        className="relative flex items-center gap-1 text-xs font-bold after:absolute after:inset-x-0 after:-inset-y-2 after:-bottom-1 after:border-dashed hover:after:border-b-2"
      >
        <Image src={trophy} alt="trophy" width={16} height={16} />
        Leaderboard
      </Link>
    </header>
  );
}
