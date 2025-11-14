import { MangaDetails } from "@/components/manga-details";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;

  return (
    <>
      <MangaDetails id={slug} />
    </>
  );
}
