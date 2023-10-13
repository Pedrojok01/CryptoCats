import type { FC } from "react";

import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

type PriceInputProps = {
  price: string;
  setPrice: (value: string) => void;
  loading: boolean;
};

const PriceInput: FC<PriceInputProps> = ({ price, setPrice, loading }) => {
  return (
    <NumberInput defaultValue={0} min={0} w="80%" value={price} onChange={(value) => setPrice(value)}>
      <NumberInputField cursor={loading ? "not-allowed" : "auto"} />
      <NumberInputStepper>
        <NumberIncrementStepper cursor={loading ? "not-allowed" : "auto"} />
        <NumberDecrementStepper cursor={loading ? "not-allowed" : "auto"} />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default PriceInput;
