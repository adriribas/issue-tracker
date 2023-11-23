'use client';

import Link from 'next/link';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Callout } from '@radix-ui/themes';

const SignInToComment: React.FC = () => {
  return (
    <Callout.Root color='amber'>
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>
        You will need to{' '}
        <Link
          href='/api/auth/signin'
          className='underline hover:brightness-125 focus:brightness-150'>
          sign in
        </Link>{' '}
        to comment.
      </Callout.Text>
    </Callout.Root>
  );
};

export default SignInToComment;
