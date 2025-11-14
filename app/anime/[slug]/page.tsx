import { AnimeDetails } from "@/components/anime-details";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;

  return (
    <>
      <AnimeDetails id={slug} />
    </>
  );
}
