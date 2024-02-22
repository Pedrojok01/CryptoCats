import { type ReactNode, createContext, useContext, useEffect } from "react";

import { useAccount } from "wagmi";

import { useReadContract } from "@/hooks";

type Props = {
  children: ReactNode;
};

// Create Context
const UserCatsContext = createContext<null>(null);

// Provider component
export const UserCatsProvider = ({ children }: Props) => {
  const { address } = useAccount();
  const { getUserCats, getCatsWithoutOffer } = useReadContract();

  useEffect(() => {
    if (!address) return;

    getUserCats(address);
    getCatsWithoutOffer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return <UserCatsContext.Provider value={null}>{children}</UserCatsContext.Provider>;
};

// Custom hook to use context
export const useUserCats = () => {
  const context = useContext(UserCatsContext);
  if (context === undefined) {
    throw new Error("useUserCats must be used within UserCatsProvider");
  }
  return context;
};
