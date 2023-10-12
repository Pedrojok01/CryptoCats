// useCatFactory.ts
import { useState, useCallback } from "react";

import { defaultDNA } from "@/data/catStettings";

export const useCatFactory = () => {
  const [dna, setDna] = useState<DNA>(defaultDNA);

  const updateDna = useCallback((updatedAttributes: Partial<DNA>) => {
    setDna((prevDna) => ({ ...prevDna, ...updatedAttributes }));
  }, []);

  const resetCatToDefault = useCallback(() => {
    setDna(defaultDNA);
  }, []);

  const generateRandomCat = useCallback(() => {
    const randomDNA: DNA = {
      headColor: Math.floor(Math.random() * 89) + 10,
      mouthColor: Math.floor(Math.random() * 89) + 10,
      pawsColor: Math.floor(Math.random() * 89) + 10,
      eyesColor: Math.floor(Math.random() * 89) + 10,
      collarColor: Math.floor(Math.random() * 89) + 10,
      eyesShape: Math.floor(Math.random() * 6) + 1,
      foreheadShape: Math.floor(Math.random() * 5) + 1,
      decorationColor: Math.floor(Math.random() * 89) + 10,
      animation: Math.floor(Math.random() * 6) + 1,
      backgroundColor: Math.floor(Math.random() * 4) + 1,
    };
    setDna(randomDNA);
  }, []);

  return {
    dna,
    updateDna,
    resetCatToDefault,
    generateRandomCat,
  };
};
