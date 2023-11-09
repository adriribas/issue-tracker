'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';

const NavBar: React.FC = () => {
  const { status, data: session } = useSession();
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='6'>
            <Link href='/'>
              <AiFillBug />
            </Link>
            <ul className='flex gap-6'>
              {links.map((link, index) => {
                const { label, href } = link;
                return (
                  <li key={index}>
                    <Link
                      href={href}
                      className={classnames({
                        'text-zinc-900': href === currentPath,
                        'text-zinc-500': href !== currentPath,
                        'hover:text-zinc-800 transition-colors': true,
                      })}>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback={session.user!.name?.[0] || 'U'}
                    variant='solid'
                    size='2'
                    radius='full'
                    className='cursor-pointer'
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size='2'>{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href='/api/auth/signout' className='w-full'>
                      Sign Out
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            ) : null}
            {status === 'unauthenticated' ? (
              <Link href='/api/auth/signin'>Sign In</Link>
            ) : null}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
