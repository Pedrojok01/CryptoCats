type NotificationType = "info" | "warning" | "success" | "error" | "loading";

type ForeheadShape = {
  forehead: string;
  foreheadMid?: string;
  foreheadLeft?: string;
  foreheadRight?: string;
};

type EyesShape = {
  eyesLeft: string;
  eyesRight: string;
  pupilsLeft: string;
  pupilsRight: string;
  innerPupilsLeft: string;
  innerPupilsRight: string;
  smallerInnerPupilsLeft: string;
  smallerInnerPupilsRight: string;
};

type CatAnimation = {
  head?: string;
  tail?: string;
  pawsLeft?: string;
  pawsRight?: string;
  eyes?: string;
  innerEyes?: string;
};

type DisplayCatProps = {
  dnaBN: bigint;
  id: number;
  generation: number;
  selectable?: boolean;
  setSelected?: Dispatch<SetStateAction<SelectedCat | undefined>>;
  onClose?: () => void;
};

type RenderCatProps = {
  dna: DNA;
  id?: number;
  generation?: number;
  isFactory: boolean;
};

type RenderCatInfoProps = {
  dna: DNA;
  id?: number;
  generation?: number;
  isFactory: boolean;
};

type DNA = {
  headColor: number;
  mouthColor: number;
  pawsColor: number;
  eyesColor: number;
  collarColor: number;
  eyesShape: number;
  foreheadShape: number;
  decorationColor: number;
  animation: number;
  backgroundColor: number;
};

type AttributesProps = {
  dna: DNA;
  updateDna: (updatedAttributes: Partial<DNA>) => void;
};

type SelectorProps = {
  colorName: string;
  action?: any;
  name: string;
  range: {
    min: string;
    max: string;
  };
  idCode: number | string;
  badge?: string;
};

type SelectedCat = {
  dna: DNA;
  id: number;
  generation: number;
};

type CatSelectionProps = {
  cat: SelectedCat | undefined;
  setCat: Dispatch<SetStateAction<SelectedCat | undefined>>;
  name: string;
  otherParent?: SelectedCat;
  loading: boolean;
  isMarket?: boolean;
};

type CatSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setCat: Dispatch<SetStateAction<SelectedCat | undefined>>;
  otherParent?: SelectedCat;
  isMarket?: boolean;
};

type Cat = {
  birthTime: BigNumber;
  dadId: BigNumber;
  generation: BigNumber;
  genes: BigNumber;
  indexId: BigNumber;
  mumId: BigNumber;
};

type OfferAbi = [seller: string, price: BigInt, index: BigInt, tokenId: BigInt];

type Offer = {
  seller: string;
  price: BigNumber;
  index: BigNumber;
  tokenId: BigNumber;
  ownOffer?: boolean;
};

type CatOffersForMarket = {
  catData: Cat;
  marketData: Offer;
};
