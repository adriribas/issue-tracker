import { notFound } from 'next/navigation';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

import prisma from '@/prisma/client';
import { IssueStatusBadge } from '@/app/components';

type Props = {
  params: { id: string };
};

const IssueDetailPage: React.FC<Props> = async ({ params }) => {
  const issueId = parseInt(params.id);
  if (Number.isNaN(issueId)) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap='3' my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card mt='4' className='prose'>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
