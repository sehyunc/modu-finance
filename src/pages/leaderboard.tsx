import { useCallback, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Select,
  Spacer,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import Header from 'components/Leaderboard/components/Header'
import Row from 'components/Leaderboard/components/Row'

import useVaults from 'contexts/vaults/useVaults'
import { Platform } from 'models/Vault'

export type SortColumnOption =
  | 'name'
  | 'underlyingSymbol'
  | 'platform'
  | 'symbol'
  | 'apy'
export type SortDirection = 'up' | 'down'

const tokens = ['WETH', 'WBTC', 'USDC']
const platforms = [Platform.FONTIS, Platform.RIBBON, Platform.STAKEDAO]

const Leaderboard = () => {
  const { vaults } = useVaults()
  const [activeSortColumn, setActiveSortColumn] =
    useState<SortColumnOption>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('down')
  const [platformFilter, setPlatformFilter] = useState<Platform>()
  const [tokenFilter, setTokenFilter] = useState<string>()

  const filteredVaults = useMemo(() => {
    let tempVaults = vaults
    if (platformFilter) {
      tempVaults = tempVaults.filter((v) => v.platform === platformFilter)
    }
    if (tokenFilter) {
      tempVaults = tempVaults.filter((v) => v.underlyingSymbol === tokenFilter)
    }
    return tempVaults
  }, [platformFilter, tokenFilter, vaults])

  const sortedRows = useMemo(() => {
    return filteredVaults.sort((vaultA, vaultB) => {
      let valA
      let valB
      if (activeSortColumn === 'apy') {
        valA = vaultA.apy
        valB = vaultB.apy
        if (sortDirection === 'down') {
          return (valA || 0) > (valB || 0) ? -1 : 1
        } else {
          return (valA || 0) < (valB || 0) ? -1 : 1
        }
      } else {
        //@ts-expect-error
        valA = vaultA[activeSortColumn]?.trim()
        //@ts-expect-error
        valB = vaultB[activeSortColumn]?.trim()
        if (sortDirection === 'down') {
          return (valA || 0) < (valB || 0) ? -1 : 1
        } else {
          return (valA || 0) > (valB || 0) ? -1 : 1
        }
      }
    })
  }, [activeSortColumn, filteredVaults, sortDirection])

  const handleClearFilters = useCallback(() => {
    setPlatformFilter(undefined)
    setTokenFilter(undefined)
  }, [])

  return (
    <Box p={12}>
      <Flex mb={3}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr={3}>
            {tokenFilter || 'Select Token'}
          </MenuButton>
          <MenuList>
            {tokenFilter ? (
              <MenuItem
                onClick={() => setTokenFilter(undefined)}
                fontWeight="semibold"
              >
                Clear
              </MenuItem>
            ) : null}
            {tokens.map((t) => (
              <MenuItem key={t} onClick={() => setTokenFilter(t)} value={t}>
                {t}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {platformFilter || 'Select Platform'}
          </MenuButton>
          <MenuList>
            {platformFilter ? (
              <MenuItem
                onClick={() => setPlatformFilter(undefined)}
                fontWeight="semibold"
              >
                Clear
              </MenuItem>
            ) : null}
            {platforms.map((p) => (
              <MenuItem key={p} onClick={() => setPlatformFilter(p)} value={p}>
                {p}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Spacer />
        <Button onClick={handleClearFilters}>Clear Filters</Button>
      </Flex>
      <Header
        activeSortColumn={activeSortColumn}
        handleSetActiveSortColumn={setActiveSortColumn}
        handleSetSortDirection={setSortDirection}
        sortDirection={sortDirection}
      />
      {sortedRows.map((vault) => {
        return <Row key={vault.id} vault={vault} />
      })}
      <Box
        display="flex"
        backgroundColor="gray.800"
        borderBottomEndRadius="10px"
        borderBottomStartRadius="10px"
        flexDirection="row-reverse"
        padding="6"
      >
        <Text opacity="0.65">Page 1 of 1</Text>
      </Box>
    </Box>
  )
}

export default Leaderboard
