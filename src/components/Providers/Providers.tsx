import React from 'react'

import VaultsProvider from 'contexts/vaults/VaultsProvider'
import WalletProvider from 'contexts/wallet/WalletProvider'
import WatchlistProvider from 'contexts/watchlist/WatchlistProvider'

const Providers: React.FC = ({ children }) => {
  return (
    <WalletProvider>
      <VaultsProvider>
        <WatchlistProvider>{children}</WatchlistProvider>
      </VaultsProvider>
    </WalletProvider>
  )
}

export default Providers
