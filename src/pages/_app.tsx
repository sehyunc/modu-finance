import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import "@fontsource/manrope/latin.css";
import "@fontsource/inter/latin.css";
import "@fontsource/epilogue/latin.css";
import useInitializeOnboard from "@/hooks/useInitializeOnboard";
import { useInitCookieOptions } from "@/hooks/useInitCookieOptions";

import Layout from "components/layout";

import customTheme from "styles/customTheme";
import "styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <InitHooks>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </InitHooks>
    </ChakraProvider>
  );
};

const InitHooks = ({ children }) => {
  useInitCookieOptions(process.env.NEXT_JS_DOMAIN_NAME);
  useInitializeOnboard({
    defaultNetworkName: process.env.NEXT_JS_DEFAULT_ETHEREUM_NETWORK_NAME,
  });
  return children;
};

export default MyApp;
