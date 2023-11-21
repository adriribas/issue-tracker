'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Select, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  currentPage: number;
  itemCount: number;
  pageSize: number;
};

const pageSizes = [5, 10, 20, 30, 40, 50];

const clamp = (min: number, max: number, value: number) => {
  return Math.min(Math.max(value, min), max);
};

const Pagination: React.FC<Props> = ({ currentPage, itemCount, pageSize }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) {
    return (
      <Flex justify='end' width='100%'>
        <PageSizeSelect pageSize={pageSize} />
      </Flex>
    );
  }

  const handleChangePage = (page: number) => () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', clamp(1, pageCount, page).toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex justify='between' width='100%'>
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

      <PageSizeSelect pageSize={pageSize} />
    </Flex>
  );
};

const PageSizeSelect: React.FC<{ pageSize: number }> = ({ pageSize }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChangePageSize = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('pageSize', value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex align='center' gap='2'>
      <Text size='2'>Page size</Text>
      <Select.Root
        defaultValue={pageSize.toString()}
        onValueChange={handleChangePageSize}>
        <Select.Trigger placeholder='Page size...' variant='soft' />
        <Select.Content>
          <Select.Group>
            {pageSizes.map((size) => (
              <Select.Item key={size} value={size.toString()}>
                {size}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default Pagination;
