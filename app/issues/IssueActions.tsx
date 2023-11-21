import { Box, Button, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

import IssueStatusFilter from './IssueStatusFilter';
import IssueAssigneeFilter from './IssueAssigneeFilter';

const IssueActions: React.FC = () => {
  return (
    <Flex
      direction={{ initial: 'column', xs: 'row' }}
      justify={{ initial: 'start', xs: 'between' }}
      align={{ initial: 'stretch', xs: 'end' }}
      gap={{ initial: '4', xs: '0' }}>
      <Box width={{ initial: '100%', xs: 'auto' }}>
        <Link href='/issues/new' className='w-full'>
          <Button className='w-full'>New Issue</Button>
        </Link>
      </Box>

      <Flex
        direction={{ initial: 'column', xs: 'row' }}
        gap={{ initial: '4', xs: '5', sm: '6', md: '7', lg: '8', xl: '9' }}>
        <Flex direction={{ initial: 'column' }} gap='1'>
          <Text size='1' color='gray'>
            Filter by status
          </Text>
          <IssueStatusFilter />
        </Flex>

        <Flex direction={{ initial: 'column' }} gap='1'>
          <Text size='1' color='gray'>
            Filter by assignee
          </Text>
          <IssueAssigneeFilter />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default IssueActions;
