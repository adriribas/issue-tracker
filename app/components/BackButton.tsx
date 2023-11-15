'use client';

import { useRouter } from 'next/navigation';
import type { MouseEventHandler } from 'react';
import { Button } from '@radix-ui/themes';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

type Props = {
  disabled?: boolean;
  href?: string;
};

const BackButton: React.FC<Props> = ({ disabled, href }) => {
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button
      disabled={disabled}
      variant='soft'
      color='gray'
      onClick={handleClick}>
      <ArrowLeftIcon />
      Back
    </Button>
  );
};

export default BackButton;
