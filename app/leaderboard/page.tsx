import Leaderboard from "@/component/Leaderboard";

export const metadata = {
  title: "Leaderboard | CatFlip",
  description:
    "Check out the top scorers in CatFlip! See who matched the most Cat pairs the fastest and claimed the top spot on the leaderboard.",
};

export default async function page() {
  return (
    <div className="flex flex-1 flex-col">
      <Leaderboard />
    </div>
  );
}
