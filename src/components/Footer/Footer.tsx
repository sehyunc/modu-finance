import AccessibleLink from 'components/AccessibleLink'
import { Button, Flex, FlexProps, Link } from '@chakra-ui/react'
import { AiFillGithub } from 'react-icons/ai'

const Footer = (props: FlexProps) => {
  return (
    <Flex
      as="footer"
      mt="auto"
      px={8}
      py={4}
      width="100%"
      align={{ base: 'center', sm: 'inherit' }}
      justify={{ sm: 'space-between' }}
      maxWidth="72rem"
      direction={{ base: 'column', sm: 'row' }}
      {...props}
    >
      <AccessibleLink href="https://www.opyn.co/" isExternal>
        <Button variant="ghost" size="sm">
          Copyright
        </Button>
      </AccessibleLink>
      <Link href="https://github.com/sehyunc/opyn-vault-aggregator" isExternal>
        <Button variant="ghost" size="sm" rightIcon={<AiFillGithub />}>
          GitHub
        </Button>
      </Link>
    </Flex>
  )
}

export default Footer
