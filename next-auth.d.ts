import { User } from '@prisma/client';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: User['id'];
    } & DefaultSession['user'];
  }
}
