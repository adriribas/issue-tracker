import Link from 'next/link';
import { Button, Flex, Text } from '@radix-ui/themes';

const NoIssues: React.FC = () => {
  return (
    <Flex
      height='100%'
      direction='column'
      justify='center'
      align='center'
      gap='4'>
      <Flex direction='column' justify='center' gap='1'>
        <Text align='center' size={{ initial: '2', md: '3' }} weight='medium'>
          Nice job! There are currently no issues
        </Text>
        <Text align='center' size={{ initial: '2', md: '3' }}>
          You can add one right now
        </Text>
      </Flex>
      <Link href='/issues/new'>
        <Button>New Issue</Button>
      </Link>
    </Flex>
  );
};

export default NoIssues;
