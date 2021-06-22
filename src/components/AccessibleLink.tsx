import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/layout";
import Link, { LinkProps } from "next/link";

type AccessibleLinkProps = LinkProps &
  ChakraLinkProps & { decoration?: boolean };

const AccessibleLink = ({
  href,
  isExternal,
  children,
  as,
  decoration,
}: AccessibleLinkProps) => {
  return (
    <Link href={href} as={as} passHref>
      <ChakraLink
        isExternal={isExternal}
        style={decoration ? {} : { textDecoration: "none" }}
        _focus={
          decoration
            ? {}
            : {
                outline: "none !important",
              }
        }
      >
        {children}
      </ChakraLink>
    </Link>
  );
};

export default AccessibleLink;
