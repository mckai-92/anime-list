"use client";

import React, { ReactNode } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import { DotButton, useDotButton } from "./embla-carousel-dot-button";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./embal-carousel-arrow-buttons";

import "../../styles/embla.css";

type PropType = {
  slides: { content: ReactNode }[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div ref={emblaRef} className="embla__viewport relative">
        <div className="embla__container">
          {slides.map((item, index) => (
            <div key={index} className="embla__slide">
              {item.content}
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-2">
          <PrevButton disabled={prevBtnDisabled} onClick={onPrevButtonClick} />
        </div>

        <div className="absolute top-1/2 right-2 -translate-y-1/2">
          <NextButton disabled={nextBtnDisabled} onClick={onNextButtonClick} />
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : "",
              )}
              onClick={() => onDotButtonClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
