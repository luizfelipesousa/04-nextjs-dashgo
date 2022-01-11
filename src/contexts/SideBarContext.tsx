import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

type SideBarContextData = UseDisclosureReturn;

export const SideBarContext = createContext({} as SideBarContextData);

interface SideBarContextProps {
  children: ReactNode;
}

export function SideBarContextProvider({ children }: SideBarContextProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SideBarContext.Provider value={disclosure}>
      {children}
    </SideBarContext.Provider>
  );
}

export function useSideBarContext() {
  return useContext(SideBarContext);
}
