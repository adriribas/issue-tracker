import { Heading, Flex, Card, Text, Box } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import type { Issue } from '@prisma/client';

import { IssueStatusBadge } from '@/app/components';

type Props = {
  issue: Issue;
};

const IssueDetails: React.FC<Props> = ({ issue }) => {
  return (
    <Box>
      <Heading size={{ initial: '5', sm: '6', md: '7' }}>{issue.title}</Heading>
      <Flex gap='3' my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text size='2'>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card mt='4' className='prose max-w-full'>
        <ReactMarkdown className='sm:text-[0.6rem] md:text-[1rem]'>
          {issue.description}
        </ReactMarkdown>
      </Card>
    </Box>
  );
};

export default IssueDetails;
