import React from "react";
import Image from "next/image";
import pokemonLogo from "@/public/images/pokemon-logo.png";
import trophy from "@/public/images/trophy.png";
import Link from "next/link";

export default function Header() {
  return (
    <header className="font-press-start-2p flex items-center justify-between p-4">
      <div className="">
        <Link href="/">
          <Image src={pokemonLogo} alt="pikachu" width={120} height={120} />
        </Link>
      </div>
      <Link
        href="/leaderboard"
        className="relative flex items-center gap-1 text-xs font-bold after:absolute after:inset-1 after:-bottom-0.5 after:border-dashed hover:after:border-b"
      >
        <Image src={trophy} alt="trophy" width={16} height={16} />
        Leaderboard
      </Link>
    </header>
  );
}
