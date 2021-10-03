import { useContext } from 'react'

import WatchlistContext from './WatchlistContext'

const useWatchlist = () => {
  const watchlist = useContext(WatchlistContext)
  return watchlist
}

export default useWatchlist
