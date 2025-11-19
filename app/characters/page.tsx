import { CharactersList } from "@/components/characters-list";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;

  return (
    <>
      <CharactersList />
    </>
  );
}
