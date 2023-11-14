import { notFound } from 'next/navigation';
import { cache } from 'react';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';

import prisma from '@/prisma/client';
import authOptions from '@/app/_auth/authOptions';
import IssueDetails from './IssueDetails';
import EditIssueButton from './EditIssueButton';
import DeleteIssueButton from './DeleteIssueButton';
import AssigneeSelect from './AssigneeSelect';

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
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
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session ? (
        <Box>
          <Flex direction='column' gap='4'>
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      ) : null}
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
