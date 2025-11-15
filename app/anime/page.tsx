export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = await searchParams;

  console.log(filters);

  return (
    <>
      <div>Empty page</div>
    </>
  );
}
