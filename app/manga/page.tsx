import { MangaList } from "@/components/manga-list";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;

  return (
    <>
      <MangaList />
    </>
  );
}
