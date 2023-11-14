'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

const clamp = (min: number, max: number, value: number) => {
  return Math.min(Math.max(value, min), max);
};

const Pagination: React.FC<Props> = ({ itemCount, pageSize, currentPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) {
    return null;
  }

  const handleChangePage = (page: number) => () => {
    const params = new URLSearchParams(searchParams);

    params.set('page', clamp(1, pageCount, page).toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <Flex align='center' gap='2'>
      <Text size='2'>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        disabled={currentPage <= 1}
        variant='soft'
        color='gray'
        onClick={handleChangePage(1)}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        disabled={currentPage <= 1}
        variant='soft'
        color='gray'
        onClick={handleChangePage(currentPage - 1)}>
        <ChevronLeftIcon />
      </Button>

      <Button
        disabled={currentPage >= pageCount}
        variant='soft'
        color='gray'
        onClick={handleChangePage(currentPage + 1)}>
        <ChevronRightIcon />
      </Button>
      <Button
        disabled={currentPage >= pageCount}
        variant='soft'
        color='gray'
        onClick={handleChangePage(pageCount)}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
