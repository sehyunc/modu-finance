import React from 'react'

import VaultsProvider from 'contexts/vaults/VaultsProvider'
import WalletProvider from 'contexts/wallet/WalletProvider'

const Providers: React.FC = ({ children }) => {
  return (
    <WalletProvider>
      <VaultsProvider>{children}</VaultsProvider>
    </WalletProvider>
  )
}

export default Providers
