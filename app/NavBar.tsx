'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';

const NavBar: React.FC = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <nav className='flex items-center gap-6 border-b mb-5 px-5 h-14'>
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
    </nav>
  );
};

export default NavBar;
