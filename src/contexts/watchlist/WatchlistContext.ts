import { createContext } from 'react'

import { ethers } from 'ethers'

export interface WatchlistContextValues {
  onAddToWatchlist: (vaultId: string) => void
  onRemoveFromWatchlist: (vaultId: string) => void
  watchlist: string[]
}

const WatchlistContext = createContext<WatchlistContextValues>({
  onAddToWatchlist: (vaultId: string) => {},
  onRemoveFromWatchlist: (vaultId: string) => {},
  watchlist: [],
})

export default WatchlistContext
