import { title, subtitle } from "@/components/primitives";
import Carousel from "@/components/carousel";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Welcome to&nbsp;</span>
        <span className={title({ color: "red" })}>Anime list&nbsp;</span>
        <br />

        <div className={subtitle({ class: "mt-4" })} />
      </div>

      <div className={subtitle({ class: "mt-4" })}>Airing now</div>
      <Carousel type="image" url="seasons/now" />

      <div className={subtitle({ class: "mt-4" })}>Upcoming</div>
      <Carousel type="image" url="seasons/upcoming" />

      <div className={subtitle({ class: "mt-4" })}>Upcoming this spring</div>
      <Carousel type="image" url="seasons/2026/spring" />
    </section>
  );
}
