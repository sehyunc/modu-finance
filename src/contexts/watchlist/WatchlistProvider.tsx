import React, { useCallback } from 'react'

import useLocalStorage from 'hooks/useLocalStorage'

import WatchlistContext from './WatchlistContext'

const WatchlistProvider: React.FC = ({ children }) => {
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', [])

  const handleAddToWatchlist = useCallback(
    (vaultId: string) => {
      if ((watchlist as string[]).includes(vaultId)) return
      setWatchlist([...(watchlist as string[]), vaultId])
    },
    [setWatchlist, watchlist]
  )

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        onAddToWatchlist: handleAddToWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

export default WatchlistProvider
