import {
  Icon,
  Link as ChakraLink,
  Text,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import Link from "next/link";
import { ElementType } from "react";
import ActiveLink from "../ActiveLink";

interface SectionLinkProps extends ChakraLinkProps {
  name: string;
  href: string;
  icon: ElementType;
}

export default function SectionLink({
  name,
  icon,
  href,
  ...rest
}: SectionLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {name}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
