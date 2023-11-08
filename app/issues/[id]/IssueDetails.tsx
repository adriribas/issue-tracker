import { Heading, Flex, Card, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import type { Issue } from '@prisma/client';

import { IssueStatusBadge } from '@/app/components';

type Props = {
  issue: Issue;
};

const IssueDetails: React.FC<Props> = ({ issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap='3' my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card mt='4' className='prose max-w-full'>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
