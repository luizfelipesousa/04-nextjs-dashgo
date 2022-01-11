import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { theme } from "../../styles/theme";
import { SideBarContextProvider } from "../contexts/SideBarContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SideBarContextProvider>
        <Component {...pageProps} />
      </SideBarContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
