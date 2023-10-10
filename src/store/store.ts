import { create } from "zustand";

interface CryptoCatsData {
  gen0Count: number;
  maxGen0Supply: number;
  userCats: Cat[];
  catsWithoutOffer: Cat[];
  catsOffersForMarket: CatOffersForMarket[];
  setGen0Count: (count: number) => void;
  setMaxGen0Supply: (supply: number) => void;
  setUserCats: (cats: Cat[]) => void;
  setCatsWithoutOffer: (cats: Cat[]) => void;
  setCatsOffersForMarket: (offers: CatOffersForMarket[]) => void;
}

const useStore = create<CryptoCatsData>((set) => ({
  gen0Count: 0,
  maxGen0Supply: 0,
  userCats: [],
  catsWithoutOffer: [],
  catsOffersForMarket: [],
  setGen0Count: (count) => set({ gen0Count: count }),
  setMaxGen0Supply: (supply) => set({ maxGen0Supply: supply }),
  setUserCats: (cats) => set({ userCats: cats }),
  setCatsWithoutOffer: (cats) => set({ catsWithoutOffer: cats }),
  setCatsOffersForMarket: (offers) => set({ catsOffersForMarket: offers }),
}));

export { useStore };
