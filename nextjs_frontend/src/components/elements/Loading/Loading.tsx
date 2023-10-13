import type { FC } from "react";

import { Center, Spinner } from "@chakra-ui/react";

import { useSuportedChains } from "@/hooks/useSupportedChains";

const Loading: FC = () => {
  const isSupportedChain = useSuportedChains();

  return (
    <>
      {isSupportedChain && (
        <Center height={"50%"} padding={10}>
          <Spinner size="lg" speed="0.65s" />
        </Center>
      )}
    </>
  );
};

export default Loading;
