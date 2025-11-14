import { CharacterDetails } from "@/components/character-details";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;

  return (
    <>
      <CharacterDetails id={slug} />
    </>
  );
}
