import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';

import IssueStatusFilter from './IssueStatusFilter';

const IssueActions: React.FC = () => {
  return (
    <Flex justify='between'>
      <IssueStatusFilter />
      <Link href='/issues/new'>
        <Button>New Issue</Button>
      </Link>
    </Flex>
  );
};

export default IssueActions;
