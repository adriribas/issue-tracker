'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';

import { Skeleton } from '@/app/components';

const NavBar: React.FC = () => {
  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='6'>
            <Link href='/'>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks: React.FC = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <ul className='flex gap-6'>
      {links.map((link, index) => {
        const { label, href } = link;
        return (
          <li key={index}>
            <Link
              href={href}
              className={classnames({
                'nav-link': true,
                '!text-zinc-900':
                  href === currentPath ||
                  (href !== '/' && currentPath.startsWith(href)),
              })}>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const AuthStatus: React.FC = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    return <Skeleton width='3rem' height='1.75rem' />;
  }

  if (status === 'unauthenticated') {
    return <Link href='/api/auth/signin'>Sign In</Link>;
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback={session!.user!.name?.[0] || 'U'}
            variant='solid'
            size='2'
            radius='full'
            className='cursor-pointer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size='2'>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href='/api/auth/signout' className='w-full nav-link'>
              Sign Out
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
