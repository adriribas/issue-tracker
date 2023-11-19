import type { Metadata } from 'next';
import { Flex, Grid } from '@radix-ui/themes';

import prisma from '@/prisma/client';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';

const Home: React.FC = async () => {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' justify='between' gap='5'>
        <IssueSummary statusCount={{ open, inProgress, closed }} />
        <IssueChart statusCount={{ open, inProgress, closed }} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker | Dashboard',
  description: 'View a summary of project issues',
};

export default Home;
