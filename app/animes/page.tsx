import { AnimeList } from "@/components/anime-list";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;

  return (
    <>
      <AnimeList />
    </>
  );
}
