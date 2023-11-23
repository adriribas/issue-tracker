import { notFound } from 'next/navigation';
import { cache } from 'react';
import { Box, Flex, Grid, Separator } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';

import prisma from '@/prisma/client';
import authOptions from '@/app/_auth/authOptions';
import IssueDetails from './IssueDetails';
import EditIssueButton from './EditIssueButton';
import DeleteIssueButton from './DeleteIssueButton';
import StatusSelect from './StatusSelect';
import AssigneeSelect from './AssigneeSelect';
import { BackButton } from '@/app/components';
import IssueComments from './IssueComments';

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
    include: { comments: { include: { author: true } }, assignedToUser: true },
  })
);

type Props = {
  params: { id: string };
};

const IssueDetailPage: React.FC<Props> = async ({ params }) => {
  const issueId = parseInt(params.id);
  if (Number.isNaN(issueId)) {
    notFound();
  }

  const issue = await fetchIssue(issueId);
  if (!issue) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5' mb='5'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
        <Box display={{ initial: 'none', sm: 'block' }}>
          <Separator size='3' mt='7' mb='4' />
          <IssueComments issue={issue} />
        </Box>
      </Box>
      <Box>
        <Flex direction='column' gap='4'>
          {session ? (
            <>
              <AssigneeSelect issue={issue} />
              <StatusSelect issue={issue} />
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </>
          ) : null}
          <BackButton href='/issues' />
        </Flex>
      </Box>
      <Box display={{ initial: 'block', sm: 'none' }}>
        <Separator size='4' mb='3' />
        <IssueComments issue={issue} />
      </Box>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: `Details of issue ${issue?.id}`,
  };
}

export default IssueDetailPage;
