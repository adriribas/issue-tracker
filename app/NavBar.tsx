import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';

const NavBar: React.FC = () => {
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
                className='text-zinc-500 hover:text-zinc-800 transition-colors'>
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
