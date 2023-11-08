import { type PropsWithChildren } from 'react';
import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';

type Props = {
  href: string;
};

const Link: React.FC<PropsWithChildren<Props>> = ({ children, href }) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
