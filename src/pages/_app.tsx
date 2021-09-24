import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/epilogue/latin.css'
import '@fontsource/inter/latin.css'
import '@fontsource/manrope/latin.css'

import Providers from 'components/Providers'
import TopBar from 'components/TopBar'

import customTheme from 'styles/customTheme'
import 'styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <ChakraProvider theme={customTheme}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
          <title>Modu</title>
        </Head>
        <TopBar />
        <Component {...pageProps} />
      </ChakraProvider>
    </Providers>
  )
}

export default MyApp
