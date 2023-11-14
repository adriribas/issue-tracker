import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

const Pagination: React.FC<Props> = ({ itemCount, pageSize, currentPage }) => {
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) {
    return null;
  }

  return (
    <Flex align='center' gap='2'>
      <Text size='2'>
        Page {currentPage} of {pageCount}
      </Text>
      <Button disabled={currentPage <= 1} variant='soft' color='gray'>
        <DoubleArrowLeftIcon />
      </Button>
      <Button disabled={currentPage <= 1} variant='soft' color='gray'>
        <ChevronLeftIcon />
      </Button>

      <Button disabled={currentPage >= pageCount} variant='soft' color='gray'>
        <ChevronRightIcon />
      </Button>
      <Button disabled={currentPage >= pageCount} variant='soft' color='gray'>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
