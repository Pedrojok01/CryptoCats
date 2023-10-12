import { type ReactNode, createContext, useContext, useEffect } from "react";

import { useReadContract } from "@/hooks";

type Props = {
  children: ReactNode;
};

// Create Context
const UserCatsContext = createContext<null>(null);

// Provider component
export const UserCatsProvider = ({ children }: Props) => {
  const { getUserCats, getCatsWithoutOffer } = useReadContract();

  useEffect(() => {
    getUserCats();
    getCatsWithoutOffer();
  }, [getUserCats, getCatsWithoutOffer]);

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
