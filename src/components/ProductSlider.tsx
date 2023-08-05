"use client";
import { useKeenSlider } from "keen-slider/react";
import { ReactNode } from "react";

export interface ProductSliderProps {
  children: ReactNode;
}

export function ProductSlider({ children }: ProductSliderProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 2,
      spacing: 3 * 16,
    },
  });

  return (
    <div className="ml-auto flex h-full min-h-[656px] w-full max-w-container">
      <div ref={sliderRef} className="keen-slider h-full">
        {children}
      </div>
    </div>
  );
}
