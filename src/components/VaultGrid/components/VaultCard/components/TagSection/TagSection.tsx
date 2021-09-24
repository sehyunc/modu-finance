import { Stack, Tag } from '@chakra-ui/react'
import { SymbolToColorMap } from '../../constants'
import { Symbol } from 'models/types'

interface TagSectionProps {
  tags: string[]
  underlyingSymbol: Symbol
}

const TagSection: React.FC<TagSectionProps> = ({ tags, underlyingSymbol }) => {
  const color = SymbolToColorMap[underlyingSymbol].tag
  return (
    <Stack direction="row" spacing={3}>
      {tags.map((tag) => (
        <Tag
          colorScheme={color}
          key="tag"
          style={{ textTransform: 'capitalize' }}
          variant="solid"
        >
          {tag}
        </Tag>
      ))}
    </Stack>
  )
}

export default TagSection
