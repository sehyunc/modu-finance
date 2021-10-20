import React, { useMemo } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Icon, Text } from '@chakra-ui/react'

import { SortDirection } from 'pages/leaderboard'

interface Props {
  align?: 'left' | 'right'
  direction?: SortDirection
  flex?: number
  onClick: () => void
  title: string
}

const Header = ({
  align = 'left',
  direction,
  flex = 1,
  onClick,
  title,
}: Props) => {
  const justifyContent = align === 'left' ? 'flex-start' : 'flex-end'
  const icon = useMemo(() => {
    if (direction) {
      if (direction === 'up') return <Icon as={ChevronUpIcon} />
      else return <Icon as={ChevronDownIcon} />
    }
  }, [direction])

  return (
    <Box
      alignItems="center"
      cursor="pointer"
      display="flex"
      flex={flex}
      onClick={onClick}
      style={{ justifyContent }}
    >
      {align === 'right' && icon}
      <Text>{title}</Text>
      {align === 'left' && icon}
    </Box>
  )
}

export default Header
