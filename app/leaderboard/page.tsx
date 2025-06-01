import Leaderboard from "@/component/Leaderboard";

export const metadata = {
  title: "Leaderboard | PokeFlip",
  description:
    "Check out the top scorers in PokeFlip! See who matched the most Pokémon pairs the fastest and claimed the top spot on the leaderboard.",
};

export default async function page() {
  return (
    <div className="flex flex-1 flex-col">
      <Leaderboard />
    </div>
  );
}
