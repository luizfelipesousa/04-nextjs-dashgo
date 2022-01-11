import { generateKey } from "crypto";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactlyHred?: boolean;
}

export default function ActiveLink({
  children,
  shouldMatchExactlyHred = false,
  ...rest
}: ActiveLinkProps) {
  const router = useRouter();
  let isActive = false;

  if (
    shouldMatchExactlyHred &&
    (rest.href === router.asPath || rest.href === router.pathname)
  ) {
    isActive = true;
  }

  if (!shouldMatchExactlyHred && router.asPath.startsWith(String(rest.href))) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? "pink.500" : "gray.50",
      })}
    </Link>
  );
}
