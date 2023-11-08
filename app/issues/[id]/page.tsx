import { notFound } from 'next/navigation';
import { Box, Flex, Grid } from '@radix-ui/themes';

import prisma from '@/prisma/client';
import IssueDetails from './IssueDetails';
import EditIssueButton from './EditIssueButton';
import DeleteIssueButton from './DeleteIssueButton';

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
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction='column' gap='4'>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
