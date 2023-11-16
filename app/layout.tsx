import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Container, Theme } from '@radix-ui/themes';

import './globals.css';
import './theme-config.css';
import NavBar from './NavBar';
import AuthProvider from '@/app/_auth/Provider';
import QueryClientProvider from './QueryClientProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Manage all your project issues',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={inter.variable}>
      <body>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor='iris' radius='large'>
              <NavBar />
              <main className='p-5'>
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
