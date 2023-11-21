import { Box, Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';

import IssueStatusFilter from './IssueStatusFilter';
import IssueAssigneeFilter from './IssueAssigneeFilter';

const IssueActions: React.FC = () => {
  return (
    <Flex justify='between'>
      <Box className='space-x-4'>
        <IssueStatusFilter />
        <IssueAssigneeFilter />
      </Box>
      <Link href='/issues/new'>
        <Button>New Issue</Button>
      </Link>
    </Flex>
  );
};

export default IssueActions;
