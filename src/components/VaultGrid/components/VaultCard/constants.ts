import { Symbol } from 'models/types'
type ColorMap = {
  [key in Symbol]: {
    start: string
    end: string
    tag: string
  }
}

export const SymbolToColorMap: ColorMap = {
  WETH: {
    start: '#c993ff',
    end: '#415dff',
    tag: 'purple',
  },
  WBTC: {
    start: '#F4B86B',
    end: '#ff9d85',
    tag: 'yellow',
  },
  USDC: {
    start: '#729ff3',
    end: '#009EF7',
    tag: 'blue',
  },
}
